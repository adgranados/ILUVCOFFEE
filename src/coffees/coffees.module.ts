import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { COFFEE_BRANDS } from './coffees.constants';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';


@Module({
    imports: [TypeOrmModule.forFeature([Coffee, Flavor])],
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
