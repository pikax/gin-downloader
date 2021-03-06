// not found mangas
const invalidMangas = [
    "www.mangahere.cc/manga/a_method_to_make_the_world_gentle/",
    "www.mangahere.cc/manga/a_trail_of_blood/",
    "www.mangahere.cc/manga/acma_game/",
    "www.mangahere.cc/manga/assassination_classroom_extra/",
    "www.mangahere.cc/manga/assassins_pride/",
    "www.mangahere.cc/manga/blue_cat_happy/",
    "www.mangahere.cc/manga/chaos_theory/",
    "www.mangahere.cc/manga/dragon_ball_super/",
    "www.mangahere.cc/manga/fairy_tail_blue_mistral_wendel_s_adventure/",
    "www.mangahere.cc/manga/fairy_tail_omake/",
    "www.mangahere.cc/manga/fairy_tail_sabertooth/",
    "www.mangahere.cc/manga/forest_of_drizzling_rain/",
    "www.mangahere.cc/manga/heavenly_executioner_chiwoo/",
    "www.mangahere.cc/manga/i_female_robot/",
    "www.mangahere.cc/manga/itsuka_no_seishun/",
    "www.mangahere.cc/manga/kashikoi_ken_lilienthal/",
    "www.mangahere.cc/manga/life_and_death_hei_ye_zhi_ge/",
    "www.mangahere.cc/manga/nanatsu_no_taizai_seven_days/",
    "www.mangahere.cc/manga/one_piece_colored/",
    "www.mangahere.cc/manga/one_shot_meteor_syndrome/",
    "www.mangahere.cc/manga/rurouni_kenshin_to_rule_flame/",
    "www.mangahere.cc/manga/suzuki_san_no_suzuki_kun/",
    "www.mangahere.cc/manga/the_end_of_elysion/",
    "www.mangahere.cc/manga/the_scholar_who_walks_the_night/",
    "www.mangahere.cc/manga/the_seven_deadly_sins_side_story/",
    "www.mangahere.cc/manga/the_seven_deadly_sins_side_story_the_young_girl_s_unbearable_dream/",
    "www.mangahere.cc/manga/to_the_abandoned_sacred_beasts/",
    "www.mangahere.cc/manga/tokyo_alien_bros/",
    "www.mangahere.cc/manga/toukaido_hisame/",
    "www.mangahere.cc/manga/tsukiatte_kudasai/",
    "www.mangahere.cc/manga/yagyu_jubei_dies/",
];


const invalidSet = new Set(invalidMangas);


export class MangaHereMangaValidator {
    isValid(src: string) {
        // TODO improve performance
        return !invalidMangas.find(x => src.endsWith(x));
    }
}

