let captchaWidget = null;
let captchaSolved = false;
let captchaToken = "";

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const captchaContainer = document.getElementById("captchaContainer");

    const submitBtn = document.querySelector("#loginForm button[type=submit]");
    
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // Reset on each submit attempt
        if (captchaWidget) {
            turnstile.reset(captchaWidget);
        }
        captchaSolved = false;
        captchaToken = "";

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        if (username !== "admin" || password !== "admin123") {
            alert("Invalid username or password");
            return;
        }

        if (!captchaSolved) {
            captchaContainer.style.display = "block";

            if (!captchaWidget) {
                // Re-render fresh widget for new token
                if (captchaWidget) {
                    turnstile.remove(captchaWidget);
                }
                captchaWidget = turnstile.render("#captchaContainer", {
                    sitekey: "1x00000000000000000000AA", // Official public demo sitekey - fixes 110200 error
                    theme: "light",
                    size: "normal",
                    appearance: "always",
                    callback: function (token) {
                        captchaToken = token;
                        captchaSolved = true;
                        console.log("✅ CAPTCHA Token:", token);
                        alert("CAPTCHA completed ✅ - click Login again");
                    }
                });
            }

            alert("Please complete CAPTCHA ✅");
            return;
        }

        // Success
        console.log("✅ Login Successful! Username:", username, "Token:", captchaToken);
        alert("Login Successful ✅ Welcome to Dashboard!");
        
        // Hide captcha post-success, disable button
        captchaContainer.style.display = "none";
        submitBtn.disabled = true;
        submitBtn.textContent = "Logged In ✅";
    });

});
