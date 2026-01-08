import { Module } from '@nestjs/common';
import { HttpModule } from './infra/http/http.module';
import { DatabaseModule } from '@infra/database/database.module';
import { AuthModule } from '@infra/http/auth/auth.module';
import { GatewayModule } from '@infra/ws/gateway.module';

@Module({
  imports: [AuthModule, HttpModule, DatabaseModule, GatewayModule],
})
export class AppModule {}
