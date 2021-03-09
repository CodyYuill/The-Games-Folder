$(document).ready(() => {
    let searchBtn = $("#searchBtn");

    // search input field
    let gameSearch = $("#gameSearch");


    searchBtn.on("click", function(){
        var gameToSearch = gameSearch.val();
        fetch(`/api/games/${gameToSearch}`).then(function(result){
            console.log(result);
            window.location.href = result.url;
        });

    });


});



