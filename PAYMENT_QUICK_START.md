# 🚀 Manual Payment System - Quick Start Guide

## What Changed?

### 📱 User Payment Page (manual-payment.html)

**NEW FEATURES:**

- ✅ **Month Selector**: Choose 1-12 months (grid buttons)
- ✅ **Dynamic Pricing**: GHS 20 × selected months
- ✅ **Unique Reference Codes**: Auto-generated, changes per transaction
- ✅ **Copy Feedback**: Button shows "Copied" for 2 seconds (green)
- ✅ **MoMo Details**: 0505 671 965 (Telecel)

**How it works for users:**

1. Select number of months (1-12)
2. See total price (months × 20)
3. Get unique reference code
4. Copy MoMo number and reference code
5. Send payment via Telecel Mobile Money
6. Submit phone + transaction ID
7. Wait for admin approval (1-2 hours)
8. Get subscription for selected months

---

### 👨‍💼 Admin Dashboard (admin-dashboard.html)

**NEW FEATURES:**

- ✅ **Shows Months**: Each payment displays subscription duration
- ✅ **Edit Period Button**: For approved payments only
- ✅ **Edit Modal**: Change months for existing subscription
- ✅ **Auto Updates**: User expiry date calculated based on new months

**Admin Actions:**

1. See pending payments with all details
2. **Approve** → Activates subscription for selected months
3. **Reject** → Marks payment as rejected
4. **Edit Period** (if approved) → Change duration, updates expiry date

---

## 💰 Payment Calculation Example

| Scenario           | Months | Amount  | Expiry     |
| ------------------ | ------ | ------- | ---------- |
| User buys 1 month  | 1      | GHS 20  | +1 month   |
| User buys 3 months | 3      | GHS 60  | +3 months  |
| User buys 6 months | 6      | GHS 120 | +6 months  |
| Admin edits to 12  | 12     | GHS 240 | +12 months |

---

## 🔗 Reference Code Examples

Unique codes generated for each transaction:

- `3RT9Z2H8X`
- `2XK4N7P9`
- `5WQ8M2B5`
- `4PLM9R2K`

Each one is unique and never repeats.

---

## 📊 Database Fields

**manual_payments Collection:**

```
✅ referenceCode - Unique per transaction
✅ months - Duration user selected (1-12)
✅ amount - Total (months × 20)
✅ status - pending/approved/rejected
✅ userEmail, userPhone, transactionId
```

**users Collection (when approved):**

```
✅ subscriptionMonths - Duration (1-12)
✅ subscriptionExpiry - Today + (months × 30 days)
✅ subscriptionStatus - "active"
```

---

## 🎯 Key Numbers

| Item                | Value                     |
| ------------------- | ------------------------- |
| **Price per month** | GHS 20                    |
| **Min months**      | 1                         |
| **Max months**      | 12                        |
| **MoMo Number**     | 0505 671 965              |
| **Provider**        | Telecel                   |
| **Admin Email**     | emmanuelfiati32@gmail.com |

---

## ✨ Feature Highlights

### Copy Button Feedback

```
User clicks "Copy"
     ↓
Text copied to clipboard
     ↓
Button shows "Copied" (green)
     ↓
Auto-reverts after 2 seconds
```

### Month Selection

```
Grid of 12 buttons (1-12)
     ↓
Click to select
     ↓
Price updates instantly
     ↓
Reference code regenerates
```

### Admin Edit Period

```
Click "Edit Period" on approved payment
     ↓
Modal opens with month selector
     ↓
Pick new duration
     ↓
See new amount
     ↓
Click "Save Changes"
     ↓
Payment updated
     ↓
User expiry recalculated
```

---

## 🧪 Quick Tests

**Test 1: Copy Feedback**

- Visit payment page
- Click "Copy" on MoMo number
- Button should turn green and show "Copied"
- Should revert to "Copy" after 2 seconds

**Test 2: Dynamic Pricing**

- Select 3 months → Should show "GHS 60"
- Select 6 months → Should show "GHS 120"
- Price = months × 20

**Test 3: Unique Reference**

- Load page → Get reference code (e.g., 3RT9Z2H8X)
- Refresh page → Get different code
- Select different months → Code changes again

**Test 4: Admin Approve**

- Admin approves 3-month payment
- Check Firebase users collection
- subscriptionMonths should be 3
- subscriptionExpiry should be 3 months from now

**Test 5: Edit Period**

- Admin opens approved payment
- Click "Edit Period"
- Change to 6 months
- Click "Save Changes"
- Check Firebase: months should be 6, expiry should be 6 months

---

## 🔧 Configuration

### To change MoMo number:

**File**: `manual-payment.html` line ~250

```javascript
const MOMO_NUMBER = "0505671965"; // Change this
```

### To change price per month:

**File**: `manual-payment.html` line ~252

```javascript
const PRICE_PER_MONTH = 20; // Change to 25, 30, etc.
```

### To change max months available:

**File**: `manual-payment.html` line ~253

```javascript
const MAX_MONTHS = 12; // Change to 24, 36, etc.
```

---

## 📝 User Experience Flow

```
Payment Page:
  "Select how many months you want"
  [1] [2] [3] ... [12]

  Selected: 3 months
  Amount: GHS 60 (3 × 20)
  Reference: 3RT9Z2H8X

  [Copy] MoMo Number: 0505 671 965
  [Copy] Reference: 3RT9Z2H8X

  "Send GHS 60 to 0505 671 965"
  "Include reference: 3RT9Z2H8X"

  [Submit Payment]
  ✅ "Payment submitted!"
  ⏳ "Waiting for approval..."

After Approval:
  ✅ "Your payment approved!"
  ✅ "Access active for 3 months"
  📅 "Expires on: [date 3 months away]"
```

```
Admin Dashboard:

  Pending Payments:
    - 3 months | GHS 60 | Reference: 3RT9Z2H8X
    - 6 months | GHS 120 | Reference: 2XK4N7P9

  [Approve] [Reject]

  After Approval (can edit):
    ✅ Approved 3 months | GHS 60
    [Edit Period]

    Click Edit → Modal:
    Select months: [1][2][3][4][5][6]...
    New amount: GHS 120
    [Save Changes]
    → Updated!
```

---

## ✅ What's Working

- ✅ Unique reference codes (never duplicate)
- ✅ Month selection (1-12 options)
- ✅ Dynamic pricing (months × 20)
- ✅ Copy button with "Copied" feedback
- ✅ Months stored in database
- ✅ Admin approval with correct expiry
- ✅ Edit period for approved payments
- ✅ Real-time Firebase sync

---

## 📞 Support Info

**MoMo Number**: 0505 671 965 (Telecel)  
**WhatsApp Support**: +233 505 671 965  
**Admin Email**: emmanuelfiati32@gmail.com  
**Price**: GHS 20 per month

---

**Last Updated**: February 14, 2026  
**Status**: ✅ Ready to Use
