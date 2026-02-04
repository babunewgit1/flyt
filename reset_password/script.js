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
  const resetPassForm = document.querySelector(".reset_password");
  const resetPass = document.querySelector("#password");
  const resetConfirmPass = document.querySelector("#confirm");

  resetPassForm.addEventListener("submit", function (event) {
    event.preventDefault();
    if (resetPass.value !== resetConfirmPass.value) {
      var notyf = new Notyf({
        duration: 2500,
        position: {
          x: "right",
          y: "top",
        },
      });
      notyf.error("Password and confirm password does not match!");
    }
  });
});
