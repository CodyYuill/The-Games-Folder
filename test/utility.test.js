//const util = require("../public/assets/js/logic.js");

function getSingleGameUrl(slug){
    return `www.url.com/api/games/${slug}`;
}
function getListGenre(slug){
    return `www.url.com/api/genres/${slug}`;
}

describe("Games Table", () => {
    describe("buildUrl single game", () => {
        it("should return a url with the proper api call to find a single game with passed in slug", () => {
            const slug = "portal-2";
            const url = getSingleGameUrl(slug);

            expect(url).toEqual(`www.url.com/api/games/${slug}`);
        });
    });

    describe("buildUrl list of games from genre", () => {
        it("should return a url with the proper api call to find a list of games from a certain genre", () => {
            const slug = "action";
            const url = getListGenre(slug);

            expect(url).toEqual(`www.url.com/api/genres/${slug}`);
        });
    });


});
