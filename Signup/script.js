document.addEventListener('DOMContentLoaded', () => {
  const showPassButtons = document.querySelectorAll('.show_pass');

  showPassButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const input = button.parentElement.querySelector('input');
      const img = button.querySelector('img');

      if (input.type === 'password') {
        input.type = 'text';
        img.src =
          'https://cdn.prod.website-files.com/673728493d38fb595b0df373/6981d4e4fd9099de65a07b11_eye_off.png';
      } else {
        input.type = 'password';
        img.src =
          'https://cdn.prod.website-files.com/673728493d38fb595b0df373/697b853f0e40bcd4969f65de_password.png';
      }
    });
  });

  // validate password and confirm password
  const signupForm = document.querySelector(".signup");
  const signUpPass = document.querySelector("#password");
  const signUpConfirmPass = document.querySelector("#confirm");

  signupForm.addEventListener("submit", function (event){
   event.preventDefault();
   if (signUpPass.value !== signUpConfirmPass.value) {
     var notyf = new Notyf({
       duration: 2500,
       position: {
         x: "right",
         y: "top",
       },
     });
     notyf.error("Password and confirm password does not match!");
   }
  })
});
