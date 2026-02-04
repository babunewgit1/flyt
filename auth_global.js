document.addEventListener("DOMContentLoaded", () => {
  updateHeaderState();

  // Listen for custom events if dispatched by other scripts
  window.addEventListener("userLoggedIn", updateHeaderState);
  window.addEventListener("userLoggedOut", updateHeaderState);
});

// Function to update the header based on cookies
function updateHeaderState() {
  const loginLinks = document.querySelectorAll(".desktop_login, .sm_login"); 
  const accountHolders = document.querySelectorAll(".logout_desktop, .logout_sm");

  // Safety check for Cookies library
  if (typeof Cookies === "undefined") {
    console.warn("Cookies library not found in auth_global.js");
    return;
  }

  const userEmail = Cookies.get("userEmail");
  const authToken = Cookies.get("authToken");

  // Determine if user is logged in
  const isLoggedIn = userEmail && authToken;
  if (isLoggedIn) {
    loginLinks.forEach(btn => btn.style.display = "none");
    accountHolders.forEach(holder => {
        holder.style.display = "flex";
    });

  } else {
    loginLinks.forEach(btn => btn.style.display = "flex");
    accountHolders.forEach(holder => holder.style.display = "none");
  }
}

// Global Logout Handler (Optional - ensures logout button works if present)
document.addEventListener("DOMContentLoaded", () => {
    const logoutBtns = document.querySelectorAll(".logout_desktop, .logout_sm");
    
    logoutBtns.forEach(btn => {
        btn.addEventListener("click", async (e) => {
            e.preventDefault();            
            const token = Cookies.get("authToken");
            // Attempt API Logout
            if (token) {
                try {
                    await fetch(
                      "https://operators-dashboard.bubbleapps.io/api/1.1/wf/webflow_logout_flyt",
                      {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                          Authorization: `Bearer ${token}`,
                        },
                      },
                    );
                } catch (error) {
                    console.error("Logout API failed", error);
                }
            }

            // Clear Cookies
            Cookies.remove("userEmail");
            Cookies.remove("authToken");
            Cookies.remove("userFirstName");
            Cookies.remove("userLastName");
            // Update UI
            updateHeaderState();
        });
    });
});

// Expose function globally
window.updateHeaderState = updateHeaderState;
