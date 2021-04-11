import { Delete, Patch, Query } from '@nestjs/common';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {
    @Get()
    public findAll(@Query() paginationQuery){
        const {limit, offset} = paginationQuery;
       return `This action returns all coffees, Limit: ${limit}, offset: ${offset}`;
    }

    @Get(":id")
    public findOne(@Param('id') id:string){
        return `This action returns #${id} coffee`;
    }

    @Post()
    public create(@Body() body){
        return body;
    }
    
    @Patch(':id')
    public update(@Param('id')id:string, @Body() body){
        return `This action updatess #${id} coffee`;
    }
    
    @Delete(':id')
    public remove(@Param('id')id:string){
        return `This action removes #${id} coffee`;
    }
    
}
