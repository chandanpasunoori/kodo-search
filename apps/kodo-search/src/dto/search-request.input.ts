import { ParseIntPipe } from '@nestjs/common';
import { IsNumberString, IsInt, Max, Length } from 'class-validator';

export class SearchRequest {

    @Length(1, 200)
    searchTerm: string;

    sort: string;

    @IsNumberString()
    page: number;

    @IsNumberString()
    pageSize: number;
}
