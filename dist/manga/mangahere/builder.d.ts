import { IMangaBuilder, IMangaDependencies, RequestFactoryMangaDependencies } from "../../interface";
export declare class MangaHereBuilder implements IMangaBuilder {
    build(di: RequestFactoryMangaDependencies): IMangaDependencies;
}
