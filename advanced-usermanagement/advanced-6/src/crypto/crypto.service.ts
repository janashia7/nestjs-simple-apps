import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { from, map, Observable, tap } from 'rxjs';

@Injectable()
export class CryptoService {
  constructor(private httpService: HttpService) {}

  getCryptoInfo(): Observable<AxiosResponse<[]>> {
    return from(
      this.httpService
        .get('https://api.coincap.io/v2/assets', {
          params: {
            limit: 5,
          },
        })
        .pipe(map(({ data }) => this.dataFilter(data.data))),
    );
  }

  private dataFilter(coins) {
    return coins.map((coin) => {
      return {
        id: coin.id,
        name: coin.name,
        symbol: coin.symbol,
        rank: coin.rank,
        price: coin.priceUsd,
      };
    });
  }
}
