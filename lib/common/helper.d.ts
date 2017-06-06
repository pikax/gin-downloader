import { MangaXDoc } from "../declarations";
export declare const parseDoc: (source: string, params?: {
    location: string;
}) => MangaXDoc;
export declare const sanitize: (children: CheerioElement[]) => CheerioElement[];
