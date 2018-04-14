/* LicencedError */

export function LicencedError(mangaSite: string, mangaName: string) {
    const instance: any = new Error(`${mangaSite} has '${mangaName}' licenced.`);
    instance.mangaSite = mangaSite;
    instance.mangaName = mangaName;
    Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
    if (Error.captureStackTrace) {
        Error.captureStackTrace(instance, LicencedError);
    }
    return instance;
}

LicencedError.prototype = Object.create(Error.prototype, {
    constructor: {
        value: Error,
        enumerable: false,
        writable: true,
        configurable: true
    }
});
if (Object.setPrototypeOf) {
    Object.setPrototypeOf(LicencedError, Error);
} else {
    LicencedError.__proto__ = Error;
}

/* /LicencedError */



/* ImageNotFoundError */

export function ImageNotFoundError(mangaSite: string, uri: string, errorId: string) {
    const instance: any = new Error(`Image not found: ${errorId}`);
    instance.mangaSite = mangaSite;
    instance.errorId = errorId;
    instance.uri = uri;
    Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
    if (Error.captureStackTrace) {
        Error.captureStackTrace(instance, ImageNotFoundError);
    }
    return instance;
}

ImageNotFoundError.prototype = Object.create(Error.prototype, {
    constructor: {
        value: Error,
        enumerable: false,
        writable: true,
        configurable: true
    }
});
if (Object.setPrototypeOf) {
    Object.setPrototypeOf(ImageNotFoundError, Error);
} else {
    ImageNotFoundError.__proto__ = Error;
}

/* /LicencedError */


