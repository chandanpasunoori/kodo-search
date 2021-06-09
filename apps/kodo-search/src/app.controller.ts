import { ParseBoolPipe, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { UsePipes } from '@nestjs/common';
import { Controller, Get, Query } from '@nestjs/common';
import { SearchResult } from 'apps/search-service/src/dto/search-result';
import { Observable } from 'rxjs';
import { AppService } from './app.service';
import { SearchRequest } from './dto/search-request.input';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("/search")
  async search(@Query("searchTerm") searchTerm: string, @Query("sort") sort: string, @Query("page") page: number, @Query("pageSize") pageSize: number): Promise<Observable<SearchResult>> {
    if (!searchTerm) {
      searchTerm = '';
    }
    if (!sort) {
      sort = 'title';
    }
    if (!pageSize) {
      pageSize = 10;
    }
    if (!page) {
      page = 1;
    }
    const searchRequest: SearchRequest = { searchTerm: searchTerm, sort: sort, page: page, pageSize: pageSize }
    // console.log("searchRequest:", searchRequest)
    return this.appService.search(searchRequest);
  }
}
