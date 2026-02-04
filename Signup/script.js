/*
  TODO: Enable email validation with Abstract API.
  TODO: Enable signup for reset when page will load.
*/


document.addEventListener('DOMContentLoaded', () => {
  // Toggle Password Visibility
  const showPassButtons = document.querySelectorAll('.show_pass');
  if (showPassButtons) {
    showPassButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const input = button.parentElement.querySelector('input');
        const img = button.querySelector('img');

        if (input && img) {
          if (input.type === 'password') {
            input.type = 'text';
            img.src =
              'https://cdn.prod.website-files.com/673728493d38fb595b0df373/6981d4e4fd9099de65a07b11_eye_off.png';
          } else {
            input.type = 'password';
            img.src =
              'https://cdn.prod.website-files.com/673728493d38fb595b0df373/697b853f0e40bcd4969f65de_password.png';
          }
        }
      });
    });
  }

  // Signup Logic
  const signupForm = document.querySelector(".signup");
  const nameInput = document.querySelector(".signupname");
  const emailInput = document.querySelector(".signupemail");
  const passwordInput = document.querySelector("#password");
  const confirmPasswordInput = document.querySelector("#confirm");

  // Initialize Notyf for toast notifications
  var notyf = new Notyf({
    duration: 2500,
    position: {
      x: "right",
      y: "top",
    },
  });

  if (signupForm) {
    signupForm.addEventListener("submit", async function (event) {
      event.preventDefault();

      // Prepare Data
      const fullName = nameInput.value.trim();
      const nameParts = fullName.split(" ");
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";

      const email = emailInput.value.trim();
      const password = passwordInput.value;

      // Validate Phone Number
      let internationalNumber = "";
      if (window.iti && window.iti.isValidNumber()) {
        const format = (window.intlTelInputUtils && window.intlTelInputUtils.numberFormat) ?
          window.intlTelInputUtils.numberFormat.E164 :
          1;
        internationalNumber = window.iti.getNumber(format);
      } else {
        notyf.error("Please enter a valid phone number.");
        return;
      }

      // Validate Password Length
      if (passwordInput.value.length < 8) {
        notyf.error("Password must be at least 8 characters long.");
        return;
      }

      // Validate Password Match
      if (passwordInput.value !== confirmPasswordInput.value) {
        notyf.error("Password and confirm password does not match!");
        return;
      }

      try {
        // Verify Email and Phone
        const verifyRes = await fetch(
          "https://operators-dashboard.bubbleapps.io/api/1.1/wf/email_phone_verification", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email,
              phone: internationalNumber,
            }),
          },
        );
        const verifyData = await verifyRes.json();

        // Check verification results
        if (!verifyData.response.phone_valid) {
          notyf.error("Please enter a valid phone number.");
          return;
        }

        // if (
        //   verifyData.response.email_status !== "DELIVERABLE" ||
        //   verifyData.response.disposable_email === true
        // ) {
        //   notyf.error("Please enter a valid email");
        //   return;
        // }



        //Perform Signup
        const signupRes = await fetch(
          "https://operators-dashboard.bubbleapps.io/api/1.1/wf/webflow_signup_flyt", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              first_name: firstName,
              last_name: lastName,
              password: password,
              email: email,
              phone: internationalNumber,
            }),
          },
        );
        const signupData = await signupRes.json();
        if (signupRes.ok && signupData.response && signupData.response.token) {
          // Success: Set Cookies
          if (typeof Cookies !== "undefined") {
            Cookies.set("userEmail", email, {
              expires: 7,
              secure: true
            });
            Cookies.set("authToken", signupData.response.token, {
              expires: 7,
              secure: true,
            });
            Cookies.set("userFirstName", signupData.response.firstname, {
              expires: 7,
              secure: true,
            });
            Cookies.set("userLastName", signupData.response.lastname, {
              expires: 7,
              secure: true,
            });
          } else {
            console.warn(
              "Cookies library not found. Session cookies were not set.",
            );
          }

          notyf.success("Sign up Successful");
          signupForm.reset();
          
          // Dispatch event to update header instantly
          window.dispatchEvent(new Event("userLoggedIn"));
        } else {
          // Signup Failed
          notyf.error(
            "Signup failed: " + (signupData.message || "Unknown error"),
          );
        }
      } catch (err) {
        console.error(err);
        notyf.error("Something went wrong. Please try again.");
      }
    });
  }
});