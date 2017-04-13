"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("./config");
var names = {
    "(Sokuhou) Class no Ikemen ga Watashi no Shinkyoku ni Muchuu na Ken.": "Sokuhou--Class-no-Ikemen-ga-Watashi-no-Shinkyoku-ni-Muchuu-na-Ken-",
    "5-tsu no Hajimete - Ubawarete mo Ii, Kimi ni Nara": "5-tsu-no-Hajimete-Ubawarete-mo-Ii--Kimi-ni-Nara",
    "Again!!": "Again-",
    "Akai Kami no Marure Ina ﻿": "Akai-Kami-no-Marure-Ina-",
    "Akuma na Cupid": "Akuma-na-Cupid-one-shot",
    "Mayuge no Kakudo wa 45° de": "Mayuge-no-Kakudo-wa-45°-de",
    "Alice Binetsu 38°C - We Are Tsubasa ga Oka D.C": "Alice-Binetsu-38°C-We-Are-Tsubasa-ga-Oka-D-C",
    "Akuma no Kagi to Shoujo no Raison d'Être": "Akuma-no-Kagi-to-Shoujo-no-Raison-d-Etre",
    "He~nshin!! - Sonata Birdie Rush": "He-nshin-Sonata-Birdie-Rush",
    "Anagura Amélie": "Anagram-Amelie",
    "B&W": "B&W",
    "Blaze(ComicGT)": "Blaze-ComicGT",
    "Cactus and Radio": "Cactus-and-Radio-Hanquocdai",
    "Chiyou yo Hana yo": "Chiyou-y-%20Hana-yo",
    "Hell's Kitchen": "Hell’s-Kitchen",
    "Ayeshah’s Secret": "Ayeshah-s-Secret",
    "Ansatsu Kyoushitsu Spin-off  Koro-sense Q!": "Ansatsu-Kyoushitsu-Spin-off--Koro-sense-Q",
    "Atelier - Escha & Logy": "Escha-Logy-no-Atelier-Tasogare-no-Sora-no-Renkinjutsushi",
    // TODO double check this conditions
    "Chocolat (Kubonouchi Eisaku)": "Chocolat",
    "Code Geass - Soubou no Oz": "Code-Geas--Soubou-no-Oz",
    "Coffee & Vanilla": "Coffee-&-Vanilla",
    "Confidential Confessions": "Confidential-confessions",
    "Danganronpa - Kibou no Gakuen to Zetsubou no Koukouse": "DANGANRONPA-KIBOU-NO-GAKUEN-TO-ZETSUBOU-NO-KOUKOUSEI",
    "Danganronpa 1&2 Comic Anthology": "Danganronpa-1-2-Comic-Anthology",
    "Dear!(Mitsuki Kako)": "Dear-Mitsuki-Kako",
    "Death Note [Colored Edition]": "Death-Note-Colored-Edition",
    "Devil's Bride(RHIM Ju Yeon)": "Devil-s-Bride-RHIM-Ju-Yeon",
    "Di[e]ce": "Di-e-ce",
    "Do Da Dancin'!": "Do-Da-Dancin",
    "Dungeon ni Deai o Motomeru no wa Machigatte Iru Darou ka: Familia Chronicle Episode Ryu": "Dungeon-ni-Deai-o-Motomeru-no-wa-Machigatte-Iru-Darou-ka--Familia-Chronicle-Episode-Ryu",
    "Fairy Heart": "Fairy-Heart-hanquocdai",
    "Fairy Tail Gaiden - Road Knight": "Fairy-Tail-Gaiden-Lord-Knight",
    "Fate/Mahjong Night - Seihai Sensou": "Fate-Mahjong-Seihai-Sensou",
    "Flowers of Evil (Manhwa)": "Flowers-of-Evil",
    "For Someone": "For-Someon",
    "Fuan no Tane": "Fuan-no-Tane----",
    "Fuan no Tane +": "Fuan-no-Tane-+",
    "Ge~sen Fishing": "Ge-sen-Fishing",
    "Gestalt(OOTSUKI Miu)": "Gestalt-OOTSUKI-Miu",
    "Girls & Panzer - Little Army II": "Girls-&-Panzer-Little-Army-II",
    "Gunjou(NAKAMURA Ching)": "Gunjou-NAKAMURA-Ching",
    "Haiyore! Nyaruko-san": "Haiyore--Nyaruko-san",
    "Hentai Kamen S –Hentai Kamen Second": "Hentai-Kamen-S-Hentai-Kamen-Second",
    "HIMAWARI★ROCK YOU!!": "HIMAWARI-ROCK-YOU",
    "Himouto! Umaru-chan S": "Himouto--Umaru-chan-S",
    "Houkago!(Anthology)": "Houkago-Anthology",
    "I Don't Want To Say I'm a Chicken": "I-Don-t-Want-to-Say-I-m-a-Chicken",
    "I\"S": "I-S",
    "ID - The Greatest Fusion Fantasy": "ID-THE-GREATEST-FUSION-FANTASY",
    "I'm the Main Character of a Harem Manga, but I'm Gay So Every Day Is Hell for Me": "I-m-the-Main-Character-of-a-Harem-Manga--but-I-m-Gay-So-Every-Day-Is-Hell-for-Me",
    "In Full Bloom": "In-Full-Bloom-hanquocdai",
    "IS!": "IS-2",
    "Jojo no Kimyou na Bouken - Jojorion (JoJo's Bizarre Adventure Part 8: Jojorion)": "Jojo-no-Kimyou-na-Bouken-Jojorion",
    "JoJo's Bizarre Adventure Part 4: Diamond is Unbreakable": "Diamond-wa-Kudakenai",
    "Kagome Kagome (IKEBE Aoi)": "Kagome-Kagome--IKEBE-Aoi-",
    "Kare wa, Watashi no Koto ga Suki Mitai Desu": "Kare-w-Watashi-no-Koto-ga-Suki-Mitai-Desu",
    "Katekyo Hitman Reborn!": "Kateikyoushi-Hitman-Reborn",
    "Kimi o Matsu -> Akaiito": "Kimi-o-Matsu-Akaiito",
    "Kino no Tabi - the Beautiful World (SHIOMIYA Iruka)": "Kino-no-Tabi-%20the-Beautiful-World-SHIOMIYA-Iruka",
    "KissXSis": "Kiss-X-Sis",
    "Kumo Desu ga, Nani ka?": "Kumo-Desu-ga--Nani-ka",
    "Law of Ueki": "Ueki-no-Housoko",
    "Love Me Baby(Sasamura Gou)": "Love-Me-Baby-Sasamura-Gou",
    "Love Mission @": "Love-Mission",
    "Memory [Locked]": "Memory-Locked",
    "Metropolis (KURODA Iou)": "Metropolis",
    "Naka no Hito Genome [Jikkyouchuu]": "Naka-no-Hito-Genome-Jikkyouchuu",
    "Nausicaä of the valley of the wind": "Nausicaä-of-the-valley-of-the-wind",
    "Noblesse (Manhwa)": "Noblesse",
    "Onna no Buki ga Tsukaete Koso Otoko no Ko Desu.": "Onna-no-Buki-ga-Tsukaete-Koso-Otoko-no-Ko-Desu-",
    "Oremonogatari x Nisekoi": "Ore-Koi",
    "Otona no Shoumei ﻿": "Otona-no-Shoumei-",
    "Panty & Stocking with Garterbelt": "Panty-&-Stocking-with-Garterbelt",
    "Pig Bride": "pig-bride",
    "Pigeonhole Fantasia(Season 2)": "Pigeonhole-Fantasia-Season-2",
    "Prince of Prince(Je-Ah)": "Prince-of-Prince-Je-Ah",
    "Raubritter*": "Raubritter",
    "Renai☆SLG": "Renai-SLG",
    "Rico": "Rico-Oneshot",
    "Seigi no Mikata! (Miyuki Mitsubachi)": "Seigi-no-Mikata",
    "Seraph of the End": "Owari-no-Serafu",
    "Seshiji o Pin! to - Shikakou Kyougi Dance-bu e Youkoso": "Seshiji-o-Pin--to-Shikakou-Kyougi-Dance-bu-e-Youkoso",
    "Sex=Love2": "Sex-Love2",
    "Shaman": "Shaman-hanquocdai",
    "Shinrei Tantei Yakumo": "Shinrei-Tantei-Yakumo-2009",
    "ShiraYuki PaniMix!  ﻿": "ShiraYuki-PaniMix-",
    "Shirokuma Café": "Shirokuma-Café",
    "Silent Möbius Klein": "Silent-Möbius-Klein",
    "Sono Hoshi o Bokutachi wa Koi to Yobu Koto ni Suru.": "Sono-Hoshi-o-Bokutachi-wa-Koi-to-Yobu-Koto-ni-Suru-",
    "Soul Catcher(S)": "Soul-Catcher-S",
    "ST&RS": "ST-RS",
    "Steel Ball Run (JoJo's Bizarre Adventure Part 7: Steel Ball Run)": "Steel-Ball-Run",
    "Steins;Gate": "Steins-Gate-",
    "Syrup [Bitter] Anthology": "Syrup-Bitter-Anthology",
    "Taiyou no Ijiwaru": "Taiyou-no-Ichiwaru",
    "Takemiya Jin – Web Extras": "Takemiya-Jin-Web-Extras",
    "Tale of the Fighting Freak, Path of the Warrior [Blood and Steel]": "Tale-of-the-Fighting-Freak-Path-of-the-Warrior-Blood-and-Steel",
    "Tensei Shitara Slime Datta Ken: The Ways of Strolling in the Demon Country": "Tensei-Shitara-Slime-Datta-Ken--The-Ways-of-Strolling-in-the-Demon-Country",
    "THE iDOLM@STER Cinderella Girls Shuffle!! - Idol wa Hajimemashita": "Idol-wa-Hajimemashita",
    "The Legendary Moonlight Sculptor": "Dalbic-Jogaksa",
    "The Princess Mirror": "The-Princess-s-Mirror",
    "Tokku Hakkenshi [code:t-8]": "Tokku-Hakkenshi-code-t-8",
    // "Tokyo Toy Box": "Tokyo-Toy-Box-o", // http://kissmanga.com/Manga/Tokyo-Toy-Box
    "Totsuzen Desu ga, Ashita Kekkon Shimasu": "Totsuzen-Desu-ga--Ashita-Kekkon-Shimasu",
    "Tsubakikan no Utsukushi Sugiru Garçon": "Tsubakikan-no-Utsukushi-Sugiru-Garçon",
    "Tsurebito": "Companion",
    "Uchi no Musume no Tame Naraba, Ore wa Moshikashitara Mao mo Taoseru Kamo Shirenai.": "Uchi-no-Musume-no-Tame-Naraba-Ore-wa-Moshikashitara-Mao-mo-Taoseru-Kamo-Shirenai-",
    "Umineko no Naku Koro ni Chiru Episode 7: Requiem of the Golden Witch": "Umineko-no-Naku-Koro-ni-Chiru-Episode-Episode-7-Requiem-of-the-Golden-Witch",
    "Wake Up Deadman": "Wake-Up-Deadman-Second-Season",
    "Witches' Sabbath": "Witches-s--Sabbath",
    "Wow Toilet": "Wow-Sergeant",
    "Yagate Kimi ni Naru": "Yagate-kun-ni-Naru",
    "Zettai Zetsubou Shoujo - Danganronpa Another Episode - Genocider Mode": "Zettai-Zetsubou-Shoujo-Danganronpa-Another-Episode---Genocider-Mode",
    "Valkyrie%20Profile": "Valkyrie%20Profile",
};
var latin_map = { "Á": "A", "Ă": "A", "Ắ": "A", "Ặ": "A", "Ằ": "A", "Ẳ": "A", "Ẵ": "A", "Ǎ": "A", "Â": "A", "Ấ": "A", "Ậ": "A", "Ầ": "A", "Ẩ": "A", "Ẫ": "A", "Ä": "A", "Ǟ": "A", "Ȧ": "A", "Ǡ": "A", "Ạ": "A", "Ȁ": "A", "À": "A", "Ả": "A", "Ȃ": "A", "Ā": "A", "Ą": "A", "Å": "A", "Ǻ": "A", "Ḁ": "A", "Ⱥ": "A", "Ã": "A", "Ꜳ": "AA", "Æ": "AE", "Ǽ": "AE", "Ǣ": "AE", "Ꜵ": "AO", "Ꜷ": "AU", "Ꜹ": "AV", "Ꜻ": "AV", "Ꜽ": "AY", "Ḃ": "B", "Ḅ": "B", "Ɓ": "B", "Ḇ": "B", "Ƀ": "B", "Ƃ": "B", "Ć": "C", "Č": "C", "Ç": "C", "Ḉ": "C", "Ĉ": "C", "Ċ": "C", "Ƈ": "C", "Ȼ": "C", "Ď": "D", "Ḑ": "D", "Ḓ": "D", "Ḋ": "D", "Ḍ": "D", "Ɗ": "D", "Ḏ": "D", "ǲ": "D", "ǅ": "D", "Đ": "D", "Ƌ": "D", "Ǳ": "DZ", "Ǆ": "DZ", "É": "E", "Ĕ": "E", "Ě": "E", "Ȩ": "E", "Ḝ": "E", "Ê": "E", "Ế": "E", "Ệ": "E", "Ề": "E", "Ể": "E", "Ễ": "E", "Ḙ": "E", "Ë": "E", "Ė": "E", "Ẹ": "E", "Ȅ": "E", "È": "E", "Ẻ": "E", "Ȇ": "E", "Ē": "E", "Ḗ": "E", "Ḕ": "E", "Ę": "E", "Ɇ": "E", "Ẽ": "E", "Ḛ": "E", "Ꝫ": "ET", "Ḟ": "F", "Ƒ": "F", "Ǵ": "G", "Ğ": "G", "Ǧ": "G", "Ģ": "G", "Ĝ": "G", "Ġ": "G", "Ɠ": "G", "Ḡ": "G", "Ǥ": "G", "Ḫ": "H", "Ȟ": "H", "Ḩ": "H", "Ĥ": "H", "Ⱨ": "H", "Ḧ": "H", "Ḣ": "H", "Ḥ": "H", "Ħ": "H", "Í": "I", "Ĭ": "I", "Ǐ": "I", "Î": "I", "Ï": "I", "Ḯ": "I", "İ": "I", "Ị": "I", "Ȉ": "I", "Ì": "I", "Ỉ": "I", "Ȋ": "I", "Ī": "I", "Į": "I", "Ɨ": "I", "Ĩ": "I", "Ḭ": "I", "Ꝺ": "D", "Ꝼ": "F", "Ᵹ": "G", "Ꞃ": "R", "Ꞅ": "S", "Ꞇ": "T", "Ꝭ": "IS", "Ĵ": "J", "Ɉ": "J", "Ḱ": "K", "Ǩ": "K", "Ķ": "K", "Ⱪ": "K", "Ꝃ": "K", "Ḳ": "K", "Ƙ": "K", "Ḵ": "K", "Ꝁ": "K", "Ꝅ": "K", "Ĺ": "L", "Ƚ": "L", "Ľ": "L", "Ļ": "L", "Ḽ": "L", "Ḷ": "L", "Ḹ": "L", "Ⱡ": "L", "Ꝉ": "L", "Ḻ": "L", "Ŀ": "L", "Ɫ": "L", "ǈ": "L", "Ł": "L", "Ǉ": "LJ", "Ḿ": "M", "Ṁ": "M", "Ṃ": "M", "Ɱ": "M", "Ń": "N", "Ň": "N", "Ņ": "N", "Ṋ": "N", "Ṅ": "N", "Ṇ": "N", "Ǹ": "N", "Ɲ": "N", "Ṉ": "N", "Ƞ": "N", "ǋ": "N", "Ñ": "N", "Ǌ": "NJ", "Ó": "O", "Ŏ": "O", "Ǒ": "O", "Ô": "O", "Ố": "O", "Ộ": "O", "Ồ": "O", "Ổ": "O", "Ỗ": "O", "Ö": "O", "Ȫ": "O", "Ȯ": "O", "Ȱ": "O", "Ọ": "O", "Ő": "O", "Ȍ": "O", "Ò": "O", "Ỏ": "O", "Ơ": "O", "Ớ": "O", "Ợ": "O", "Ờ": "O", "Ở": "O", "Ỡ": "O", "Ȏ": "O", "Ꝋ": "O", "Ꝍ": "O", "Ō": "O", "Ṓ": "O", "Ṑ": "O", "Ɵ": "O", "Ǫ": "O", "Ǭ": "O", "Ø": "O", "Ǿ": "O", "Õ": "O", "Ṍ": "O", "Ṏ": "O", "Ȭ": "O", "Ƣ": "OI", "Ꝏ": "OO", "Ɛ": "E", "Ɔ": "O", "Ȣ": "OU", "Ṕ": "P", "Ṗ": "P", "Ꝓ": "P", "Ƥ": "P", "Ꝕ": "P", "Ᵽ": "P", "Ꝑ": "P", "Ꝙ": "Q", "Ꝗ": "Q", "Ŕ": "R", "Ř": "R", "Ŗ": "R", "Ṙ": "R", "Ṛ": "R", "Ṝ": "R", "Ȑ": "R", "Ȓ": "R", "Ṟ": "R", "Ɍ": "R", "Ɽ": "R", "Ꜿ": "C", "Ǝ": "E", "Ś": "S", "Ṥ": "S", "Š": "S", "Ṧ": "S", "Ş": "S", "Ŝ": "S", "Ș": "S", "Ṡ": "S", "Ṣ": "S", "Ṩ": "S", "Ť": "T", "Ţ": "T", "Ṱ": "T", "Ț": "T", "Ⱦ": "T", "Ṫ": "T", "Ṭ": "T", "Ƭ": "T", "Ṯ": "T", "Ʈ": "T", "Ŧ": "T", "Ɐ": "A", "Ꞁ": "L", "Ɯ": "M", "Ʌ": "V", "Ꜩ": "TZ", "Ú": "U", "Ŭ": "U", "Ǔ": "U", "Û": "U", "Ṷ": "U", "Ü": "U", "Ǘ": "U", "Ǚ": "U", "Ǜ": "U", "Ǖ": "U", "Ṳ": "U", "Ụ": "U", "Ű": "U", "Ȕ": "U", "Ù": "U", "Ủ": "U", "Ư": "U", "Ứ": "U", "Ự": "U", "Ừ": "U", "Ử": "U", "Ữ": "U", "Ȗ": "U", "Ū": "U", "Ṻ": "U", "Ų": "U", "Ů": "U", "Ũ": "U", "Ṹ": "U", "Ṵ": "U", "Ꝟ": "V", "Ṿ": "V", "Ʋ": "V", "Ṽ": "V", "Ꝡ": "VY", "Ẃ": "W", "Ŵ": "W", "Ẅ": "W", "Ẇ": "W", "Ẉ": "W", "Ẁ": "W", "Ⱳ": "W", "Ẍ": "X", "Ẋ": "X", "Ý": "Y", "Ŷ": "Y", "Ÿ": "Y", "Ẏ": "Y", "Ỵ": "Y", "Ỳ": "Y", "Ƴ": "Y", "Ỷ": "Y", "Ỿ": "Y", "Ȳ": "Y", "Ɏ": "Y", "Ỹ": "Y", "Ź": "Z", "Ž": "Z", "Ẑ": "Z", "Ⱬ": "Z", "Ż": "Z", "Ẓ": "Z", "Ȥ": "Z", "Ẕ": "Z", "Ƶ": "Z", "Ĳ": "IJ", "Œ": "OE", "ᴀ": "A", "ᴁ": "AE", "ʙ": "B", "ᴃ": "B", "ᴄ": "C", "ᴅ": "D", "ᴇ": "E", "ꜰ": "F", "ɢ": "G", "ʛ": "G", "ʜ": "H", "ɪ": "I", "ʁ": "R", "ᴊ": "J", "ᴋ": "K", "ʟ": "L", "ᴌ": "L", "ᴍ": "M", "ɴ": "N", "ᴏ": "O", "ɶ": "OE", "ᴐ": "O", "ᴕ": "OU", "ᴘ": "P", "ʀ": "R", "ᴎ": "N", "ᴙ": "R", "ꜱ": "S", "ᴛ": "T", "ⱻ": "E", "ᴚ": "R", "ᴜ": "U", "ᴠ": "V", "ᴡ": "W", "ʏ": "Y", "ᴢ": "Z", "á": "a", "ă": "a", "ắ": "a", "ặ": "a", "ằ": "a", "ẳ": "a", "ẵ": "a", "ǎ": "a", "â": "a", "ấ": "a", "ậ": "a", "ầ": "a", "ẩ": "a", "ẫ": "a", "ä": "a", "ǟ": "a", "ȧ": "a", "ǡ": "a", "ạ": "a", "ȁ": "a", "à": "a", "ả": "a", "ȃ": "a", "ā": "a", "ą": "a", "ᶏ": "a", "ẚ": "a", "å": "a", "ǻ": "a", "ḁ": "a", "ⱥ": "a", "ã": "a", "ꜳ": "aa", "æ": "ae", "ǽ": "ae", "ǣ": "ae", "ꜵ": "ao", "ꜷ": "au", "ꜹ": "av", "ꜻ": "av", "ꜽ": "ay", "ḃ": "b", "ḅ": "b", "ɓ": "b", "ḇ": "b", "ᵬ": "b", "ᶀ": "b", "ƀ": "b", "ƃ": "b", "ɵ": "o", "ć": "c", "č": "c", "ç": "c", "ḉ": "c", "ĉ": "c", "ɕ": "c", "ċ": "c", "ƈ": "c", "ȼ": "c", "ď": "d", "ḑ": "d", "ḓ": "d", "ȡ": "d", "ḋ": "d", "ḍ": "d", "ɗ": "d", "ᶑ": "d", "ḏ": "d", "ᵭ": "d", "ᶁ": "d", "đ": "d", "ɖ": "d", "ƌ": "d", "ı": "i", "ȷ": "j", "ɟ": "j", "ʄ": "j", "ǳ": "dz", "ǆ": "dz", "é": "e", "ĕ": "e", "ě": "e", "ȩ": "e", "ḝ": "e", "ê": "e", "ế": "e", "ệ": "e", "ề": "e", "ể": "e", "ễ": "e", "ḙ": "e", "ë": "e", "ė": "e", "ẹ": "e", "ȅ": "e", "è": "e", "ẻ": "e", "ȇ": "e", "ē": "e", "ḗ": "e", "ḕ": "e", "ⱸ": "e", "ę": "e", "ᶒ": "e", "ɇ": "e", "ẽ": "e", "ḛ": "e", "ꝫ": "et", "ḟ": "f", "ƒ": "f", "ᵮ": "f", "ᶂ": "f", "ǵ": "g", "ğ": "g", "ǧ": "g", "ģ": "g", "ĝ": "g", "ġ": "g", "ɠ": "g", "ḡ": "g", "ᶃ": "g", "ǥ": "g", "ḫ": "h", "ȟ": "h", "ḩ": "h", "ĥ": "h", "ⱨ": "h", "ḧ": "h", "ḣ": "h", "ḥ": "h", "ɦ": "h", "ẖ": "h", "ħ": "h", "ƕ": "hv", "í": "i", "ĭ": "i", "ǐ": "i", "î": "i", "ï": "i", "ḯ": "i", "ị": "i", "ȉ": "i", "ì": "i", "ỉ": "i", "ȋ": "i", "ī": "i", "į": "i", "ᶖ": "i", "ɨ": "i", "ĩ": "i", "ḭ": "i", "ꝺ": "d", "ꝼ": "f", "ᵹ": "g", "ꞃ": "r", "ꞅ": "s", "ꞇ": "t", "ꝭ": "is", "ǰ": "j", "ĵ": "j", "ʝ": "j", "ɉ": "j", "ḱ": "k", "ǩ": "k", "ķ": "k", "ⱪ": "k", "ꝃ": "k", "ḳ": "k", "ƙ": "k", "ḵ": "k", "ᶄ": "k", "ꝁ": "k", "ꝅ": "k", "ĺ": "l", "ƚ": "l", "ɬ": "l", "ľ": "l", "ļ": "l", "ḽ": "l", "ȴ": "l", "ḷ": "l", "ḹ": "l", "ⱡ": "l", "ꝉ": "l", "ḻ": "l", "ŀ": "l", "ɫ": "l", "ᶅ": "l", "ɭ": "l", "ł": "l", "ǉ": "lj", "ſ": "s", "ẜ": "s", "ẛ": "s", "ẝ": "s", "ḿ": "m", "ṁ": "m", "ṃ": "m", "ɱ": "m", "ᵯ": "m", "ᶆ": "m", "ń": "n", "ň": "n", "ņ": "n", "ṋ": "n", "ȵ": "n", "ṅ": "n", "ṇ": "n", "ǹ": "n", "ɲ": "n", "ṉ": "n", "ƞ": "n", "ᵰ": "n", "ᶇ": "n", "ɳ": "n", "ñ": "n", "ǌ": "nj", "ó": "o", "ŏ": "o", "ǒ": "o", "ô": "o", "ố": "o", "ộ": "o", "ồ": "o", "ổ": "o", "ỗ": "o", "ö": "o", "ȫ": "o", "ȯ": "o", "ȱ": "o", "ọ": "o", "ő": "o", "ȍ": "o", "ò": "o", "ỏ": "o", "ơ": "o", "ớ": "o", "ợ": "o", "ờ": "o", "ở": "o", "ỡ": "o", "ȏ": "o", "ꝋ": "o", "ꝍ": "o", "ⱺ": "o", "ō": "o", "ṓ": "o", "ṑ": "o", "ǫ": "o", "ǭ": "o", "ø": "o", "ǿ": "o", "õ": "o", "ṍ": "o", "ṏ": "o", "ȭ": "o", "ƣ": "oi", "ꝏ": "oo", "ɛ": "e", "ᶓ": "e", "ɔ": "o", "ᶗ": "o", "ȣ": "ou", "ṕ": "p", "ṗ": "p", "ꝓ": "p", "ƥ": "p", "ᵱ": "p", "ᶈ": "p", "ꝕ": "p", "ᵽ": "p", "ꝑ": "p", "ꝙ": "q", "ʠ": "q", "ɋ": "q", "ꝗ": "q", "ŕ": "r", "ř": "r", "ŗ": "r", "ṙ": "r", "ṛ": "r", "ṝ": "r", "ȑ": "r", "ɾ": "r", "ᵳ": "r", "ȓ": "r", "ṟ": "r", "ɼ": "r", "ᵲ": "r", "ᶉ": "r", "ɍ": "r", "ɽ": "r", "ↄ": "c", "ꜿ": "c", "ɘ": "e", "ɿ": "r", "ś": "s", "ṥ": "s", "š": "s", "ṧ": "s", "ş": "s", "ŝ": "s", "ș": "s", "ṡ": "s", "ṣ": "s", "ṩ": "s", "ʂ": "s", "ᵴ": "s", "ᶊ": "s", "ȿ": "s", "ɡ": "g", "ᴑ": "o", "ᴓ": "o", "ᴝ": "u", "ť": "t", "ţ": "t", "ṱ": "t", "ț": "t", "ȶ": "t", "ẗ": "t", "ⱦ": "t", "ṫ": "t", "ṭ": "t", "ƭ": "t", "ṯ": "t", "ᵵ": "t", "ƫ": "t", "ʈ": "t", "ŧ": "t", "ᵺ": "th", "ɐ": "a", "ᴂ": "ae", "ǝ": "e", "ᵷ": "g", "ɥ": "h", "ʮ": "h", "ʯ": "h", "ᴉ": "i", "ʞ": "k", "ꞁ": "l", "ɯ": "m", "ɰ": "m", "ᴔ": "oe", "ɹ": "r", "ɻ": "r", "ɺ": "r", "ⱹ": "r", "ʇ": "t", "ʌ": "v", "ʍ": "w", "ʎ": "y", "ꜩ": "tz", "ú": "u", "ŭ": "u", "ǔ": "u", "û": "u", "ṷ": "u", "ü": "u", "ǘ": "u", "ǚ": "u", "ǜ": "u", "ǖ": "u", "ṳ": "u", "ụ": "u", "ű": "u", "ȕ": "u", "ù": "u", "ủ": "u", "ư": "u", "ứ": "u", "ự": "u", "ừ": "u", "ử": "u", "ữ": "u", "ȗ": "u", "ū": "u", "ṻ": "u", "ų": "u", "ᶙ": "u", "ů": "u", "ũ": "u", "ṹ": "u", "ṵ": "u", "ᵫ": "ue", "ꝸ": "um", "ⱴ": "v", "ꝟ": "v", "ṿ": "v", "ʋ": "v", "ᶌ": "v", "ⱱ": "v", "ṽ": "v", "ꝡ": "vy", "ẃ": "w", "ŵ": "w", "ẅ": "w", "ẇ": "w", "ẉ": "w", "ẁ": "w", "ⱳ": "w", "ẘ": "w", "ẍ": "x", "ẋ": "x", "ᶍ": "x", "ý": "y", "ŷ": "y", "ÿ": "y", "ẏ": "y", "ỵ": "y", "ỳ": "y", "ƴ": "y", "ỷ": "y", "ỿ": "y", "ȳ": "y", "ẙ": "y", "ɏ": "y", "ỹ": "y", "ź": "z", "ž": "z", "ẑ": "z", "ʑ": "z", "ⱬ": "z", "ż": "z", "ẓ": "z", "ȥ": "z", "ẕ": "z", "ᵶ": "z", "ᶎ": "z", "ʐ": "z", "ƶ": "z", "ɀ": "z", "ﬀ": "ff", "ﬃ": "ffi", "ﬄ": "ffl", "ﬁ": "fi", "ﬂ": "fl", "ĳ": "ij", "œ": "oe", "ﬆ": "st", "ₐ": "a", "ₑ": "e", "ᵢ": "i", "ⱼ": "j", "ₒ": "o", "ᵣ": "r", "ᵤ": "u", "ᵥ": "v", "ₓ": "x" };
var latinise = function (str) { return str.replace(/[^A-Za-z0-9\[\] ]/g, function (a) { return latin_map[a] || a; }); };
var Helper = (function () {
    function Helper() {
    }
    Helper.prototype.toName = function (name) {
        if (names.hasOwnProperty(name)) {
            return names[name];
        }
        var BEGINING = /^[\-\s\.\?\!\/:+]+/; // any \- or \s at the beginning
        var ENDING = /[\-\s\?\!\.)+]+$/; // any \- or \s at the ending
        var REMOVE = /["!\(#&,%~\?]/g;
        var REPLACE = /[\s\-$;\)\'\.\/:°+Ê@*_]+/g;
        var n = latinise(name).replace(REMOVE, "").replace(BEGINING, "").replace(ENDING, "").replace(REPLACE, "-");
        return n;
        // return noCase(name, null, "-");
    };
    Helper.prototype.resolveUrl = function (name) {
        return config_1.config.site + "Manga/" + this.toName(name);
        // return resolve(config.site + "Manga/", this.toName(name));
    };
    return Helper;
}());
exports.Helper = Helper;
exports.helper = new Helper();
exports.default = exports.helper;
//# sourceMappingURL=names.js.map