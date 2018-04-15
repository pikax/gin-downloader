export enum Genre {
    Action = "Action",
    Adult = "Adult",
    Adventure = "Adventure",
    AwardWinning = "Award Winning",
    Comedy = "Comedy",
    Comic = "Comic",
    Cooking = "Cooking",
    Demons = "Demons",
    Doujinshi = "Doujinshi",
    Drama = "Drama",
    Ecchi = "Ecchi",
    Fantasy = "Fantasy",
    FourKoma = "4-Koma",
    GenderBender = "Gender Bender",
    Harem = "Harem",
    Historical = "Historical",
    Horror = "Horror",
    Josei = "Josei",
    Lolicon = "Lolicon",
    Magic = "Magic",
    Manga = "Manga",
    Manhua = "Manhua",
    Manhwa = "Manhwa",
    MartialArts = "Martial Arts",
    Mature = "Mature",
    Mecha = "Mecha",
    Medical = "Medical",
    Military = "Military",
    Music = "Music",
    Mystery = "Mystery",
    Oneshot = "Oneshot",
    Psychological = "Psychological",
    Romance = "Romance",
    SchoolLife = "School Life",
    SciFi = "Sci-fi",
    Seinen = "Seinen",
    Shotacon = "Shotacon",
    Shoujo = "Shoujo",
    ShoujoAi = "Shoujo Ai",
    Shounen = "Shounen",
    ShounenAi = "Shounen Ai",
    SliceOfLife = "Slice of Life",
    Smut = "Smut",
    Sports = "Sports",
    Supernatural = "Supernatural",
    SuperPower = "SuperPower",
    Tragedy = "Tragedy",
    Vampire = "Vampire",
    Webtoon = "Webtoon",
    Yaoi = "Yaoi",
    Yuri = "Yuri",

    NoChapters = "[no chapters]"
}

export enum Type {
    Manga = "Manga",
    Manhwa = "Manhwa",
    Manhua = "Manhua",
    Comic = "Comic",
    Artbook = "Artbook", // An artbook is a title that contains purely art and has no story
    Other = "Other", // bato.to
}


export enum GenreCondition {
    And = 0,
    Or = 1,
}

export enum FilterStatus {
    Ongoing = "Ongoing",
    Complete = "Complete",
    Cancelled = "Cancelled"
}


export enum FilterCondition {
    Equal,
    Contains,
    NotContains,
    StartsWith,
    EndsWith,
    Less,
    Greater,
    LessThan,
    GreaterThan,
}