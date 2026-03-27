let captchaWidget = null;
let captchaSolved = false;
let captchaToken = "";

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const captchaContainer = document.getElementById("captchaContainer");

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        if (username !== "admin" || password !== "admin123") {
            alert("Invalid username or password");
            return;
        }

        if (!captchaSolved) {
            captchaContainer.style.display = "block";

            if (!captchaWidget) {
                captchaWidget = turnstile.render("#captchaContainer", {
                    sitekey: "1x00000000000000000000AA", // Official Cloudflare public demo key - fixes Error 110200
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

        // Removed localhost fetch for GitHub Pages static hosting
        console.log("✅ Login Successful! Username:", username, "Token:", captchaToken);
        alert("Login Successful ✅ Welcome to Dashboard!");
        
        // Optional: Reset for next try
        // turnstile.reset(captchaWidget);
        // captchaSolved = false;
    });
});