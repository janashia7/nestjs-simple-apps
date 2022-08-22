import { Injectable } from '@nestjs/common';

import { find } from 'geo-tz';
import * as moment from 'moment-timezone';
import { UserRepository } from 'src/db/user.repository';

@Injectable()
export class TimezoneService {
  timeConvert(time: string, location: object) {
    const localTimeZone = find(location['latitude'], location['longitude']);

    return moment.tz(time, 'HH:mm', localTimeZone[0]).utc().format('HH:mm');
  }
}
