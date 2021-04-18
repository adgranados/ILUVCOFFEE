import { Module } from '@nestjs/common';
import { CoffeesModule } from 'src/coffees/coffees.module';
import { DatabaseModule } from 'src/database/database.module';
import { CoffeeRatingService } from './coffee-rating.service';

@Module({
  imports: [CoffeesModule, DatabaseModule.register({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: "postgres",
    password: "pass123",
    database: "postgres",
    synchronize: true,
  })],
  providers: [CoffeeRatingService]
})
export class CoffeeRatingModule { }
