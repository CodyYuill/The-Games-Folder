$(document).ready(function() {

    function handleLoginErr(err) {
        $(".email-error").text(err.responseJSON.email);
        $(".password-error").text(err.responseJSON.password);
        //$("#alert").fadeIn(500);
        console.log(err.responseJSON);
    }

    // Does a post to the signup route. If successful, we are redirected to the members page
    // Otherwise we log any errors
    function signUpUser(email, password) {
        $.post("/api/signup", {
            email: email,
            password: password
        })
            .then(function(data) {
                //window.location.replace("/members");
                // If there's an error, handle it by throwing up a bootstrap alert
                //location.assign("/");
                console.log(data);
            })
            .fail(handleLoginErr);
    }

    // Does a post to the login route. If successful, we are redirected to the members page
    // Otherwise we log any errors
    function loginUser(email, password) {
        $.post("/api/login", {
            email: email,
            password: password
        })
            .then(function(data) {
                if(data === "Invalid email") {
                    $(".emailError").text("That email is not registered");
                }else if(data === "Invalid password") {
                    $(".passwordError").text("That password is incorrect");
                }else{
                    location.assign("/");
                    //console.log(data);
                }
            });
    }

    var signupForm = $("form.signup");
    var signupEmailInput = $("#signupEmail");
    var signupPasswordInput = $("#signupPassword");

    signupForm.on("submit", function(event){
        event.preventDefault();
        var userData = {
            email: signupEmailInput.val().trim(),
            password: signupPasswordInput.val().trim()
        };

        //console.log(userData);
        if (!userData.email || !userData.password) {
            return;
        }

        // If we have an email and password, run the signUpUser function
        signUpUser(userData.email, userData.password);
        signupEmailInput.val("");
        signupPasswordInput.val("");
    });

    var loginForm = $("form.login");
    var loginEmailInput = $("#loginEmail");
    var loginPasswordInput = $("#loginPassword");

    loginForm.on("submit", function(event){
        event.preventDefault();
        var userData = {
            email: loginEmailInput.val().trim(),
            password: loginPasswordInput.val().trim()
        };

        //console.log(userData);
        if (!userData.email || !userData.password) {
            return;
        }

        // If we have an email and password, run the signUpUser function
        loginUser(userData.email, userData.password);
        loginEmailInput.val("");
        loginPasswordInput.val("");
    });



});
