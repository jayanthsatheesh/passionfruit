# Hosting Your PassionFruit Site on GitHub

## Email Notifications: What Works and What Doesn't

### ❌ GitHub Pages Limitation
GitHub Pages only serves static files (HTML, CSS, JavaScript) and **cannot run backend code**. This means:
- No Node.js server
- No SendGrid email integration
- No server-side processing

### ✅ Solution Options for Email Notifications

## Option 1: Hybrid Hosting (Recommended)

**Frontend on GitHub Pages + Backend on Replit**

1. **Deploy static files to GitHub Pages**
   - Upload your `client/dist` folder contents
   - Your site loads fast from GitHub's CDN

2. **Keep your backend on Replit**
   - Your current email system continues working
   - Set up environment variable: `VITE_API_BASE_URL=https://your-replit-app.replit.app`

3. **Update frontend configuration**
   ```bash
   # In your GitHub Pages environment
   VITE_API_BASE_URL=https://your-replit-app.replit.app
   ```

**Benefits:**
- ✅ Fast static hosting on GitHub
- ✅ Email notifications to shanker87@gmail.com work perfectly
- ✅ No changes to your current backend code
- ✅ Professional setup with separate concerns

## Option 2: Use Static Form Services

### Formspree (Easy Setup)
1. Sign up at [formspree.io](https://formspree.io)
2. Replace booking form action with Formspree endpoint
3. Automatically forwards to shanker87@gmail.com

```html
<form action="https://formspree.io/f/YOUR_ID" method="POST">
  <!-- Your booking form fields -->
</form>
```

### EmailJS (Client-Side)
1. Sign up at [emailjs.com](https://www.emailjs.com)
2. Configure email templates
3. Send emails directly from browser

```javascript
// Replace your current booking submission
emailjs.send('service_id', 'template_id', {
  to_email: 'shanker87@gmail.com',
  booking_details: bookingData
});
```

### Netlify Forms (If you switch to Netlify)
1. Host on Netlify instead of GitHub Pages
2. Add `netlify` attribute to forms
3. Automatic email notifications

## Option 3: Serverless Functions

### Vercel Functions
```javascript
// api/booking.js
export default async function handler(req, res) {
  // Your SendGrid code here
  // Sends emails to shanker87@gmail.com
}
```

### Netlify Functions
```javascript
// netlify/functions/booking.js
exports.handler = async (event, context) => {
  // Your email logic here
}
```

## Recommended Setup Steps

### Step 1: Prepare for GitHub Pages
```bash
# Build your static site
npm run build

# Your dist folder contains everything for GitHub Pages
```

### Step 2: Deploy Backend to Replit
1. Keep your current Replit setup running
2. Note your Replit app URL: `https://your-app.replit.app`
3. Ensure CORS is configured for your GitHub Pages domain

### Step 3: Update Frontend Configuration
Create `.env.production`:
```bash
VITE_API_BASE_URL=https://your-replit-app.replit.app
```

### Step 4: Deploy to GitHub Pages
1. Create GitHub repository
2. Upload your `dist` folder contents
3. Enable GitHub Pages in repository settings
4. Your site will be available at `https://username.github.io/repository-name`

## Email Flow with Hybrid Setup

```
User submits booking on GitHub Pages
       ↓
JavaScript calls Replit API
       ↓
Replit backend processes booking
       ↓
SendGrid sends emails to:
- Customer email
- shanker87@gmail.com
```

## Testing Your Setup

1. **Local testing**: Verify emails work on Replit
2. **CORS setup**: Ensure your GitHub domain is allowed
3. **Environment variables**: Confirm API URL is correct
4. **Email verification**: Test booking flow end-to-end

## Alternative: Full Static Solution

If you prefer no backend at all:

1. **Use Typeform or Google Forms** for bookings
2. **Set up email notifications** in form settings
3. **Embed forms** in your site
4. **Forward submissions** to shanker87@gmail.com automatically

## Cost Comparison

- **GitHub Pages**: Free
- **Replit backend**: Free tier available
- **Formspree**: Free for 50 submissions/month
- **EmailJS**: Free for 200 emails/month
- **Netlify/Vercel**: Free tiers available

## Recommendation

For your use case, I recommend the **hybrid approach**:
- GitHub Pages for fast, free static hosting
- Keep your current Replit backend for reliable email notifications
- Minimal code changes required
- Professional, scalable setup

This ensures shanker87@gmail.com receives all booking notifications reliably while giving you the benefits of GitHub's hosting infrastructure.