$(document).ready(() => {
    // let searchBtn = document.getElementById("searchBtn");
    let searchBtn = $("#searchBtn");

    // search input field
    // let gameSearch = document.getElementById("gameSearch");
    let gameSearch = $("#gameSearch");

    // gameIMg
    //let gameImg = document.getElementById("gameImg");


    searchBtn.on("click", function(){
        var gameToSearch = gameSearch.val();
        fetch(`/api/games/${gameToSearch}`).then(function(result){
            console.log(result);
            window.location.href = result.url;
        });

    });
    // searchBtn.addEventListener("click", searchGame);


});



