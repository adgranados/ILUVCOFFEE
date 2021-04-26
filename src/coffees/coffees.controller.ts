import { Delete, Patch, Query } from '@nestjs/common';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Protocol } from 'src/common/decorators/protocol.decorator';
import { Public } from 'src/common/decorators/public.decorator';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { ParseIntPipe } from 'src/common/pipes/parse-int.pipe';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import {ApiResponse, ApiForbiddenResponse} from '@nestjs/swagger'
@Controller('coffees')
export class CoffeesController {

    public constructor(private readonly coffeesService:CoffeesService){}

    @ApiResponse({status:403, description:'Forbidden.'})
    @ApiResponse({status:500, description:'Errores en general no controlados.'})
    @Public()
    @Get()
    public async findAll(@Protocol('https') protocol:string, @Query() paginationQuery:PaginationQueryDto){
        //const {limit, offset} = paginationQuery;
        console.log("-------------------------------------------");
        console.log(protocol);
        console.log("-------------------------------------------");
        return this.coffeesService.findAll(paginationQuery);
    }
    
    @ApiForbiddenResponse({description:'Forbidden.'})
    @Get(":id")
    public findOne(
        @Param('id', ParseIntPipe) id:number){
        return this.coffeesService.findOne(id);
    }

    @Post()
    public create(@Body() createCoffeeDto:CreateCoffeeDto){
        return this.coffeesService.create(createCoffeeDto);
    }
    
    @Patch(':id')
    public update(@Param('id')id:number, @Body() updateCoffeeDto:UpdateCoffeeDto){
        return this.coffeesService.update(id, updateCoffeeDto);
    }
    
    @Delete(':id')
    public remove(@Param('id')id:number){
        return this.coffeesService.remove(id);
    }
    
}
