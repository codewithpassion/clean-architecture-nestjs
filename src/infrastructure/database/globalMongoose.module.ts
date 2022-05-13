import { DynamicModule } from '@nestjs/common';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';

export class GlobalMongooseModule {
  /**
   * Create a Mongoose (Nest-JS) model that is marked as global.
   */
  static forFeature(
    models?: ModelDefinition[],
    connectionName?: string,
  ): DynamicModule {
    const result = MongooseModule.forFeature(models, connectionName);
    result.global = true;
    return result;
  }
}
