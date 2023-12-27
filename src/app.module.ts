import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { connectionParams } from '../ormconfig'
import { UserModule } from './user/user.module'
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [TypeOrmModule.forRoot(connectionParams), UserModule, RedisModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
