import { Controller, Get } from '@nestjs/common';
import { MessagePattern, Payload, Ctx, NatsContext } from '@nestjs/microservices';
import { SearchServiceService } from './search-service.service';

@Controller()
export class SearchServiceController {
  constructor(private readonly searchServiceService: SearchServiceService) { }

  @Get()
  getHello(): string {
    return this.searchServiceService.getHello();
  }

  @MessagePattern({ cmd: 'search' })
  async search(@Payload() searchTerm: { searchTerm: string, sort: string }, @Ctx() context: NatsContext): Promise<any> {
    console.log("search term: ", searchTerm);
    console.log(`Subject: ${context.getSubject()}`);
    return this.searchServiceService.search(searchTerm);
  }
}
