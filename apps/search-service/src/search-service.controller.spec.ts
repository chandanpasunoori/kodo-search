import { Test, TestingModule } from '@nestjs/testing';
import { SearchRequest } from '../../kodo-search/src/dto/search-request.input';
import { SearchServiceController } from './search-service.controller';
import { SearchServiceService } from './search-service.service';

describe('SearchServiceController', () => {
  let searchServiceController: SearchServiceController;
  let searchService: SearchServiceService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SearchServiceController],
      providers: [SearchServiceService],
    }).compile();

    searchServiceController = app.get<SearchServiceController>(SearchServiceController);
    searchService = app.get<SearchServiceService>(SearchServiceService);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(searchServiceController.getHello()).toBe('Hello World!');
    });
  });
  describe('search', () => {
    it('response pageSize number should match request pageSize number', async (done) => {
      const searchRequest: SearchRequest = {
        searchTerm: 'Customer "Assurance"',
        sort: 'title',
        page: 1,
        pageSize: 10
      };
      searchServiceController.search(searchRequest, null).then((res) => {
        expect(res.pageSize).toStrictEqual(searchRequest.pageSize);
        done();
      })
    });

    it('should exact match on searchTerm substring with double quotes', async (done) => {
      const searchRequest: SearchRequest = {
        searchTerm: 'Customer "Assurance"',
        sort: 'title',
        page: 1,
        pageSize: 10
      };
      searchServiceController.search(searchRequest, null).then((res) => {
        // console.log("map:", res.result.map(i => i.name))
        expect(res.result.map(i => i.name)).toStrictEqual(['Customer Assurance Liaison', 'Customer Assurance Analyst', 'Internal Assurance Manager']);
        done();
      })
    });

    it('response should be sorted in desc order for dateLastEdited', async (done) => {
      const searchRequest: SearchRequest = {
        searchTerm: 'Customer "Assurance"',
        sort: 'dateLastEdited',
        page: 1,
        pageSize: 10
      };
      searchServiceController.search(searchRequest, null).then((res) => {
        // console.log("map:", res.result.map(i => i.dateLastEdited))
        expect(res.result.map(i => i.dateLastEdited)).toStrictEqual(['2018-09-26T09:54:00.243Z', '2018-07-15T17:36:05.500Z', '2018-05-19T12:33:25.545Z']);
        done();
      })
    });
  });

});
