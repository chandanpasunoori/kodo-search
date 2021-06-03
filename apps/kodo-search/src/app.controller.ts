import { Controller, Get, Query } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("/search")
  async search(@Query("searchTerm") searchTerm: string, @Query("sort") sort: string, @Query("page") page: number = 1, @Query("pageSize") pageSize: number = 10): Promise<Observable<any>> {
    return this.appService.search({ searchTerm: searchTerm, sort: sort, page, pageSize });
  }
}
