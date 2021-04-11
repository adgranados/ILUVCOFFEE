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
}
