# EmailJS Setup for ilovereceipt

To enable email notifications for signup and subscription approval, follow these steps:

## 1. Create an EmailJS Account

- Go to https://www.emailjs.com/ and sign up for a free account.

## 2. Add an Email Service

- In the EmailJS dashboard, go to **Email Services**.
- Click **Add New Service** and connect your preferred email provider (e.g., Gmail, Outlook, custom SMTP).
- Note the **Service ID** (e.g., `service_xxxxx`).

## 3. Create Email Templates

### a. Signup Template

- Go to **Email Templates** > **Create New Template**.
- Name: `template_signup`
- Subject: `Welcome to ilovereceipt, {{first_name}}!`
- Message (example):

```
Hi {{first_name}},

Thank you for signing up for ilovereceipt! Your account has been created successfully.

You can log in to your account here:
{{login_url}}

If you have any questions, reply to this email.

Best regards,
ilovereceipt Team
```

- Add variables: `first_name`, `login_url`, `to_email`

### b. Approval Template

- Name: `template_approval`
- Subject: `Your ilovereceipt Subscription is Active!`
- Message (example):

```
Hi {{first_name}},

Good news! Your payment has been approved and your ilovereceipt subscription is now active.

You can log in to your account here:
{{login_url}}

Thank you for choosing ilovereceipt!

Best regards,
ilovereceipt Team
```

- Add variables: `first_name`, `login_url`, `to_email`

## 4. Get Your Public Key

- Go to **Account** > **API Keys**.
- Copy your **Public Key** (e.g., `user_xxxxx`).

## 5. Update `email.js`

- Open `email.js` in your project.
- Replace the placeholders:
  - `EMAILJS_SERVICE_ID` with your service ID
  - `EMAILJS_TEMPLATE_SIGNUP` with your signup template ID
  - `EMAILJS_TEMPLATE_APPROVAL` with your approval template ID
  - `EMAILJS_USER_ID` with your public key

Example:

```js
const EMAILJS_SERVICE_ID = "service_xxxxx";
const EMAILJS_TEMPLATE_SIGNUP = "template_signup";
const EMAILJS_TEMPLATE_APPROVAL = "template_approval";
const EMAILJS_USER_ID = "user_xxxxx";
```

## 6. Test the Flow

- Sign up as a new user and check your email for the welcome message.
- Approve a payment as admin and check for the approval email.

---

**Note:**

- You can customize the email templates in EmailJS for branding and additional info.
- For production, consider upgrading your EmailJS plan for higher limits and reliability.

---

**Need help?**

- See https://www.emailjs.com/docs/
- Or contact EmailJS support.
