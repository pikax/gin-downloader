import { FilterSupport, MangaFilter, MangaXDoc } from "../declarations";
export declare const parseDoc: (source: string, params?: {
    location: string;
}) => MangaXDoc;
export declare const sanitize: (children: CheerioElement[]) => CheerioElement[];
export declare const procFilter: (condition: string | MangaFilter, def?: MangaFilter) => FilterSupport;
