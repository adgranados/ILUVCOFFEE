import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import coffeesConfig from './coffees.config';
import { COFFEE_BRANDS } from './coffees.constants';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';


@Module({
    imports: [
        TypeOrmModule.forFeature([Coffee, Flavor]),
        ConfigModule.forFeature(coffeesConfig)
    ],
    controllers: [CoffeesController],
    providers: [
         CoffeesService,
        // ------------------------------------------------------------------
        // PROVIDE LIST OF BRANDS
        // ------------------------------------------------------------------
        {
            provide: COFFEE_BRANDS, useFactory: async ():Promise<string[]> =>{
                return new Promise((resolve, reject)=>{
                    setTimeout(()=>{
                        resolve(['buddy brew', 'nescafe']);
                    },1000);
                });
            } 
        }
        // ------------------------------------------------------------------
        
    ],
    exports: [CoffeesService]
})
export class CoffeesModule { }
