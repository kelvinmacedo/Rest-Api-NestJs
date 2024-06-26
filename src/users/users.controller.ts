import {Body, Controller, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { UsersCreateDto } from "./DTO/user-create.dto";
import { UsersService } from "./users.service";

@Controller('users')
export class UsersController {
  constructor(private readonly usersService : UsersService){}

  @Post()
  async CreateUsers( @Body() data : UsersCreateDto ){
    return this.usersService.createUsers(data);
  };

  @Get()
  async listUsers(){
    return this.usersService.listUsers();
  };

  @Get()
  async searchUserId( @Param( 'id', ParseIntPipe ) id: number   ){
      return this.usersService.searchUserId(id);
  };

  @Put('edit')
  async userEdit( @Body() body : UsersCreateDto, @Param() Params ){
    return{
      method : "put",
      body,
      Params
    };
  };
};