/// <reference types="cheerio" />
export declare const parseDoc: (source: string, params?: {
    location: string;
}) => any;
export declare const sanitize: (children: CheerioElement[]) => CheerioElement[];
export declare const sanitizeName: (name: string) => string;
export declare const procFilter: (condition: any, def?: any) => any;
