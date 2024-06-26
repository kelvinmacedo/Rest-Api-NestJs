import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { UsersCreateDto } from "./DTO/user-create.dto";

@Injectable()
export class UsersService{

  constructor(private readonly prisma : PrismaService){}

  async createUsers(data: UsersCreateDto){
    
    return this.prisma.users.create({
      data,
    });  
  
  };

  async listUsers(){
    return this.prisma.users.findMany({
      
    });
  };

  async searchUserId(id : number){

    return this.prisma.users.findUnique({
      where : {
        id
      }
    })
  }

}