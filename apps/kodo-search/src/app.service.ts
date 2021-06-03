import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class AppService {
  constructor(
    @Inject('SEARCH_SERVICE') private searchService: ClientProxy,
  ) { }
  getHello(): string {
    return 'Hello World!';
  }

  async search(query: { searchTerm: string, sort: string, page: number, pageSize: number }): Promise<Observable<any>> {
    // console.log("firing search query: ", query);
    return this.searchService.send({ cmd: "search" }, query);
  }
}
