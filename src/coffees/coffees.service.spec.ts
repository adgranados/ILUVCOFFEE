import { ConfigModule, ConfigService, ConfigType, getConfigToken } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import coffeesConfig from './coffees.config';
import { COFFEE_BRANDS } from './coffees.constants';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';

describe('CoffeesService', () => {
  let service: CoffeesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forFeature(coffeesConfig)],
      providers: [
        CoffeesService,
        { provide: Connection, useValue:{}},
        { provide: getRepositoryToken(Flavor), useValue:{}},
        { provide: getRepositoryToken(Coffee), useValue:{}},
        { provide: COFFEE_BRANDS, useValue:{}},
      ],
    }).compile();

    module.get<ConfigType<typeof coffeesConfig>>(coffeesConfig.KEY);

    service = module.get<CoffeesService>(CoffeesService);
    console.log(service)
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
