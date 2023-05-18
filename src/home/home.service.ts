import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class HomeService {
  constructor(private readonly homeRepository: Repository<any>) {}

  getData() {
    return this.homeRepository.find();
  }
}

// YOU NEED TO GENERATE A QUERY TO DB TO FETCH ALL DATA MAYBE ??????
