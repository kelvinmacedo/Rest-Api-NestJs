import { Module } from "@nestjs/common";
import { usersController } from "./users.controller";

@Module({
  imports : [],
  controllers : [usersController],
  providers : [],
  exports: []
})
export class usersModule {};