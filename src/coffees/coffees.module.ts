import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';

@Module({
    imports:[TypeOrmModule.forFeature([Coffee, Flavor])],
    controllers:[CoffeesController],
    providers:[CoffeesService],
    exports:[CoffeesService]
})
export class CoffeesModule {}
