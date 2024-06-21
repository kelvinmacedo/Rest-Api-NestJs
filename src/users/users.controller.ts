import {Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { UsersCreateDto } from "./DTO/user-create.dto";

@Controller('users')
export class usersController {

  @Post()
  async CreateUsers( @Body() body : UsersCreateDto ){
    return body;
  }

  @Get()
  async listUsers(){
    return {}
  }

  @Get(':id')
  async searchUserId( @Param() params ){
    return params;
  }

  @Put()
  async userEdit( @Body() body : UsersCreateDto, @Param() Params ){
    return{
      method : "put",
      body,
      Params
    }
  }
}