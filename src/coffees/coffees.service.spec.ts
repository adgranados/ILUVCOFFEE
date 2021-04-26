import { NotFoundException } from '@nestjs/common';
import { ConfigModule, ConfigService, ConfigType, getConfigToken } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import coffeesConfig from './coffees.config';
import { COFFEE_BRANDS } from './coffees.constants';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  findOne: jest.fn(),
  create: jest.fn()
})
describe('CoffeesService', () => {
  let service: CoffeesService;
  let coffeeRepository: MockRepository;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forFeature(coffeesConfig)],
      providers: [
        CoffeesService,
        { provide: Connection, useValue:{}},
        { provide: getRepositoryToken(Flavor), useValue:createMockRepository()},
        { provide: getRepositoryToken(Coffee), useValue:createMockRepository()},
        { provide: COFFEE_BRANDS, useValue:{}},
      ],
    }).compile();

    module.get<ConfigType<typeof coffeesConfig>>(coffeesConfig.KEY);

    service = module.get<CoffeesService>(CoffeesService);
    coffeeRepository = module.get<MockRepository>(getRepositoryToken(Coffee));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', ()=>{
    describe('When coffee with Id Exists',()=>{
      it('Shuld return the coffee object', async () =>{
        const coffeeId = '1';
        const expectedCoffee = {};
        coffeeRepository.findOne.mockReturnValue(expectedCoffee);
        const coffee = await service.findOne(+coffeeId);
        expect(coffee).toEqual(expectedCoffee);
      })
    });
    describe('otherwise', ()=>{
      it('sheuld throw the "NotFoundException"',async () => {

        const coffeeId = '1';
        coffeeRepository.findOne.mockReturnValue(undefined);
        try {
          await service.findOne(+coffeeId);
        } catch (error) {
          expect(error).toBeInstanceOf(NotFoundException);
          expect(error.message).toEqual(`Coffee #${coffeeId} not found`);
        }
      })
    })
  })
});
