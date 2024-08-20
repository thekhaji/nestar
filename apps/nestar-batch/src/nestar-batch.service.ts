import { Injectable } from '@nestjs/common';

@Injectable()
export class NestarBatchService {
  getHello(): string {
    console.log("BATCH");
    
    return 'Welcome to NESTAR BATCH Server!';
  }
}
