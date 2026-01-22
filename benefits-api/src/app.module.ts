import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Benefit } from './benefits/entities/benefit.entity';
import { BenefitRequest } from './benefit-requests/entities/benefit-request.entity';
import { BenefitBalance } from './benefit-balances/entities/benefit-balance.entity';
import { BenefitsModule } from './benefits/benefits.module';
import { BenefitRequestsModule } from './benefit-requests/benefit-requests.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'beneflex-app001.mysql.database.azure.com',
      port: 3306,
      username: 'SuperUser',
      password: 'Cl4v32026**',
      database: 'appbeneflex',
      entities: [Benefit, BenefitRequest, BenefitBalance],
      synchronize: false,
      ssl: {
        rejectUnauthorized: true,
      },
      extra: {
        ssl: {
          rejectUnauthorized: true,
        },
      },
    }),
    BenefitsModule,
    BenefitRequestsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
