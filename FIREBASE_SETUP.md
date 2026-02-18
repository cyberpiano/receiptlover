# Firebase Setup Instructions

Since I cannot access your Google Account directly, you need to create the Firebase project and get the configuration keys. Follow these exact steps:

## 1. Create a Firebase Project
1. Go to [console.firebase.google.com](https://console.firebase.google.com/).
2. Click **"Add project"** (or "Create a project").
3. Name it `InvoiceApp` (or anything you like).
4. Toggle "Enable Google Analytics" **OFF** (to make it faster) and click **Create project**.
5. Wait for it to finish and click **Continue**.

## 2. Enable Authentication
1. In the left sidebar, click **Build** > **Authentication**.
2. Click **Get started**.
3. Under "Sign-in method", click **Email/Password**.
4. Toggle **Enable** to ON.
5. Click **Save**.

## 3. Create the Database (Firestore)
1. In the left sidebar, click **Build** > **Firestore Database**.
2. Click **Create database**.
3. Choose a location (default is usually fine).
4. **IMPORTANT**: Choose **Start in test mode** (for now, so we can write to it easily).
5. Click **Create**.

## 4. Get the Config Keys
1. In the left sidebar, click the **Gear icon** (Project settings) at the very top next to "Project Overview".
2. Scroll down to the "Your apps" section.
3. Click the **</> (Web)** icon.
4. Nickname the app `InvoiceAppWeb` and click **Register app**.
5. You will see a code block with `const firebaseConfig = { ... };`.
6. **COPY** the content inside `firebaseConfig`. It looks like this:
   ```javascript
   apiKey: "AIzaSy...",
   authDomain: "...",
   projectId: "...",
   storageBucket: "...",
   messagingSenderId: "...",
   appId: "..."
   ```

## 5. Paystack Setup
1. Go to the [Paystack Dashboard](https://dashboard.paystack.com/).
2. Go to **Settings** > **API Keys & Webhooks**.
3. Copy your **Public Key** (starts with `pk_test_...` or `pk_live_...`).

## 6. Update Your Code
Open the following files in your editor and paste your keys:

*   **`receipt2.html`**: Replace the `firebaseConfig` object lines 17-24.
*   **`login.html`**: Replace `firebaseConfig` object lines 51-58.
*   **`signup.html`**: Replace `firebaseConfig` object lines 48-55.
*   **`payment.html`**:
    *   Replace `firebaseConfig` object (lines 35-42).
    *   Replace `"YOUR_PAYSTACK_PUBLIC_KEY"` (line 43) with your Paystack Public Key.

## 7. Run the App
Firebase Auth requires the app to be served via a server (not just clicking the HTML file).
Run this command in your terminal:
```bash
npx serve .
```
Then open `http://localhost:3000`.
