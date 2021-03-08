$(document).ready(() => {


});

let searchBtn = document.getElementById('searchBtn');

// search input field
let gameSearch = document.getElementById('gameSearch').value;

// gameIMg
let gameImg = document.getElementById('gameImg');

// API url 
let url = "wwww.gamesdgsdgsg.com/api/" + consoleSearch + "/" + gameSearch

searchBtn.addEventListener(click, searchGame;

function searchName () {
    
    fetch(url)
    .then(function (result) {
    return result.json()
    })
    .then(function (gameData) {

        let gameImgDB = JSON.stringify(gameData.image);

        gameImg.setAttribute("src", gameImgDB)

         document.getElementById('day1H').textContent
    })
}


