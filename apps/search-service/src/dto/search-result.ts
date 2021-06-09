import { SearchItem } from "./search-item";

export class SearchResult {
    result: SearchItem[];
    page: number;
    totalItems: number;
    totalPages: number;
    pageSize: number
}