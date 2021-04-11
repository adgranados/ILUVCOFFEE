import { Delete, Patch, Query } from '@nestjs/common';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Controller('coffees')
export class CoffeesController {

    public constructor(private readonly coffeesService:CoffeesService){}

    @Get()
    public findAll(@Query() paginationQuery){
        //const {limit, offset} = paginationQuery;
       return this.coffeesService.findAll();
    }

    @Get(":id")
    public findOne(@Param('id') id:string){
        return this.coffeesService.findOne(id);
    }

    @Post()
    public create(@Body() createCoffeeDto:CreateCoffeeDto){
        return this.coffeesService.create(createCoffeeDto);
    }
    
    @Patch(':id')
    public update(@Param('id')id:string, @Body() updateCoffeeDto:UpdateCoffeeDto){
        return this.coffeesService.update(id, updateCoffeeDto);
    }
    
    @Delete(':id')
    public remove(@Param('id')id:string){
        return this.coffeesService.remove(id);
    }
    
}
