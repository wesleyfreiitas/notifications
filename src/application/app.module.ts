import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { HttpModule } from 'src/infra/http.module';

@Module({
  imports: [HttpModule, DatabaseModule],
})
export class AppModule {}
