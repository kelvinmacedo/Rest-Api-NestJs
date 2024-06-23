import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { UsersCreateDto } from "./DTO/user-create.dto";

@Injectable()
export class UsersService{

  constructor(private readonly prisma : PrismaService){}

  async createUsers(data: UsersCreateDto){
    
    await this.prisma.users.create({
      
      data: data,
    })
    
  }

}