/*
========================================
    !Forget password
========================================
*/

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".forget_password");
  const emailInput = document.querySelector(".signupemail");
  const submitBtn = document.querySelector(".form_submit button");
  
  // Initialize Notyf for toast notifications
  var notyf = new Notyf({
    duration: 2500,
    position: {
      x: "right",
      y: "top",
    },
  });

  if (form) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      const email = emailInput.value.trim();
      const originalBtnText = submitBtn.innerText;

      try {
        // Disable button during request
        submitBtn.disabled = true;
        submitBtn.innerText = "Sending...";

        const response = await fetch(
          "https://operators-dashboard.bubbleapps.io/api/1.1/wf/webflow_forgotpassword_blackjet",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email,
            }),
          }
        );

        const data = await response.json();

        if (response.ok) {
          notyf.success("Password reset instructions have been sent to your email!");
          form.reset();

          setTimeout(() => {
            window.location.href = "/request-new-password";
          }, 2000);
        } else {
          notyf.error(
            "Failed to process request: " + (data.message || "Please try again")
          );
        }
      } catch (error) {
        console.error("Error:", error);
        notyf.error("An error occurred. Please try again.");
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerText = originalBtnText;
      }
    });
  }
});
