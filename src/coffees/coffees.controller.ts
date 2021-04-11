import { Controller, Get } from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {
    @Get("flavors")
    public findAll(){
        return 'This action returns all coffees';
    }
}
