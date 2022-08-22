import { Controller, Sse } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { map, Observable, switchMap, timer } from 'rxjs';
import { CryptoService } from './crypto.service';

@Controller('crypto')
export class CryptoController {
  constructor(private readonly cryptoService: CryptoService) {}

  @Sse('currency')
  sse() {
    return timer(0, 10000).pipe(
      switchMap(() => this.cryptoService.getCryptoInfo()),
      map((data) => {
        return { data };
      }),
    );
  }
}
