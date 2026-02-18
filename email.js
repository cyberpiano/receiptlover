// email.js - Email sending helper using EmailJS v4
// Updated to work reliably with admin-dashboard.html

// 1. EmailJS Credentials
const EMAILJS_SERVICE_ID = "service_6tc2tsm";
const EMAILJS_TEMPLATE_SIGNUP = "template_x86or4o";
const EMAILJS_TEMPLATE_APPROVAL = "template_01rsenv";

/**
 * Send signup email to new users
 * @param {string} toEmail - The recipient's email
 * @param {string} firstName - The recipient's first name
 */
async function sendSignupEmail(toEmail, firstName) {
    if (typeof emailjs === 'undefined') {
        console.error("[EmailJS] SDK not found. Make sure the script is in your HTML head.");
        return;
    }

    console.log("[EmailJS] Sending signup email to:", toEmail);

    const templateParams = {
        to_email: toEmail,
        first_name: firstName || "User",
        login_url: window.location.origin + "/login.html",
    };

    try {
        const response = await emailjs.send(
            EMAILJS_SERVICE_ID, 
            EMAILJS_TEMPLATE_SIGNUP, 
            templateParams
        );
        console.log("[EmailJS] Signup email sent successfully!", response.status, response.text);
    } catch (error) {
        console.error("[EmailJS] Failed to send signup email:", error);
    }
}

/**
 * Send payment approval email to customers
 * @param {string} toEmail - The recipient's email
 * @param {string} firstName - The recipient's first name
 */
async function sendApprovalEmail(toEmail, firstName) {
    if (typeof emailjs === 'undefined') {
        console.error("[EmailJS] SDK not found. Make sure the script is in your HTML head.");
        return;
    }

    console.log("[EmailJS] Sending approval email to:", toEmail);

    const templateParams = {
        to_email: toEmail,
        first_name: firstName || "User",
        login_url: window.location.origin + "/login.html",
    };

    try {
        const response = await emailjs.send(
            EMAILJS_SERVICE_ID, 
            EMAILJS_TEMPLATE_APPROVAL, 
            templateParams
        );
        console.log("[EmailJS] Approval email sent successfully!", response.status, response.text);
    } catch (error) {
        console.error("[EmailJS] Failed to send approval email:", error);
    }
}

// 2. Export functions to the global window object so admin-dashboard.html can see them
window.sendSignupEmail = sendSignupEmail;
window.sendApprovalEmail = sendApprovalEmail;

console.log("[EmailJS] Helper functions loaded and ready.");