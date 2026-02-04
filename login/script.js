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

  loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    var notyf = new Notyf({
      duration: 3000,
      position: {
        x: "right",
        y: "top",
      },
    });

    const email = loginForm.querySelector(".signupemail").value.trim();
    const password = loginForm.querySelector("#password").value;

    try {
      const response = await fetch(
        "https://operators-dashboard.bubbleapps.io/api/1.1/wf/webflow_login_flyt",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        },
      );

      const data = await response.json();
      console.log(data)

      if (response.ok && data.response) {
        // Store user data in cookies
        if (typeof Cookies !== "undefined") {
          Cookies.set("userEmail", email, { expires: 7, secure: true });
          if (data.response.token) {
            Cookies.set("authToken", data.response.token, {
              expires: 7,
              secure: true,
            });
          }
          Cookies.set("userFirstName", data.response.firstname, {
            expires: 7,
            secure: true,
          });
          Cookies.set("userLastName", data.response.lastname, {
            expires: 7,
            secure: true,
          });
        } else {
          console.warn("Cookies library not found.");
        }

        notyf.success("Login Successful!");
        loginForm.reset();

        // Dispatch event to update header instantly
        window.dispatchEvent(new Event("userLoggedIn"));
      } else {
        notyf.error(
          "Login failed: " + (data.message || "Invalid credentials")
        );
      }
    } catch (error) {
      console.error(error);
      notyf.error("An error occurred during login. Please try again.");
    }
  });
});
