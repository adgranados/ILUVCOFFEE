import { Controller, Get, Param } from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {
    @Get("flavors")
    public findAll(){
        return 'This action returns all coffees';
    }

    @Get(":id")
    public findOne(@Param() params){
        let {id} = params;
        return `This action returns #${id} coffee`;
    }
}
