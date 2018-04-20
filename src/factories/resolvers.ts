import {IMangaDependencies, IMangaResolvers, IMangaResolversFactory} from "../interface";
import {ImageResolver} from "../resolvers/imageResolver";
import {ChapterResolver} from "../resolvers/chapterResolver";
import {InfoResolver} from "../resolvers/infoResolver";


export class DefaultResolverFactory implements IMangaResolversFactory {
    build(di: IMangaDependencies): IMangaResolvers {

        const imageResolver = new ImageResolver(di);
        const chapterResolver = new ChapterResolver(di);
        const infoResolver = new InfoResolver(di);

        return {
            imageResolver,
            chapterResolver,
            infoResolver,
        };
    }
}

