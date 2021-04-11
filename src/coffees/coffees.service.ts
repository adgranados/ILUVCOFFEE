import { Injectable } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
    private coffees: Coffee[] = [
        {
            id:1,
            name:"Hipwreck Roast",
            brand: "buddy Brew",
            flavors: ["Chocolate", "vanilla"],
        },
        {
            id:2,
            name:"Hipwreck Roast",
            brand: "buddy Brew",
            flavors: ["Chocolate", "vanilla"],
        }
    ];

    public findAll(){
        return this.coffees;
    }

    public findOne(id:string){
        return this.coffees.find(coffee => coffee.id === +id);
    }

    public create(createCoffeeDto: any){
        this.coffees.push(createCoffeeDto);
    }

    public update(id:string, updateCoffeeDto:any){
        const existingCoffee = this.findOne(id);
        if(existingCoffee){
            existingCoffee.name= updateCoffeeDto.name;
            existingCoffee.brand= updateCoffeeDto.brand;
            // update the existing entity
        }
    }

    public remove(id:string){
        const coffeeIndex = this.coffees.findIndex(coffee => coffee.id === +id);
        if(coffeeIndex >= 0){
            this.coffees.splice(coffeeIndex, 1);
        }
    }
}
