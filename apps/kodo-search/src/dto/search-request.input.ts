import { IsNumberString, Length } from 'class-validator';

export class SearchRequest {

    @Length(1, 200)
    searchTerm: string;

    sort: string;

    @IsNumberString()
    page: number;

    @IsNumberString()
    pageSize: number;
}
