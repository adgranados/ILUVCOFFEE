import { Delete, Patch } from '@nestjs/common';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {
    @Get("flavors")
    public findAll(){
       return'This action returns all coffees';
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
