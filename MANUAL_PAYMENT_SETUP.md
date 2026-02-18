# Manual Payment Setup Guide

This guide will help you configure the manual MoMo payment system for ilovereceipt.

## 📋 Overview

The manual payment system consists of:
1. **Manual Payment Page** (`manual-payment.html`) - Where users see payment instructions and submit details
2. **Admin Dashboard** (`admin-dashboard.html`) - Where you approve/reject payments
3. **Support Page** (`support.html`) - WhatsApp contact for customer support

## 🔧 Configuration Steps

### 1. Update MoMo Payment Details

**File:** `manual-payment.html`

Find this section (around line 227):
```javascript
// MoMo Configuration - UPDATE THESE WITH YOUR ACTUAL DETAILS
const MOMO_NUMBER = "024 XXX XXXX"; // Replace with your actual MoMo number
const PAYMENT_AMOUNT = 10; // Replace with your actual amount
```

**Update to:**
```javascript
const MOMO_NUMBER = "024 123 4567"; // Your actual MoMo number
const PAYMENT_AMOUNT = 20; // Your subscription price in GHS
```

### 2. Configure Admin Access

**File:** `admin-dashboard.html`

Find this section (around line 306):
```javascript
// Admin email whitelist - UPDATE THIS WITH YOUR ADMIN EMAIL(S)
const ADMIN_EMAILS = ['admin@example.com', 'your-email@example.com'];
```

**Update to:**
```javascript
const ADMIN_EMAILS = ['youremail@gmail.com', 'support@yourcompany.com'];
// Add all email addresses that should have admin access
```

### 3. Set Up WhatsApp Support

**File:** `support.html`

Find this link (around line 71):
```html
<a href="https://wa.me/233XXXXXXXXX?text=Hi%2C%20I%20need%20help%20with%20my%20ilovereceipt%20account"
```

**Update to:**
```html
<a href="https://wa.me/233YOURNUMBER?text=Hi%2C%20I%20need%20help%20with%20my%20ilovereceipt%20account"
```

**Format:** Use international format without + or spaces
- Example: `233240000000` for Ghana
- The URL encoding `%2C` represents a comma, `%20` represents a space

### 4. Firebase Security Rules (Important!)

You need to update your Firestore security rules to allow the manual payment system to work.

**Go to:** Firebase Console → Firestore Database → Rules

**Add these rules:**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Existing users collection rules...
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      allow write: if request.auth != null && 
                     request.auth.token.email in ['youradmin@email.com']; // Admin can update
    }
    
    // Manual payments collection
    match /manual_payments/{paymentId} {
      // Users can create their own payment submissions
      allow create: if request.auth != null && 
                       request.resource.data.userId == request.auth.uid;
      
      // Users can read their own payments
      allow read: if request.auth != null && 
                     resource.data.userId == request.auth.uid;
      
      // Admins can read and update all payments
      allow read, write: if request.auth != null && 
                           request.auth.token.email in ['youradmin@email.com', 'admin2@email.com'];
    }
  }
}
```

**Replace** `'youradmin@email.com'` with your actual admin email(s).

## 🚀 Usage Workflow

### For Customers:
1. User goes to `payment.html`
2. Clicks "Pay with MoMo (Manual)"
3. Sees payment instructions with:
   - MoMo number to send money to
   - Amount to pay
   - Unique reference code
4. Makes payment via MoMo
5. Submits payment details (phone number + transaction ID)
6. Waits for admin approval (1-2 hours)

### For Admins:
1. Go to `admin-dashboard.html` (or create a link in your main dashboard)
2. Log in with admin email
3. See all pending payments
4. Click "Approve" to:
   - Mark payment as approved
   - Activate user's 1-month subscription
   - User gets immediate access
5. Or click "Reject" if payment is invalid

## 📊 Database Structure

The system creates a `manual_payments` collection with this structure:

```javascript
{
  userId: "abc123...",           // User's Firebase UID
  userEmail: "user@example.com", // User's email
  userPhone: "024 123 4567",     // Phone used for payment
  transactionId: "MP123456789",  // MoMo transaction ID
  referenceCode: "USER12345",    // Unique reference code
  amount: 20,                    // Payment amount in GHS
  status: "pending",             // pending | approved | rejected
  submittedAt: Timestamp,        // When user submitted
  approvedAt: Timestamp,         // When admin approved (null if pending)
  approvedBy: "admin@email.com"  // Admin who approved (null if pending)
}
```

## 🔗 Integration Points

### Add Admin Dashboard Link

You can add a link to the admin dashboard in your main navigation:

```html
<!-- Only show for admin users -->
<a href="admin-dashboard.html" 
   class="nav-link">
  <i class="fa-solid fa-shield-halved"></i>
  Admin Dashboard
</a>
```

### Check User's Payment Status

On the dashboard, you can show a message to users with pending payments:

```javascript
// Check if user has pending payment
db.collection('manual_payments')
  .where('userId', '==', currentUser.uid)
  .where('status', '==', 'pending')
  .get()
  .then((snapshot) => {
    if (!snapshot.empty) {
      // Show message: "Your payment is being verified..."
    }
  });
```

## 💡 Tips

1. **Response Time:** Try to verify payments within 1-2 hours during business hours
2. **Communication:** Use the WhatsApp support for quick communication about payment issues
3. **Record Keeping:** The Firebase database keeps all records, so you have a complete audit trail
4. **Verification:** Always verify the transaction ID in your MoMo statement before approving
5. **Fraud Prevention:** Check that the phone number and amount match your records

## 🎨 Customization

### Change Subscription Duration

In `admin-dashboard.html`, find the approval function (around line 485):

```javascript
const expiryDate = new Date();
expiryDate.setMonth(expiryDate.getMonth() + 1); // Change this number for different durations
```

### Update Payment Amount Options

You can create different payment tiers by modifying the `PAYMENT_AMOUNT` or adding multiple options.

## 📱 Testing

1. **Test User Flow:**
   - Sign up as a regular user
   - Go to manual payment page
   - Submit fake payment details
   
2. **Test Admin Flow:**
   - Log in with admin email
   - Go to admin dashboard
   - Approve the test payment
   - Verify user subscription is activated

3. **Test Support:**
   - Click support links
   - Verify WhatsApp opens correctly

## ⚠️ Security Notes

- Never commit your Firebase config with real credentials to public repositories
- Keep admin email list secure
- Regularly review payment records for anomalies
- Consider adding rate limiting for payment submissions
- Back up your Firestore data regularly

## 🆘 Troubleshooting

**Problem:** Can't access admin dashboard
- **Solution:** Check that your email is in the `ADMIN_EMAILS` array

**Problem:** Payments not showing up
- **Solution:** Check Firestore security rules allow reading `manual_payments` collection

**Problem:** WhatsApp link not working
- **Solution:** Verify phone number format (international, no + or spaces)

**Problem:** User subscription not activating
- **Solution:** Check that the `users` collection allows admin to update subscription fields

## 📞 Support

If you need help setting this up, refer to the `support.html` page or check Firebase documentation.

---

**Created:** February 2026  
**Version:** 1.0  
**Compatible with:** Firebase Firestore, Firebase Auth
