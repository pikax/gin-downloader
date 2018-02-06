export declare let reqConfig: {
    maxRetries: number;
    timeout: number;
    interval: number;
    disableHttps: boolean;
    request: {
        jar: boolean;
        gzip: boolean;
        followAllRedirects: boolean;
        forever: boolean;
        proxy: string;
        headers: {
            "Accept-Charset": string;
            "Accept-Language": string;
            "Connection": string;
            "Accept": string;
            "User-Agent": string;
            "Accept-Encoding": string;
        };
    };
};
export declare function overrideOpts(opts: any): {
    maxRetries: number;
    timeout: number;
    interval: number;
    disableHttps: boolean;
    request: {
        jar: boolean;
        gzip: boolean;
        followAllRedirects: boolean;
        forever: boolean;
        proxy: string;
        headers: {
            "Accept-Charset": string;
            "Accept-Language": string;
            "Connection": string;
            "Accept": string;
            "User-Agent": string;
            "Accept-Encoding": string;
        };
    };
};
