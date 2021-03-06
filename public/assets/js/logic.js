$(document).ready(() => {
    function getAllGames(){
        $.get("/api/all-games", function(data){
            console.log(data);
        });
    }

    function getOneGame(gameSlug){
        $.get(`/api/games/${gameSlug}`, function(data){
            console.log(data);
        });
    }

});
