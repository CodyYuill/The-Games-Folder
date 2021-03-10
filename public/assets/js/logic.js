$(document).ready(() => {
    let searchBtn = $("#searchBtn");

    // search input field
    let gameSearch = $("#gameSearch");

    let postReview = $("#reviewPost");
    let reviewBody = $("#reviewBody");
    let postBtn = $("#postBtn");


    searchBtn.on("click", function(){
        var gameToSearch = gameSearch.val();
        fetch(`/api/games/${gameToSearch}`).then(function(result){
            console.log(result);
            window.location.href = result.url;
        }).catch(function(err){
            console.log(err);
        });

    });

    postReview.on("submit", function(e){
        e.preventDefault();
        if($("#currentUserInfo")){
            var newReview = {
                body: reviewBody.val().trim(),
                rating: 5,
                GameId: reviewBody.data("gameid"),
                UserId: $("#currentUserInfo").data("userid")
            };
            //console.log(newReview);
            $.post("/api/add-review", newReview, function(result){
                console.log(result);
                location.reload();
            });
        }
    });

    function disableEnableReviewPosting(){
        //console.log($("currentUserInfo").html());
        if($("#currentUserInfo").html()){
            postBtn.prop("disabled", false);
            reviewBody.prop("disabled", false);
            reviewBody.attr("placeholder", "Leave a review...");
        } else{
            postBtn.prop("disabled", true);
            reviewBody.prop("disabled", true);
            reviewBody.attr("placeholder", "Please sign in to leave a review");
        }
    }

    disableEnableReviewPosting();


});



