import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { BullModule } from '@nestjs/bull';
import { RedisModule } from '@nestjs/redis';
import { DailyChallenge } from './entities/daily-challenge.entity';
import { DailyChallengeService } from './services/daily-challenge.service';
import { DailyChallengeController } from './controllers/daily-challenge.controller';
import { ChallengeRewardProcessor } from './processors/challenge-reward.processor';
import { DailyChallengeGateway } from './gateways/daily-challenge.gateway';
import { DailyChallengeAnalyticsService } from './services/daily-challenge-analytics.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([DailyChallenge]),
    ScheduleModule.forRoot(),
    BullModule.registerQueue({ name: 'challenge-reward' }),
    RedisModule,
  ],
  providers: [DailyChallengeService, ChallengeRewardProcessor, DailyChallengeGateway, DailyChallengeAnalyticsService],
  controllers: [DailyChallengeController],
  exports: [DailyChallengeService],
})
export class DailyChallengeModule {} 