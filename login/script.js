document.addEventListener("DOMContentLoaded", () => {
  const showPassButtons = document.querySelector(".show_pass");

  showPassButtons.addEventListener("click", () => {
    const input = showPassButtons.parentElement.querySelector("input");
    const img = showPassButtons.querySelector("img");

    if (input.type === "password") {
      input.type = "text";
      img.src =
        "https://cdn.prod.website-files.com/673728493d38fb595b0df373/6981d4e4fd9099de65a07b11_eye_off.png";
    } else {
      input.type = "password";
      img.src =
        "https://cdn.prod.website-files.com/673728493d38fb595b0df373/697b853f0e40bcd4969f65de_password.png";
    }
  });

  // code for login form
  const loginForm = document.querySelector(".login");

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    var notyf = new Notyf({
      duration: 2500,
      position: {
        x: "right",
        y: "top",
      },
    });
    notyf.error("Need to write code for login form!");
  });
});
