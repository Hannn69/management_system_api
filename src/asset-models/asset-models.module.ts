import { Module } from '@nestjs/common';
import { AssetModelsController } from './asset-models.controller';
import { AssetModelsService } from './asset-models.service';

@Module({
  controllers: [AssetModelsController],
  providers: [AssetModelsService],
})
export class AssetModelsModule {}
