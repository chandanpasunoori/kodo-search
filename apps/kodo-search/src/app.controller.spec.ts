import { ClientsModule, Transport } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { doesNotMatch } from 'assert';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        ClientsModule.register([
          {
            name: 'SEARCH_SERVICE',
            transport: Transport.NATS,
            options: {
              url: 'nats://demo.nats.io:4222',
            }
          },
        ]),
      ],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
  describe('search', () => {
    it('response should match', async (done) => {
      (await appController.search('Customer "Assurance"', 'title', 1, 1)).subscribe((res) => {
        expect(res).toStrictEqual({ "result": [{ "name": "Customer Assurance Liaison", "image": "http://lorempixel.com/640/480", "description": "Vel voluptatem id repudiandae aut omnis. Deleniti tempore aliquam quia magnam eos. Sunt saepe nisi delectus.", "dateLastEdited": "2018-05-19T12:33:25.545Z" }], "page": 1, "totalItems": 3, "totalPages": 3, "pageSize": 1 });
        done();
      })
    });

    it('service response should match with controller', async (done) => {
      (await appController.search('Customer "Assurance"', 'title', 1, 1)).subscribe(async (res) => {
        (await appService.search({
          searchTerm: 'Customer "Assurance"', sort: 'title', page: 1, pageSize: 1
        })).subscribe((res1) => {
          expect(res).toStrictEqual(res1);
          done();
        })
      })
    });

    it('response page number should match request page number', async (done) => {
      (await appController.search('Customer "Assurance"', 'title', 2, 1)).subscribe((res) => {
        expect(res.page).toStrictEqual(2);
        done();
      })
    });

    it('response pageSize number should match request pageSize number', async (done) => {
      (await appController.search('Customer "Assurance"', 'title', 1, 2)).subscribe((res) => {
        expect(res.pageSize).toStrictEqual(2);
        done();
      })
    });
  });
});
