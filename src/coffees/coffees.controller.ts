import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Res } from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {
    @Get("flavors")
    public findAll(@Res() response){
        response
        .status(HttpStatus.OK)
        .send('This action returns all coffees');
    }

    @Get(":id")
    public findOne(@Param('id') id:string){
        return `This action returns #${id} coffee`;
    }

    @Post()
    @HttpCode(HttpStatus.GONE)
    public create(@Body() body){
        return body;
    }
}
