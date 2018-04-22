import { IMangaDependencies, IMangaResolvers, IMangaResolversFactory } from "../interface";
export declare class DefaultResolverFactory implements IMangaResolversFactory {
    build(di: IMangaDependencies): IMangaResolvers;
}
