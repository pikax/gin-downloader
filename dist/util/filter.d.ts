import { filter, GenreFilter, MangaFilter } from "../filter";
export declare const sanitizeFilter: (condition: string | MangaFilter) => filter.FilterSupport;
export declare const sanitizeGenre: (genre: any) => GenreFilter;
