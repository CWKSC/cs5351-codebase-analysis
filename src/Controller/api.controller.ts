import { Controller, Get, Post, Query, HttpCode } from '@nestjs/common';
//import { ApiQuery } from '@nestjs/swagger';

@Controller('api')
export class ApiController {

    @Get('getdate')
    async GetCurrentDatetime()
    {
        return new Date().toString()
    }

    @Get('AddTwoValue')
    @HttpCode(200) //return 200 instead of 201
    async AddTwoValue(@Query('a') a: string,@Query('b') b: string)
    {
        return "a + b = " + ((parseInt(a)+parseInt(b)).toString())
    }
    @Post('Multiple')
    @HttpCode(200) //return 200 instead of 201
    async Multiple(@Query('a') a: string,@Query('b') b: string)
    {
        return "a * b = " + (parseInt(a)*parseInt(b))
    }
}
