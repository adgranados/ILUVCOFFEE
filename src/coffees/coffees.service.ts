import { HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Connection, In, Repository } from 'typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { Event } from '../events/entities/event.entity';
import { COFFEE_BRANDS } from './coffees.constants';
import { ConfigService, ConfigType } from '@nestjs/config';
import appConfig from 'src/config/app.config';
import coffeesConfig from './coffees.config';

@Injectable()
export class CoffeesService {

    constructor(
        @InjectRepository(Coffee)
        private readonly coffeeRepository: Repository<Coffee>,
        @InjectRepository(Flavor)
        private readonly flavorRepository: Repository<Flavor>,
        private readonly connection: Connection,
        @Inject(COFFEE_BRANDS)
        private readonly coffeeBrands: string[],
        private readonly configService:ConfigService,

        @Inject(coffeesConfig.KEY)
        private coffeesConf: ConfigType<typeof coffeesConfig>
        
    ) { 
        console.log(this.coffeeBrands);
        console.group("Config env")
        console.log('DATABASE_HOST',this.configService.get('database.host'));
        console.log('DATABASE_PORT',this.configService.get('database.port'));
        console.log('DATABASE_USER',this.configService.get('database.username'));
        console.log('DATABASE_PASSWORD',this.configService.get('database.password'));
        console.log('DATABASE_NAME',this.configService.get('database.database'));
        console.groupEnd()
        const coffeesConfiguration = this.configService.get("coffees");
        console.table(coffeesConfiguration)
        console.log(coffeesConfiguration.database.host)
        console.log(coffeesConf.database.host)
    }

    public findAll(paginationQueryDto: PaginationQueryDto) {
        const { limit, offset } = paginationQueryDto;
        return this.coffeeRepository.find({
            relations: ['flavors'],
            skip:offset,
            take:limit
        });
    }

    public async findOne(id: number) {
        const coffee = await this.coffeeRepository.findOne(id, { relations: ['flavors'] });
        if (!coffee) {
            throw new NotFoundException(`Coffee #${id} not found`);
        }
        return coffee;
    }

    public async create(createCoffeeDto: CreateCoffeeDto) {
        const flavors = await Promise.all(
            createCoffeeDto.flavors.map(name => this.preloadFlavorByName(name))
        )
        const coffee = this.coffeeRepository.create({
            ...createCoffeeDto,
            flavors
        });
        return this.coffeeRepository.save(coffee);
    }

    public async update(id: number, updateCoffeeDto: UpdateCoffeeDto) {

        const flavors = updateCoffeeDto.flavors && (await Promise.all(
            updateCoffeeDto.flavors.map(name => this.preloadFlavorByName(name)),
        ));

        const coffee = await this.coffeeRepository.preload({
            id: id,
            ...updateCoffeeDto,
            flavors
        });
        if (!coffee) {
            throw new NotFoundException(`Coffee #${id} not found`);
        }
        return this.coffeeRepository.save(coffee);
    }

    public async remove(id: number) {
        const coffee = await this.findOne(id);
        return this.coffeeRepository.remove(coffee);
    }
    private async recomenderCoffee(coffee: Coffee) {
        const queryRunner = this.connection.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            coffee.recomendations++;

            const recommendEvent = new Event();
            recommendEvent.name = 'recommend_coffee';
            recommendEvent.type = 'coffee';
            recommendEvent.payload = { coffeeId: coffee.id }

            await queryRunner.manager.save(coffee);
            await queryRunner.manager.save(recommendEvent);

            await queryRunner.commitTransaction();
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
        }
        finally {
            await queryRunner.release();
        }

    }
    private async preloadFlavorByName(name: string): Promise<Flavor> {
        const existingFlavor = await this.flavorRepository.findOne({ name });
        if (existingFlavor) {
            return existingFlavor;
        }
        return this.flavorRepository.create({ name });
    }
}
