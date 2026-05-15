import { Module } from '@nestjs/common';
import { StatusLabelsController } from './status-labels.controller';
import { StatusLabelsService } from './status-labels.service';

@Module({
  controllers: [StatusLabelsController],
  providers: [StatusLabelsService],
})
export class StatusLabelsModule {}
