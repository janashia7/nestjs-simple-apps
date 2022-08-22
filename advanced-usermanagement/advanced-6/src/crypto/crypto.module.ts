import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CryptoService } from './crypto.service';
import { CryptoController } from './crypto.controller';
@Module({
  imports: [HttpModule],
  controllers: [CryptoController],
  providers: [CryptoService],
})
export class CryptoModule {}
