import { Controller, Get } from '@nestjs/common';
import { MessagePattern, Payload, Ctx, NatsContext } from '@nestjs/microservices';
import { SearchRequest } from '../../kodo-search/src/dto/search-request.input';
import { SearchResult } from './dto/search-result';
import { SearchServiceService } from './search-service.service';

@Controller()
export class SearchServiceController {
  constructor(private readonly searchServiceService: SearchServiceService) { }

  @Get()
  getHello(): string {
    return this.searchServiceService.getHello();
  }

  @MessagePattern({ cmd: 'search' })
  async search(@Payload() searchRequest: SearchRequest, @Ctx() context: NatsContext): Promise<SearchResult> {
    // console.log("search term: ", searchTerm);
    // console.log(`Subject: ${context.getSubject()}`);
    return this.searchServiceService.search(searchRequest);
  }
}
