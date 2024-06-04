import { Injectable } from '@nestjs/common';
import { NtpTimeSync } from 'ntp-time-sync';

@Injectable()
export class NTPService {
  async getTime() {
    const ntp = NtpTimeSync.getInstance();
    return (await ntp.getTime()).now.getTime();
  }
}
