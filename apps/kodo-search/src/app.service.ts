import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { SearchResult } from 'apps/search-service/src/dto/search-result';
import { Observable } from 'rxjs';
import { SearchRequest } from './dto/search-request.input';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
@Injectable()
export class AppService {
  constructor(
    @Inject('SEARCH_SERVICE') private searchService: ClientProxy,
  ) { }
  getHello(): string {
    return 'Hello World!';
  }

  async search(searchRequest: SearchRequest): Promise<Observable<SearchResult>> {
    // console.log("firing search query: ", query);
    return this.searchService.send({ cmd: "search" }, searchRequest).pipe(catchError(e => of({
      code: 1,
      message: "request failed to process"
    })));
  }
}
