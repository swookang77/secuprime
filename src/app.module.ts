import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataModule } from './data/data.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [DataModule, MongooseModule.forRoot(`mongodb+srv://sungwoo:1234@cluster0.plzwyjv.mongodb.net/Cherb`)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
