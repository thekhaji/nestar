import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    console.log("API");
    return 'Welcome to NESTAR API SERVER!';
  }
}
