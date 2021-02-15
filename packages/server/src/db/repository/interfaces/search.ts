import { SearchQuery, SearchResult } from 'src/models/search';

export default interface SearchRepository {
    search: (query: SearchQuery) => Promise<SearchResult>
}