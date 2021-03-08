$(document).ready(function() {
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
        location.assign("/");
        console.log(data);
      })
      .fail(handleLoginErr);
  }

  function handleLoginErr(err) {
    $(".email-error").text(err.responseJSON.email);
    $(".password-error").text(err.responseJSON.password);
    //$("#alert").fadeIn(500);
    console.log(err.responseJSON);
  }
});
