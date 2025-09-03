# EmailJS Setup for Static Site Email Notifications

Your PassionFruit site now uses EmailJS to send email notifications directly from the browser - perfect for static hosting on GitHub Pages!

## Benefits
- ✅ 200 free emails per month
- ✅ Works with any static hosting (GitHub Pages, Netlify, Vercel)
- ✅ No backend server required
- ✅ shanker87@gmail.com receives all booking notifications
- ✅ Customers get confirmation emails

## Setup Steps

### 1. Create EmailJS Account
1. Go to [emailjs.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### 2. Configure Email Service
1. **Add Email Service**
   - Go to Email Services in your EmailJS dashboard
   - Click "Add New Service"
   - Choose "Gmail" (recommended)
   - Connect your Gmail account (use jayant.svnit@gmail.com or create a new account)

2. **Note Your Service ID**
   - After setup, note your Service ID (e.g., `service_xyz123`)

### 3. Create Email Templates

#### Template 1: Booking Confirmation
1. Go to "Email Templates" in dashboard
2. Click "Create New Template"
3. Name it "Booking Confirmation"
4. Use this template:

```html
Subject: Booking Confirmation - {{product_name}} - {{booking_id}}

Hi {{to_name}},

Your booking has been confirmed! Here are the details:

📋 BOOKING INFORMATION
Booking ID: {{booking_id}}
Product: {{product_name}}
Rental Period: {{rental_period}}
Duration: {{rental_duration}}
Total Price: {{total_price}}
Status: {{booking_status}}

👤 CUSTOMER DETAILS  
Name: {{customer_name}}
Email: {{customer_email}}
Mobile: {{customer_phone}}
Delivery Address: {{delivery_address}}
Emergency Contact: {{emergency_contact}}

🚚 WHAT'S NEXT?
• We'll prepare your equipment in perfect condition
• You'll receive delivery tracking information
• Our team will contact you if needed

Thank you for choosing PassionFruit!
Contact: support@passionfruit.com

Best regards,
PassionFruit Team
```

#### Template 2: Contact Form & Product Requests
1. Create another template named "Contact Form"
2. Use this template (handles both contact forms and product requests):

```html
Subject: {{subject}} - PassionFruit

{{#product_name}}
🔍 PRODUCT REQUEST

Customer Details:
Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone_number}}

Product Request:
Product: {{product_name}}
Category: {{category}}
Description: {{description}}
Budget: {{budget}}
Timeline: {{timeline}}
{{/product_name}}

{{^product_name}}
📧 CONTACT FORM SUBMISSION

From: {{from_name}}
Email: {{from_email}}
Phone: {{phone_number}}
Message: {{message}}
{{/product_name}}

---
PassionFruit System
```

### 4. Get Your Keys
After creating templates, note these IDs:
- **Service ID**: `service_xyz123`
- **Template ID (Booking)**: `template_abc456`  
- **Template ID (Contact)**: `template_def789`
- **Public Key**: Found in Account > API Keys

### 5. Configure Environment Variables

Create `.env` file in your project root:

```bash
# EmailJS Configuration
VITE_EMAILJS_SERVICE_ID=service_xyz123
VITE_EMAILJS_TEMPLATE_ID=template_abc456
VITE_EMAILJS_CONTACT_TEMPLATE_ID=template_def789
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

### 6. Update Email Destinations

In your EmailJS templates, set the default recipient to:
- **To Email**: `shanker87@gmail.com`

This ensures all booking confirmations and contact forms go to the admin email.

### 7. Test Your Setup

1. **Test Booking Flow**:
   - Go to any product page
   - Start a booking
   - Fill out the form (including mobile number)
   - Submit and check both customer and admin emails

2. **Test Contact Form**:
   - Go to Contact page
   - Fill out contact form (including mobile number)
   - Verify shanker87@gmail.com receives the message

3. **Test Product Request**:
   - Go to home page and scroll to bottom
   - OR search for something that doesn't exist
   - Fill out the "Couldn't Find What You Were Looking For?" form
   - Verify admin receives product request email

## Email Flow

```
User submits booking/contact form on static site
                ↓
EmailJS sends emails directly from browser
                ↓
Emails delivered to:
• Customer (booking confirmations)
• shanker87@gmail.com (all notifications)
```

## Free Tier Limits

- **200 emails/month** - More than enough for most rental businesses
- **2 email services** - Gmail + backup service
- **Unlimited templates** - Customize all your emails

## Backup Options

If you exceed the free tier:
1. **Upgrade EmailJS**: $15/month for 1000 emails
2. **Use Formspree**: Alternative service with 50 free emails
3. **Multiple EmailJS accounts**: Create additional free accounts

## Troubleshooting

### Emails not sending?
1. Check browser console for errors
2. Verify environment variables are correct
3. Ensure EmailJS service is active
4. Check spam folders

### Template not found?
1. Verify template IDs in .env file
2. Make sure templates are published in EmailJS dashboard
3. Check template names match exactly

### Gmail blocked?
1. Use app-specific password for Gmail
2. Enable 2-factor authentication
3. Check Gmail security settings

## Static Hosting Deployment

### GitHub Pages
1. Add environment variables to GitHub Secrets
2. Build process will include them automatically
3. Deploy dist folder to GitHub Pages

### Netlify/Vercel
1. Add environment variables in hosting platform settings
2. Deploy your static site
3. EmailJS works immediately

## Cost Comparison

- **EmailJS Free**: 200 emails/month - $0
- **EmailJS Pro**: 1000 emails/month - $15
- **Your current setup**: Replit + SendGrid - ~$10/month
- **GitHub Pages hosting**: Free

**Total cost for static solution: $0-15/month vs current $10+/month**

## Next Steps

1. Set up your EmailJS account
2. Configure the environment variables
3. Test the booking and contact flows
4. Deploy to GitHub Pages
5. You're live with a fully static rental platform!

Your customers will receive professional booking confirmations and you'll get all notifications at shanker87@gmail.com - all without any backend servers!