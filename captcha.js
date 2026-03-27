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
                // Dynamic re-render for new token each time
                if (captchaWidget) {
                    turnstile.remove(captchaWidget);
                    captchaWidget = null;
                }
                captchaWidget = turnstile.render("#captchaContainer", {
                    sitekey: "1x00000000000000000000AA"
                    theme: "light",
                    size: "normal",
                    appearance: "always",
                    retry: "never",
                    errorCallback: function() {
                        console.error("Turnstile render error - check sitekey/domain");
                        alert("Captcha load error. Check console.");
                    },
                    expiredCallback: function() {
                        captchaSolved = false;
                        alert("Captcha expired - try again.");
                    },
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

        // Client-only demo - dynamic new CAPTCHA each time
        console.log("✅ Login Successful (Demo)! Token:", captchaToken);
        alert("Login Successful ✅ Welcome! Token logged in console (demo mode - long real token needs backend verify).");
        
        captchaContainer.style.display = "none";
        submitBtn.disabled = true;
        submitBtn.textContent = "Logged In ✅";
    });

});
