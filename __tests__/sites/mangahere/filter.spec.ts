import {MangaHereFilter} from "../../../src/manga/mangahere/filter";
import {MangaHereGenre} from "../../../src/manga/mangahere/genre";
import {filter} from "../../../src/filter";
import FilterSupport = filter.FilterSupport;
import {FilterCondition, FilterStatus, Genre, Type} from "../../../src/enum";


describe("mangahere filter", () => {
    const filter = new MangaHereFilter(new MangaHereGenre());


    describe("should get the correct result", () => {

        describe("Series type", () => {
            it("by Japanese Manga", () => {
                const requestedFilter: FilterSupport = {
                    search: {
                        type: Type.Manga
                    }
                };

                const expected = {
                    src: "/search.php?direction=rl&name_method=cw&name=&author_method=cw&author=&artist_method=cw&artist=&genres%5BAction%5D=0&genres%5BAdventure%5D=0&genres%5BComedy%5D=0&genres%5BDoujinshi%5D=0&genres%5BDrama%5D=0&genres%5BEcchi%5D=0&genres%5BFantasy%5D=0&genres%5BGender+Bender%5D=0&genres%5BHarem%5D=0&genres%5BHistorical%5D=0&genres%5BHorror%5D=0&genres%5BJosei%5D=0&genres%5BMartial+Arts%5D=0&genres%5BMature%5D=0&genres%5BMecha%5D=0&genres%5BMystery%5D=0&genres%5BOne+Shot%5D=0&genres%5BPsychological%5D=0&genres%5BRomance%5D=0&genres%5BSchool+Life%5D=0&genres%5BSci-fi%5D=0&genres%5BSeinen%5D=0&genres%5BShoujo%5D=0&genres%5BShoujo+Ai%5D=0&genres%5BShounen%5D=0&genres%5BShounen+Ai%5D=0&genres%5BSlice+of+Life%5D=0&genres%5BSports%5D=0&genres%5BSupernatural%5D=0&genres%5BTragedy%5D=0&genres%5BYaoi%5D=0&genres%5BYuri%5D=0&released_method=eq&released=&is_completed=&advopts=1",
                };

                const result = filter.process(requestedFilter);

                expect(result).toEqual(expected);
            });


            it("by Korean Manhwa", () => {
                const requestedFilter: FilterSupport = {
                    search: {
                        type: Type.Manhwa
                    }
                };

                const expected = {
                    src: "/search.php?direction=lr&name_method=cw&name=&author_method=cw&author=&artist_method=cw&artist=&genres%5BAction%5D=0&genres%5BAdventure%5D=0&genres%5BComedy%5D=0&genres%5BDoujinshi%5D=0&genres%5BDrama%5D=0&genres%5BEcchi%5D=0&genres%5BFantasy%5D=0&genres%5BGender+Bender%5D=0&genres%5BHarem%5D=0&genres%5BHistorical%5D=0&genres%5BHorror%5D=0&genres%5BJosei%5D=0&genres%5BMartial+Arts%5D=0&genres%5BMature%5D=0&genres%5BMecha%5D=0&genres%5BMystery%5D=0&genres%5BOne+Shot%5D=0&genres%5BPsychological%5D=0&genres%5BRomance%5D=0&genres%5BSchool+Life%5D=0&genres%5BSci-fi%5D=0&genres%5BSeinen%5D=0&genres%5BShoujo%5D=0&genres%5BShoujo+Ai%5D=0&genres%5BShounen%5D=0&genres%5BShounen+Ai%5D=0&genres%5BSlice+of+Life%5D=0&genres%5BSports%5D=0&genres%5BSupernatural%5D=0&genres%5BTragedy%5D=0&genres%5BYaoi%5D=0&genres%5BYuri%5D=0&released_method=eq&released=&is_completed=&advopts=1",
                };

                const result = filter.process(requestedFilter);

                expect(result).toEqual(expected);
            });

            it("by Either", () => {
                const requestedFilter: FilterSupport = {
                    search: {}
                };

                const expected = {
                    src: "/search.php?direction=&name_method=cw&name=&author_method=cw&author=&artist_method=cw&artist=&genres%5BAction%5D=0&genres%5BAdventure%5D=0&genres%5BComedy%5D=0&genres%5BDoujinshi%5D=0&genres%5BDrama%5D=0&genres%5BEcchi%5D=0&genres%5BFantasy%5D=0&genres%5BGender+Bender%5D=0&genres%5BHarem%5D=0&genres%5BHistorical%5D=0&genres%5BHorror%5D=0&genres%5BJosei%5D=0&genres%5BMartial+Arts%5D=0&genres%5BMature%5D=0&genres%5BMecha%5D=0&genres%5BMystery%5D=0&genres%5BOne+Shot%5D=0&genres%5BPsychological%5D=0&genres%5BRomance%5D=0&genres%5BSchool+Life%5D=0&genres%5BSci-fi%5D=0&genres%5BSeinen%5D=0&genres%5BShoujo%5D=0&genres%5BShoujo+Ai%5D=0&genres%5BShounen%5D=0&genres%5BShounen+Ai%5D=0&genres%5BSlice+of+Life%5D=0&genres%5BSports%5D=0&genres%5BSupernatural%5D=0&genres%5BTragedy%5D=0&genres%5BYaoi%5D=0&genres%5BYuri%5D=0&released_method=eq&released=&is_completed=&advopts=1",
                };

                const result = filter.process(requestedFilter);

                expect(result).toEqual(expected);
            });


            it("by invalid (comics)", () => {
                const requestedFilter: FilterSupport = {
                    search: {
                        type: Type.Comic
                    }
                };

                const expected = {
                    src: "/search.php?direction=&name_method=cw&name=&author_method=cw&author=&artist_method=cw&artist=&genres%5BAction%5D=0&genres%5BAdventure%5D=0&genres%5BComedy%5D=0&genres%5BDoujinshi%5D=0&genres%5BDrama%5D=0&genres%5BEcchi%5D=0&genres%5BFantasy%5D=0&genres%5BGender+Bender%5D=0&genres%5BHarem%5D=0&genres%5BHistorical%5D=0&genres%5BHorror%5D=0&genres%5BJosei%5D=0&genres%5BMartial+Arts%5D=0&genres%5BMature%5D=0&genres%5BMecha%5D=0&genres%5BMystery%5D=0&genres%5BOne+Shot%5D=0&genres%5BPsychological%5D=0&genres%5BRomance%5D=0&genres%5BSchool+Life%5D=0&genres%5BSci-fi%5D=0&genres%5BSeinen%5D=0&genres%5BShoujo%5D=0&genres%5BShoujo+Ai%5D=0&genres%5BShounen%5D=0&genres%5BShounen+Ai%5D=0&genres%5BSlice+of+Life%5D=0&genres%5BSports%5D=0&genres%5BSupernatural%5D=0&genres%5BTragedy%5D=0&genres%5BYaoi%5D=0&genres%5BYuri%5D=0&released_method=eq&released=&is_completed=&advopts=1",
                };

                const result = filter.process(requestedFilter);

                expect(result).toEqual(expected);
            });

        });


        describe("Series name", () => {
            it("by contain", () => {
                const requestedFilter: FilterSupport = {
                    search: {
                        name: {
                            condition: FilterCondition.Contains,
                            name: "gintama"
                        }
                    }
                };

                const expected = {
                    src: "/search.php?direction=&name_method=cw&name=gintama&author_method=cw&author=&artist_method=cw&artist=&genres%5BAction%5D=0&genres%5BAdventure%5D=0&genres%5BComedy%5D=0&genres%5BDoujinshi%5D=0&genres%5BDrama%5D=0&genres%5BEcchi%5D=0&genres%5BFantasy%5D=0&genres%5BGender+Bender%5D=0&genres%5BHarem%5D=0&genres%5BHistorical%5D=0&genres%5BHorror%5D=0&genres%5BJosei%5D=0&genres%5BMartial+Arts%5D=0&genres%5BMature%5D=0&genres%5BMecha%5D=0&genres%5BMystery%5D=0&genres%5BOne+Shot%5D=0&genres%5BPsychological%5D=0&genres%5BRomance%5D=0&genres%5BSchool+Life%5D=0&genres%5BSci-fi%5D=0&genres%5BSeinen%5D=0&genres%5BShoujo%5D=0&genres%5BShoujo+Ai%5D=0&genres%5BShounen%5D=0&genres%5BShounen+Ai%5D=0&genres%5BSlice+of+Life%5D=0&genres%5BSports%5D=0&genres%5BSupernatural%5D=0&genres%5BTragedy%5D=0&genres%5BYaoi%5D=0&genres%5BYuri%5D=0&released_method=eq&released=&is_completed=&advopts=1",
                };

                const result = filter.process(requestedFilter);

                expect(result).toEqual(expected);
            });

            it("by begin", () => {
                const requestedFilter: FilterSupport = {
                    search: {
                        name: {
                            condition: FilterCondition.StartsWith,
                            name: "gintama"
                        }
                    }
                };

                const expected = {
                    src: "/search.php?direction=&name_method=bw&name=gintama&author_method=cw&author=&artist_method=cw&artist=&genres%5BAction%5D=0&genres%5BAdventure%5D=0&genres%5BComedy%5D=0&genres%5BDoujinshi%5D=0&genres%5BDrama%5D=0&genres%5BEcchi%5D=0&genres%5BFantasy%5D=0&genres%5BGender+Bender%5D=0&genres%5BHarem%5D=0&genres%5BHistorical%5D=0&genres%5BHorror%5D=0&genres%5BJosei%5D=0&genres%5BMartial+Arts%5D=0&genres%5BMature%5D=0&genres%5BMecha%5D=0&genres%5BMystery%5D=0&genres%5BOne+Shot%5D=0&genres%5BPsychological%5D=0&genres%5BRomance%5D=0&genres%5BSchool+Life%5D=0&genres%5BSci-fi%5D=0&genres%5BSeinen%5D=0&genres%5BShoujo%5D=0&genres%5BShoujo+Ai%5D=0&genres%5BShounen%5D=0&genres%5BShounen+Ai%5D=0&genres%5BSlice+of+Life%5D=0&genres%5BSports%5D=0&genres%5BSupernatural%5D=0&genres%5BTragedy%5D=0&genres%5BYaoi%5D=0&genres%5BYuri%5D=0&released_method=eq&released=&is_completed=&advopts=1",
                };

                const result = filter.process(requestedFilter);

                expect(result).toEqual(expected);
            });

            it("by end", () => {
                const requestedFilter: FilterSupport = {
                    search: {
                        name: {
                            condition: FilterCondition.EndsWith,
                            name: "gintama"
                        }
                    }
                };

                const expected = {
                    src: "/search.php?direction=&name_method=ew&name=gintama&author_method=cw&author=&artist_method=cw&artist=&genres%5BAction%5D=0&genres%5BAdventure%5D=0&genres%5BComedy%5D=0&genres%5BDoujinshi%5D=0&genres%5BDrama%5D=0&genres%5BEcchi%5D=0&genres%5BFantasy%5D=0&genres%5BGender+Bender%5D=0&genres%5BHarem%5D=0&genres%5BHistorical%5D=0&genres%5BHorror%5D=0&genres%5BJosei%5D=0&genres%5BMartial+Arts%5D=0&genres%5BMature%5D=0&genres%5BMecha%5D=0&genres%5BMystery%5D=0&genres%5BOne+Shot%5D=0&genres%5BPsychological%5D=0&genres%5BRomance%5D=0&genres%5BSchool+Life%5D=0&genres%5BSci-fi%5D=0&genres%5BSeinen%5D=0&genres%5BShoujo%5D=0&genres%5BShoujo+Ai%5D=0&genres%5BShounen%5D=0&genres%5BShounen+Ai%5D=0&genres%5BSlice+of+Life%5D=0&genres%5BSports%5D=0&genres%5BSupernatural%5D=0&genres%5BTragedy%5D=0&genres%5BYaoi%5D=0&genres%5BYuri%5D=0&released_method=eq&released=&is_completed=&advopts=1",
                };

                const result = filter.process(requestedFilter);

                expect(result).toEqual(expected);
            });

            it("by unsupported", () => {
                const requestedFilter: FilterSupport = {
                    search: {
                        name: {
                            condition: FilterCondition.GreaterThan,
                            name: "gintama"
                        }
                    }
                };

                const expected = {
                    src: "/search.php?direction=&name_method=cw&name=gintama&author_method=cw&author=&artist_method=cw&artist=&genres%5BAction%5D=0&genres%5BAdventure%5D=0&genres%5BComedy%5D=0&genres%5BDoujinshi%5D=0&genres%5BDrama%5D=0&genres%5BEcchi%5D=0&genres%5BFantasy%5D=0&genres%5BGender+Bender%5D=0&genres%5BHarem%5D=0&genres%5BHistorical%5D=0&genres%5BHorror%5D=0&genres%5BJosei%5D=0&genres%5BMartial+Arts%5D=0&genres%5BMature%5D=0&genres%5BMecha%5D=0&genres%5BMystery%5D=0&genres%5BOne+Shot%5D=0&genres%5BPsychological%5D=0&genres%5BRomance%5D=0&genres%5BSchool+Life%5D=0&genres%5BSci-fi%5D=0&genres%5BSeinen%5D=0&genres%5BShoujo%5D=0&genres%5BShoujo+Ai%5D=0&genres%5BShounen%5D=0&genres%5BShounen+Ai%5D=0&genres%5BSlice+of+Life%5D=0&genres%5BSports%5D=0&genres%5BSupernatural%5D=0&genres%5BTragedy%5D=0&genres%5BYaoi%5D=0&genres%5BYuri%5D=0&released_method=eq&released=&is_completed=&advopts=1",
                };

                const result = filter.process(requestedFilter);

                expect(result).toEqual(expected);
            });

        });


        describe("Author name", () => {
            it("by contain", () => {
                const requestedFilter: FilterSupport = {
                    search: {
                        author: {
                            condition: FilterCondition.Contains,
                            name: "sorachi"
                        }
                    }
                };

                const expected = {
                    src: "/search.php?direction=&name_method=cw&name=&author_method=cw&author=sorachi&artist_method=cw&artist=&genres%5BAction%5D=0&genres%5BAdventure%5D=0&genres%5BComedy%5D=0&genres%5BDoujinshi%5D=0&genres%5BDrama%5D=0&genres%5BEcchi%5D=0&genres%5BFantasy%5D=0&genres%5BGender+Bender%5D=0&genres%5BHarem%5D=0&genres%5BHistorical%5D=0&genres%5BHorror%5D=0&genres%5BJosei%5D=0&genres%5BMartial+Arts%5D=0&genres%5BMature%5D=0&genres%5BMecha%5D=0&genres%5BMystery%5D=0&genres%5BOne+Shot%5D=0&genres%5BPsychological%5D=0&genres%5BRomance%5D=0&genres%5BSchool+Life%5D=0&genres%5BSci-fi%5D=0&genres%5BSeinen%5D=0&genres%5BShoujo%5D=0&genres%5BShoujo+Ai%5D=0&genres%5BShounen%5D=0&genres%5BShounen+Ai%5D=0&genres%5BSlice+of+Life%5D=0&genres%5BSports%5D=0&genres%5BSupernatural%5D=0&genres%5BTragedy%5D=0&genres%5BYaoi%5D=0&genres%5BYuri%5D=0&released_method=eq&released=&is_completed=&advopts=1",
                };

                const result = filter.process(requestedFilter);

                expect(result).toEqual(expected);
            });

            it("by begin", () => {
                const requestedFilter: FilterSupport = {
                    search: {
                        author: {
                            condition: FilterCondition.StartsWith,
                            name: "sorachi"
                        }
                    }
                };

                const expected = {
                    src: "/search.php?direction=&name_method=cw&name=&author_method=bw&author=sorachi&artist_method=cw&artist=&genres%5BAction%5D=0&genres%5BAdventure%5D=0&genres%5BComedy%5D=0&genres%5BDoujinshi%5D=0&genres%5BDrama%5D=0&genres%5BEcchi%5D=0&genres%5BFantasy%5D=0&genres%5BGender+Bender%5D=0&genres%5BHarem%5D=0&genres%5BHistorical%5D=0&genres%5BHorror%5D=0&genres%5BJosei%5D=0&genres%5BMartial+Arts%5D=0&genres%5BMature%5D=0&genres%5BMecha%5D=0&genres%5BMystery%5D=0&genres%5BOne+Shot%5D=0&genres%5BPsychological%5D=0&genres%5BRomance%5D=0&genres%5BSchool+Life%5D=0&genres%5BSci-fi%5D=0&genres%5BSeinen%5D=0&genres%5BShoujo%5D=0&genres%5BShoujo+Ai%5D=0&genres%5BShounen%5D=0&genres%5BShounen+Ai%5D=0&genres%5BSlice+of+Life%5D=0&genres%5BSports%5D=0&genres%5BSupernatural%5D=0&genres%5BTragedy%5D=0&genres%5BYaoi%5D=0&genres%5BYuri%5D=0&released_method=eq&released=&is_completed=&advopts=1",
                };

                const result = filter.process(requestedFilter);

                expect(result).toEqual(expected);
            });

            it("by end", () => {
                const requestedFilter: FilterSupport = {
                    search: {
                        author: {
                            condition: FilterCondition.EndsWith,
                            name: "sorachi"
                        }
                    }
                };

                const expected = {
                    src: "/search.php?direction=&name_method=cw&name=&author_method=ew&author=sorachi&artist_method=cw&artist=&genres%5BAction%5D=0&genres%5BAdventure%5D=0&genres%5BComedy%5D=0&genres%5BDoujinshi%5D=0&genres%5BDrama%5D=0&genres%5BEcchi%5D=0&genres%5BFantasy%5D=0&genres%5BGender+Bender%5D=0&genres%5BHarem%5D=0&genres%5BHistorical%5D=0&genres%5BHorror%5D=0&genres%5BJosei%5D=0&genres%5BMartial+Arts%5D=0&genres%5BMature%5D=0&genres%5BMecha%5D=0&genres%5BMystery%5D=0&genres%5BOne+Shot%5D=0&genres%5BPsychological%5D=0&genres%5BRomance%5D=0&genres%5BSchool+Life%5D=0&genres%5BSci-fi%5D=0&genres%5BSeinen%5D=0&genres%5BShoujo%5D=0&genres%5BShoujo+Ai%5D=0&genres%5BShounen%5D=0&genres%5BShounen+Ai%5D=0&genres%5BSlice+of+Life%5D=0&genres%5BSports%5D=0&genres%5BSupernatural%5D=0&genres%5BTragedy%5D=0&genres%5BYaoi%5D=0&genres%5BYuri%5D=0&released_method=eq&released=&is_completed=&advopts=1",
                };

                const result = filter.process(requestedFilter);

                expect(result).toEqual(expected);
            });

            it("by unsupported", () => {
                const requestedFilter: FilterSupport = {
                    search: {
                        author: {
                            condition: FilterCondition.GreaterThan,
                            name: "sorachi"
                        }
                    }
                };

                const expected = {
                    src: "/search.php?direction=&name_method=cw&name=&author_method=cw&author=sorachi&artist_method=cw&artist=&genres%5BAction%5D=0&genres%5BAdventure%5D=0&genres%5BComedy%5D=0&genres%5BDoujinshi%5D=0&genres%5BDrama%5D=0&genres%5BEcchi%5D=0&genres%5BFantasy%5D=0&genres%5BGender+Bender%5D=0&genres%5BHarem%5D=0&genres%5BHistorical%5D=0&genres%5BHorror%5D=0&genres%5BJosei%5D=0&genres%5BMartial+Arts%5D=0&genres%5BMature%5D=0&genres%5BMecha%5D=0&genres%5BMystery%5D=0&genres%5BOne+Shot%5D=0&genres%5BPsychological%5D=0&genres%5BRomance%5D=0&genres%5BSchool+Life%5D=0&genres%5BSci-fi%5D=0&genres%5BSeinen%5D=0&genres%5BShoujo%5D=0&genres%5BShoujo+Ai%5D=0&genres%5BShounen%5D=0&genres%5BShounen+Ai%5D=0&genres%5BSlice+of+Life%5D=0&genres%5BSports%5D=0&genres%5BSupernatural%5D=0&genres%5BTragedy%5D=0&genres%5BYaoi%5D=0&genres%5BYuri%5D=0&released_method=eq&released=&is_completed=&advopts=1",
                };

                const result = filter.process(requestedFilter);

                expect(result).toEqual(expected);
            });

        });


        describe("Artist name", () => {
            it("by contain", () => {
                const requestedFilter: FilterSupport = {
                    search: {
                        artist: {
                            condition: FilterCondition.Contains,
                            name: "sorachi"
                        }
                    }
                };

                const expected = {
                    src: "/search.php?direction=&name_method=cw&name=&author_method=cw&author=&artist_method=cw&artist=sorachi&genres%5BAction%5D=0&genres%5BAdventure%5D=0&genres%5BComedy%5D=0&genres%5BDoujinshi%5D=0&genres%5BDrama%5D=0&genres%5BEcchi%5D=0&genres%5BFantasy%5D=0&genres%5BGender+Bender%5D=0&genres%5BHarem%5D=0&genres%5BHistorical%5D=0&genres%5BHorror%5D=0&genres%5BJosei%5D=0&genres%5BMartial+Arts%5D=0&genres%5BMature%5D=0&genres%5BMecha%5D=0&genres%5BMystery%5D=0&genres%5BOne+Shot%5D=0&genres%5BPsychological%5D=0&genres%5BRomance%5D=0&genres%5BSchool+Life%5D=0&genres%5BSci-fi%5D=0&genres%5BSeinen%5D=0&genres%5BShoujo%5D=0&genres%5BShoujo+Ai%5D=0&genres%5BShounen%5D=0&genres%5BShounen+Ai%5D=0&genres%5BSlice+of+Life%5D=0&genres%5BSports%5D=0&genres%5BSupernatural%5D=0&genres%5BTragedy%5D=0&genres%5BYaoi%5D=0&genres%5BYuri%5D=0&released_method=eq&released=&is_completed=&advopts=1",
                };

                const result = filter.process(requestedFilter);

                expect(result).toEqual(expected);
            });

            it("by begin", () => {
                const requestedFilter: FilterSupport = {
                    search: {
                        artist: {
                            condition: FilterCondition.StartsWith,
                            name: "sorachi"
                        }
                    }
                };

                const expected = {
                    src: "/search.php?direction=&name_method=cw&name=&author_method=cw&author=&artist_method=bw&artist=sorachi&genres%5BAction%5D=0&genres%5BAdventure%5D=0&genres%5BComedy%5D=0&genres%5BDoujinshi%5D=0&genres%5BDrama%5D=0&genres%5BEcchi%5D=0&genres%5BFantasy%5D=0&genres%5BGender+Bender%5D=0&genres%5BHarem%5D=0&genres%5BHistorical%5D=0&genres%5BHorror%5D=0&genres%5BJosei%5D=0&genres%5BMartial+Arts%5D=0&genres%5BMature%5D=0&genres%5BMecha%5D=0&genres%5BMystery%5D=0&genres%5BOne+Shot%5D=0&genres%5BPsychological%5D=0&genres%5BRomance%5D=0&genres%5BSchool+Life%5D=0&genres%5BSci-fi%5D=0&genres%5BSeinen%5D=0&genres%5BShoujo%5D=0&genres%5BShoujo+Ai%5D=0&genres%5BShounen%5D=0&genres%5BShounen+Ai%5D=0&genres%5BSlice+of+Life%5D=0&genres%5BSports%5D=0&genres%5BSupernatural%5D=0&genres%5BTragedy%5D=0&genres%5BYaoi%5D=0&genres%5BYuri%5D=0&released_method=eq&released=&is_completed=&advopts=1",
                };

                const result = filter.process(requestedFilter);

                expect(result).toEqual(expected);
            });

            it("by end", () => {
                const requestedFilter: FilterSupport = {
                    search: {
                        artist: {
                            condition: FilterCondition.EndsWith,
                            name: "sorachi"
                        }
                    }
                };

                const expected = {
                    src: "/search.php?direction=&name_method=cw&name=&author_method=cw&author=&artist_method=ew&artist=sorachi&genres%5BAction%5D=0&genres%5BAdventure%5D=0&genres%5BComedy%5D=0&genres%5BDoujinshi%5D=0&genres%5BDrama%5D=0&genres%5BEcchi%5D=0&genres%5BFantasy%5D=0&genres%5BGender+Bender%5D=0&genres%5BHarem%5D=0&genres%5BHistorical%5D=0&genres%5BHorror%5D=0&genres%5BJosei%5D=0&genres%5BMartial+Arts%5D=0&genres%5BMature%5D=0&genres%5BMecha%5D=0&genres%5BMystery%5D=0&genres%5BOne+Shot%5D=0&genres%5BPsychological%5D=0&genres%5BRomance%5D=0&genres%5BSchool+Life%5D=0&genres%5BSci-fi%5D=0&genres%5BSeinen%5D=0&genres%5BShoujo%5D=0&genres%5BShoujo+Ai%5D=0&genres%5BShounen%5D=0&genres%5BShounen+Ai%5D=0&genres%5BSlice+of+Life%5D=0&genres%5BSports%5D=0&genres%5BSupernatural%5D=0&genres%5BTragedy%5D=0&genres%5BYaoi%5D=0&genres%5BYuri%5D=0&released_method=eq&released=&is_completed=&advopts=1",
                };

                const result = filter.process(requestedFilter);

                expect(result).toEqual(expected);
            });

            it("by unsupported", () => {
                const requestedFilter: FilterSupport = {
                    search: {
                        artist: {
                            condition: FilterCondition.GreaterThan,
                            name: "sorachi"
                        }
                    }
                };

                const expected = {
                    src: "/search.php?direction=&name_method=cw&name=&author_method=cw&author=&artist_method=cw&artist=sorachi&genres%5BAction%5D=0&genres%5BAdventure%5D=0&genres%5BComedy%5D=0&genres%5BDoujinshi%5D=0&genres%5BDrama%5D=0&genres%5BEcchi%5D=0&genres%5BFantasy%5D=0&genres%5BGender+Bender%5D=0&genres%5BHarem%5D=0&genres%5BHistorical%5D=0&genres%5BHorror%5D=0&genres%5BJosei%5D=0&genres%5BMartial+Arts%5D=0&genres%5BMature%5D=0&genres%5BMecha%5D=0&genres%5BMystery%5D=0&genres%5BOne+Shot%5D=0&genres%5BPsychological%5D=0&genres%5BRomance%5D=0&genres%5BSchool+Life%5D=0&genres%5BSci-fi%5D=0&genres%5BSeinen%5D=0&genres%5BShoujo%5D=0&genres%5BShoujo+Ai%5D=0&genres%5BShounen%5D=0&genres%5BShounen+Ai%5D=0&genres%5BSlice+of+Life%5D=0&genres%5BSports%5D=0&genres%5BSupernatural%5D=0&genres%5BTragedy%5D=0&genres%5BYaoi%5D=0&genres%5BYuri%5D=0&released_method=eq&released=&is_completed=&advopts=1",
                };

                const result = filter.process(requestedFilter);

                expect(result).toEqual(expected);
            });

        });


        describe("Genres", () => {
            it("by Action", () => {
                const requestedFilter: FilterSupport = {
                    search: {
                        genre: {
                            inGenres: [Genre.Action]
                        }
                    }
                };

                const expected = {
                    src: "/search.php?direction=&name_method=cw&name=&author_method=cw&author=&artist_method=cw&artist=&genres%5BAction%5D=1&genres%5BAdventure%5D=0&genres%5BComedy%5D=0&genres%5BDoujinshi%5D=0&genres%5BDrama%5D=0&genres%5BEcchi%5D=0&genres%5BFantasy%5D=0&genres%5BGender+Bender%5D=0&genres%5BHarem%5D=0&genres%5BHistorical%5D=0&genres%5BHorror%5D=0&genres%5BJosei%5D=0&genres%5BMartial+Arts%5D=0&genres%5BMature%5D=0&genres%5BMecha%5D=0&genres%5BMystery%5D=0&genres%5BOne+Shot%5D=0&genres%5BPsychological%5D=0&genres%5BRomance%5D=0&genres%5BSchool+Life%5D=0&genres%5BSci-fi%5D=0&genres%5BSeinen%5D=0&genres%5BShoujo%5D=0&genres%5BShoujo+Ai%5D=0&genres%5BShounen%5D=0&genres%5BShounen+Ai%5D=0&genres%5BSlice+of+Life%5D=0&genres%5BSports%5D=0&genres%5BSupernatural%5D=0&genres%5BTragedy%5D=0&genres%5BYaoi%5D=0&genres%5BYuri%5D=0&released_method=eq&released=&is_completed=&advopts=1",
                };

                const result = filter.process(requestedFilter);

                expect(result).toEqual(expected);
            });

            it("by Mature, One-shot", () => {
                const requestedFilter: FilterSupport = {
                    search: {
                        genre: {
                            inGenres: [Genre.Mature, Genre.Oneshot]
                        }
                    }
                };

                const expected = {
                    src: "/search.php?direction=&name_method=cw&name=&author_method=cw&author=&artist_method=cw&artist=&genres%5BAction%5D=0&genres%5BAdventure%5D=0&genres%5BComedy%5D=0&genres%5BDoujinshi%5D=0&genres%5BDrama%5D=0&genres%5BEcchi%5D=0&genres%5BFantasy%5D=0&genres%5BGender+Bender%5D=0&genres%5BHarem%5D=0&genres%5BHistorical%5D=0&genres%5BHorror%5D=0&genres%5BJosei%5D=0&genres%5BMartial+Arts%5D=0&genres%5BMature%5D=1&genres%5BMecha%5D=0&genres%5BMystery%5D=0&genres%5BOne+Shot%5D=1&genres%5BPsychological%5D=0&genres%5BRomance%5D=0&genres%5BSchool+Life%5D=0&genres%5BSci-fi%5D=0&genres%5BSeinen%5D=0&genres%5BShoujo%5D=0&genres%5BShoujo+Ai%5D=0&genres%5BShounen%5D=0&genres%5BShounen+Ai%5D=0&genres%5BSlice+of+Life%5D=0&genres%5BSports%5D=0&genres%5BSupernatural%5D=0&genres%5BTragedy%5D=0&genres%5BYaoi%5D=0&genres%5BYuri%5D=0&released_method=eq&released=&is_completed=&advopts=1",
                };

                const result = filter.process(requestedFilter);

                expect(result).toEqual(expected);
            });

            it("by not Yaoi", () => {
                const requestedFilter: FilterSupport = {
                    search: {
                        genre: {
                            outGenres: [Genre.Yaoi]
                        }
                    }
                };

                const expected = {
                    src: "/search.php?direction=&name_method=cw&name=&author_method=cw&author=&artist_method=cw&artist=&genres%5BAction%5D=0&genres%5BAdventure%5D=0&genres%5BComedy%5D=0&genres%5BDoujinshi%5D=0&genres%5BDrama%5D=0&genres%5BEcchi%5D=0&genres%5BFantasy%5D=0&genres%5BGender+Bender%5D=0&genres%5BHarem%5D=0&genres%5BHistorical%5D=0&genres%5BHorror%5D=0&genres%5BJosei%5D=0&genres%5BMartial+Arts%5D=0&genres%5BMature%5D=0&genres%5BMecha%5D=0&genres%5BMystery%5D=0&genres%5BOne+Shot%5D=0&genres%5BPsychological%5D=0&genres%5BRomance%5D=0&genres%5BSchool+Life%5D=0&genres%5BSci-fi%5D=0&genres%5BSeinen%5D=0&genres%5BShoujo%5D=0&genres%5BShoujo+Ai%5D=0&genres%5BShounen%5D=0&genres%5BShounen+Ai%5D=0&genres%5BSlice+of+Life%5D=0&genres%5BSports%5D=0&genres%5BSupernatural%5D=0&genres%5BTragedy%5D=0&genres%5BYaoi%5D=2&genres%5BYuri%5D=0&released_method=eq&released=&is_completed=&advopts=1",
                };

                const result = filter.process(requestedFilter);

                expect(result).toEqual(expected);
            });

            it("by Scifi, Mecha and Fantasy but not Harem, Ecchi, Comedy", () => {
                const requestedFilter: FilterSupport = {
                    search: {
                        genre: {
                            inGenres: [Genre.SciFi, Genre.Mecha, Genre.Fantasy],
                            outGenres: [Genre.Harem, Genre.Ecchi, Genre.Comedy]
                        }
                    }
                };

                const expected = {
                    src: "/search.php?direction=&name_method=cw&name=&author_method=cw&author=&artist_method=cw&artist=&genres%5BAction%5D=0&genres%5BAdventure%5D=0&genres%5BComedy%5D=2&genres%5BDoujinshi%5D=0&genres%5BDrama%5D=0&genres%5BEcchi%5D=2&genres%5BFantasy%5D=1&genres%5BGender+Bender%5D=0&genres%5BHarem%5D=2&genres%5BHistorical%5D=0&genres%5BHorror%5D=0&genres%5BJosei%5D=0&genres%5BMartial+Arts%5D=0&genres%5BMature%5D=0&genres%5BMecha%5D=1&genres%5BMystery%5D=0&genres%5BOne+Shot%5D=0&genres%5BPsychological%5D=0&genres%5BRomance%5D=0&genres%5BSchool+Life%5D=0&genres%5BSci-fi%5D=1&genres%5BSeinen%5D=0&genres%5BShoujo%5D=0&genres%5BShoujo+Ai%5D=0&genres%5BShounen%5D=0&genres%5BShounen+Ai%5D=0&genres%5BSlice+of+Life%5D=0&genres%5BSports%5D=0&genres%5BSupernatural%5D=0&genres%5BTragedy%5D=0&genres%5BYaoi%5D=0&genres%5BYuri%5D=0&released_method=eq&released=&is_completed=&advopts=1",
                };

                const result = filter.process(requestedFilter);

                expect(result).toEqual(expected);
            });

            it("by not supported", () => {
                const requestedFilter: FilterSupport = {
                    search: {
                        genre: {
                            inGenres: [Genre.Smut]
                        }
                    }
                };

                const expected = {
                    src: "/search.php?direction=&name_method=cw&name=&author_method=cw&author=&artist_method=cw&artist=&genres%5BAction%5D=0&genres%5BAdventure%5D=0&genres%5BComedy%5D=0&genres%5BDoujinshi%5D=0&genres%5BDrama%5D=0&genres%5BEcchi%5D=0&genres%5BFantasy%5D=0&genres%5BGender+Bender%5D=0&genres%5BHarem%5D=0&genres%5BHistorical%5D=0&genres%5BHorror%5D=0&genres%5BJosei%5D=0&genres%5BMartial+Arts%5D=0&genres%5BMature%5D=0&genres%5BMecha%5D=0&genres%5BMystery%5D=0&genres%5BOne+Shot%5D=0&genres%5BPsychological%5D=0&genres%5BRomance%5D=0&genres%5BSchool+Life%5D=0&genres%5BSci-fi%5D=0&genres%5BSeinen%5D=0&genres%5BShoujo%5D=0&genres%5BShoujo+Ai%5D=0&genres%5BShounen%5D=0&genres%5BShounen+Ai%5D=0&genres%5BSlice+of+Life%5D=0&genres%5BSports%5D=0&genres%5BSupernatural%5D=0&genres%5BTragedy%5D=0&genres%5BYaoi%5D=0&genres%5BYuri%5D=0&released_method=eq&released=&is_completed=&advopts=1",
                };

                const result = filter.process(requestedFilter);

                expect(result).toEqual(expected);
            });

        });


        describe("Year of release", () => {
            it("by on", () => {
                const requestedFilter: FilterSupport = {
                    search: {
                        released: {
                            condition: FilterCondition.Equal,
                            value: 2013
                        }
                    }
                };

                const expected = {
                    src: "/search.php?direction=&name_method=cw&name=&author_method=cw&author=&artist_method=cw&artist=&genres%5BAction%5D=0&genres%5BAdventure%5D=0&genres%5BComedy%5D=0&genres%5BDoujinshi%5D=0&genres%5BDrama%5D=0&genres%5BEcchi%5D=0&genres%5BFantasy%5D=0&genres%5BGender+Bender%5D=0&genres%5BHarem%5D=0&genres%5BHistorical%5D=0&genres%5BHorror%5D=0&genres%5BJosei%5D=0&genres%5BMartial+Arts%5D=0&genres%5BMature%5D=0&genres%5BMecha%5D=0&genres%5BMystery%5D=0&genres%5BOne+Shot%5D=0&genres%5BPsychological%5D=0&genres%5BRomance%5D=0&genres%5BSchool+Life%5D=0&genres%5BSci-fi%5D=0&genres%5BSeinen%5D=0&genres%5BShoujo%5D=0&genres%5BShoujo+Ai%5D=0&genres%5BShounen%5D=0&genres%5BShounen+Ai%5D=0&genres%5BSlice+of+Life%5D=0&genres%5BSports%5D=0&genres%5BSupernatural%5D=0&genres%5BTragedy%5D=0&genres%5BYaoi%5D=0&genres%5BYuri%5D=0&released_method=eq&released=2013&is_completed=&advopts=1",
                };

                const result = filter.process(requestedFilter);

                expect(result).toEqual(expected);
            });

            it("by before", () => {
                const requestedFilter: FilterSupport = {
                    search: {
                        released: {
                            condition: FilterCondition.LessThan,
                            value: 2013
                        }
                    }
                };

                const expected = {
                    src: "/search.php?direction=&name_method=cw&name=&author_method=cw&author=&artist_method=cw&artist=&genres%5BAction%5D=0&genres%5BAdventure%5D=0&genres%5BComedy%5D=0&genres%5BDoujinshi%5D=0&genres%5BDrama%5D=0&genres%5BEcchi%5D=0&genres%5BFantasy%5D=0&genres%5BGender+Bender%5D=0&genres%5BHarem%5D=0&genres%5BHistorical%5D=0&genres%5BHorror%5D=0&genres%5BJosei%5D=0&genres%5BMartial+Arts%5D=0&genres%5BMature%5D=0&genres%5BMecha%5D=0&genres%5BMystery%5D=0&genres%5BOne+Shot%5D=0&genres%5BPsychological%5D=0&genres%5BRomance%5D=0&genres%5BSchool+Life%5D=0&genres%5BSci-fi%5D=0&genres%5BSeinen%5D=0&genres%5BShoujo%5D=0&genres%5BShoujo+Ai%5D=0&genres%5BShounen%5D=0&genres%5BShounen+Ai%5D=0&genres%5BSlice+of+Life%5D=0&genres%5BSports%5D=0&genres%5BSupernatural%5D=0&genres%5BTragedy%5D=0&genres%5BYaoi%5D=0&genres%5BYuri%5D=0&released_method=lt&released=2013&is_completed=&advopts=1",
                };

                const result = filter.process(requestedFilter);

                expect(result).toEqual(expected);
            });

            it("by after", () => {
                const requestedFilter: FilterSupport = {
                    search: {
                        released: {
                            condition: FilterCondition.GreaterThan,
                            value: 2013
                        }
                    }
                };

                const expected = {
                    src: "/search.php?direction=&name_method=cw&name=&author_method=cw&author=&artist_method=cw&artist=&genres%5BAction%5D=0&genres%5BAdventure%5D=0&genres%5BComedy%5D=0&genres%5BDoujinshi%5D=0&genres%5BDrama%5D=0&genres%5BEcchi%5D=0&genres%5BFantasy%5D=0&genres%5BGender+Bender%5D=0&genres%5BHarem%5D=0&genres%5BHistorical%5D=0&genres%5BHorror%5D=0&genres%5BJosei%5D=0&genres%5BMartial+Arts%5D=0&genres%5BMature%5D=0&genres%5BMecha%5D=0&genres%5BMystery%5D=0&genres%5BOne+Shot%5D=0&genres%5BPsychological%5D=0&genres%5BRomance%5D=0&genres%5BSchool+Life%5D=0&genres%5BSci-fi%5D=0&genres%5BSeinen%5D=0&genres%5BShoujo%5D=0&genres%5BShoujo+Ai%5D=0&genres%5BShounen%5D=0&genres%5BShounen+Ai%5D=0&genres%5BSlice+of+Life%5D=0&genres%5BSports%5D=0&genres%5BSupernatural%5D=0&genres%5BTragedy%5D=0&genres%5BYaoi%5D=0&genres%5BYuri%5D=0&released_method=gt&released=2013&is_completed=&advopts=1",
                };

                const result = filter.process(requestedFilter);

                expect(result).toEqual(expected);
            });


            it("by invalid condition", () => {
                const requestedFilter: any = {
                    search: {
                        released: {
                            condition: FilterCondition.NotContains,
                            value: "2013"
                        }
                    }
                };

                const expected = {
                    src: "/search.php?direction=&name_method=cw&name=&author_method=cw&author=&artist_method=cw&artist=&genres%5BAction%5D=0&genres%5BAdventure%5D=0&genres%5BComedy%5D=0&genres%5BDoujinshi%5D=0&genres%5BDrama%5D=0&genres%5BEcchi%5D=0&genres%5BFantasy%5D=0&genres%5BGender+Bender%5D=0&genres%5BHarem%5D=0&genres%5BHistorical%5D=0&genres%5BHorror%5D=0&genres%5BJosei%5D=0&genres%5BMartial+Arts%5D=0&genres%5BMature%5D=0&genres%5BMecha%5D=0&genres%5BMystery%5D=0&genres%5BOne+Shot%5D=0&genres%5BPsychological%5D=0&genres%5BRomance%5D=0&genres%5BSchool+Life%5D=0&genres%5BSci-fi%5D=0&genres%5BSeinen%5D=0&genres%5BShoujo%5D=0&genres%5BShoujo+Ai%5D=0&genres%5BShounen%5D=0&genres%5BShounen+Ai%5D=0&genres%5BSlice+of+Life%5D=0&genres%5BSports%5D=0&genres%5BSupernatural%5D=0&genres%5BTragedy%5D=0&genres%5BYaoi%5D=0&genres%5BYuri%5D=0&released_method=eq&released=2013&is_completed=&advopts=1",
                };

                const result = filter.process(requestedFilter);

                expect(result).toEqual(expected);
            });
        });


        describe("by completed(status)", () => {
            it("Completed: Yes", () => {
                const requestedFilter: FilterSupport = {
                    search: {
                        status: FilterStatus.Complete,
                    }
                };

                const expected = {
                    src: "/search.php?direction=&name_method=cw&name=&author_method=cw&author=&artist_method=cw&artist=&genres%5BAction%5D=0&genres%5BAdventure%5D=0&genres%5BComedy%5D=0&genres%5BDoujinshi%5D=0&genres%5BDrama%5D=0&genres%5BEcchi%5D=0&genres%5BFantasy%5D=0&genres%5BGender+Bender%5D=0&genres%5BHarem%5D=0&genres%5BHistorical%5D=0&genres%5BHorror%5D=0&genres%5BJosei%5D=0&genres%5BMartial+Arts%5D=0&genres%5BMature%5D=0&genres%5BMecha%5D=0&genres%5BMystery%5D=0&genres%5BOne+Shot%5D=0&genres%5BPsychological%5D=0&genres%5BRomance%5D=0&genres%5BSchool+Life%5D=0&genres%5BSci-fi%5D=0&genres%5BSeinen%5D=0&genres%5BShoujo%5D=0&genres%5BShoujo+Ai%5D=0&genres%5BShounen%5D=0&genres%5BShounen+Ai%5D=0&genres%5BSlice+of+Life%5D=0&genres%5BSports%5D=0&genres%5BSupernatural%5D=0&genres%5BTragedy%5D=0&genres%5BYaoi%5D=0&genres%5BYuri%5D=0&released_method=eq&released=&is_completed=1&advopts=1",
                };

                const result = filter.process(requestedFilter);

                expect(result).toEqual(expected);
            });


            it("Completed: No", () => {
                const requestedFilter: FilterSupport = {
                    search: {
                        status: FilterStatus.Ongoing,
                    }
                };

                const expected = {
                    src: "/search.php?direction=&name_method=cw&name=&author_method=cw&author=&artist_method=cw&artist=&genres%5BAction%5D=0&genres%5BAdventure%5D=0&genres%5BComedy%5D=0&genres%5BDoujinshi%5D=0&genres%5BDrama%5D=0&genres%5BEcchi%5D=0&genres%5BFantasy%5D=0&genres%5BGender+Bender%5D=0&genres%5BHarem%5D=0&genres%5BHistorical%5D=0&genres%5BHorror%5D=0&genres%5BJosei%5D=0&genres%5BMartial+Arts%5D=0&genres%5BMature%5D=0&genres%5BMecha%5D=0&genres%5BMystery%5D=0&genres%5BOne+Shot%5D=0&genres%5BPsychological%5D=0&genres%5BRomance%5D=0&genres%5BSchool+Life%5D=0&genres%5BSci-fi%5D=0&genres%5BSeinen%5D=0&genres%5BShoujo%5D=0&genres%5BShoujo+Ai%5D=0&genres%5BShounen%5D=0&genres%5BShounen+Ai%5D=0&genres%5BSlice+of+Life%5D=0&genres%5BSports%5D=0&genres%5BSupernatural%5D=0&genres%5BTragedy%5D=0&genres%5BYaoi%5D=0&genres%5BYuri%5D=0&released_method=eq&released=&is_completed=0&advopts=1",
                };

                const result = filter.process(requestedFilter);

                expect(result).toEqual(expected);
            });

            it("Completed: Either", () => {
                const requestedFilter: FilterSupport = {
                    search: {}
                };

                const expected = {
                    src: "/search.php?direction=&name_method=cw&name=&author_method=cw&author=&artist_method=cw&artist=&genres%5BAction%5D=0&genres%5BAdventure%5D=0&genres%5BComedy%5D=0&genres%5BDoujinshi%5D=0&genres%5BDrama%5D=0&genres%5BEcchi%5D=0&genres%5BFantasy%5D=0&genres%5BGender+Bender%5D=0&genres%5BHarem%5D=0&genres%5BHistorical%5D=0&genres%5BHorror%5D=0&genres%5BJosei%5D=0&genres%5BMartial+Arts%5D=0&genres%5BMature%5D=0&genres%5BMecha%5D=0&genres%5BMystery%5D=0&genres%5BOne+Shot%5D=0&genres%5BPsychological%5D=0&genres%5BRomance%5D=0&genres%5BSchool+Life%5D=0&genres%5BSci-fi%5D=0&genres%5BSeinen%5D=0&genres%5BShoujo%5D=0&genres%5BShoujo+Ai%5D=0&genres%5BShounen%5D=0&genres%5BShounen+Ai%5D=0&genres%5BSlice+of+Life%5D=0&genres%5BSports%5D=0&genres%5BSupernatural%5D=0&genres%5BTragedy%5D=0&genres%5BYaoi%5D=0&genres%5BYuri%5D=0&released_method=eq&released=&is_completed=&advopts=1",
                };

                const result = filter.process(requestedFilter);

                expect(result).toEqual(expected);
            });

            it("Completed invalid: Cancelled", () => {
                const requestedFilter: FilterSupport = {
                    search: {status: FilterStatus.Cancelled}
                };

                const expected = {
                    src: "/search.php?direction=&name_method=cw&name=&author_method=cw&author=&artist_method=cw&artist=&genres%5BAction%5D=0&genres%5BAdventure%5D=0&genres%5BComedy%5D=0&genres%5BDoujinshi%5D=0&genres%5BDrama%5D=0&genres%5BEcchi%5D=0&genres%5BFantasy%5D=0&genres%5BGender+Bender%5D=0&genres%5BHarem%5D=0&genres%5BHistorical%5D=0&genres%5BHorror%5D=0&genres%5BJosei%5D=0&genres%5BMartial+Arts%5D=0&genres%5BMature%5D=0&genres%5BMecha%5D=0&genres%5BMystery%5D=0&genres%5BOne+Shot%5D=0&genres%5BPsychological%5D=0&genres%5BRomance%5D=0&genres%5BSchool+Life%5D=0&genres%5BSci-fi%5D=0&genres%5BSeinen%5D=0&genres%5BShoujo%5D=0&genres%5BShoujo+Ai%5D=0&genres%5BShounen%5D=0&genres%5BShounen+Ai%5D=0&genres%5BSlice+of+Life%5D=0&genres%5BSports%5D=0&genres%5BSupernatural%5D=0&genres%5BTragedy%5D=0&genres%5BYaoi%5D=0&genres%5BYuri%5D=0&released_method=eq&released=&is_completed=&advopts=1",
                };

                const result = filter.process(requestedFilter);

                expect(result).toEqual(expected);
            });
        });


    });

});
