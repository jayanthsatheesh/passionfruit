# Static Hosting Guide - PassionFruit

Your PassionFruit rental platform is now ready for static hosting! Here's everything you need to deploy it without any backend servers.

## ✅ What's Now Working Statically

- **Product Management**: CSV-based products (easy Google Sheets editing)
- **Email Notifications**: EmailJS sends to shanker87@gmail.com
- **Booking System**: Fully client-side with localStorage
- **Contact Forms**: Direct email delivery
- **User Authentication**: localStorage-based sessions

## 🚀 Quick Deploy Options

### Option 1: GitHub Pages (Recommended)
**Free hosting with CDN**

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Static PassionFruit site"
   git remote add origin https://github.com/username/passionfruit-rental
   git push -u origin main
   ```

2. **Enable GitHub Pages**
   - Go to repository Settings > Pages
   - Source: "Deploy from a branch"
   - Branch: main / docs or main / root
   - Your site will be live at: `https://username.github.io/passionfruit-rental`

3. **Add Environment Variables**
   - Go to Settings > Secrets and variables > Actions
   - Add your EmailJS configuration:
     ```
     VITE_EMAILJS_SERVICE_ID=service_xyz123
     VITE_EMAILJS_TEMPLATE_ID=template_abc456
     VITE_EMAILJS_PUBLIC_KEY=your_public_key
     ```

### Option 2: Netlify
**Easy drag-and-drop deployment**

1. **Build the site**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Drag your `dist` folder to deploy
   - Or connect your GitHub repository

3. **Add Environment Variables**
   - Site settings > Environment variables
   - Add your EmailJS keys

### Option 3: Vercel
**Optimized for React apps**

1. **Connect Repository**
   - Import project from GitHub at [vercel.com](https://vercel.com)
   - Auto-detects Vite configuration

2. **Configure Environment**
   - Add EmailJS variables in project settings
   - Deploy automatically on commits

## 📧 Email Setup (Required)

Follow the detailed setup in `docs/EMAILJS_SETUP.md`:

1. Create EmailJS account
2. Configure Gmail service
3. Set up booking and contact templates
4. Get your API keys
5. Test email delivery

**Result**: All booking confirmations and contact forms will be sent to shanker87@gmail.com

## 💰 Hosting Costs

| Platform | Cost | Features |
|----------|------|----------|
| GitHub Pages | Free | Unlimited sites, HTTPS, CDN |
| Netlify | Free | Form handling, analytics |
| Vercel | Free | Serverless functions, analytics |
| EmailJS | Free | 200 emails/month |

**Total monthly cost: $0** (vs current $10+ with backend)

## 📊 Product Management

Your products are now managed via `public/products.csv`:

1. **Edit with Google Sheets**
   - Upload CSV to Google Sheets
   - Edit products, prices, descriptions
   - Download as CSV and replace file

2. **Supported Fields**
   ```csv
   id,name,description,category,price,images,features,included
   ```

3. **Deploy Updates**
   - Replace `public/products.csv`
   - Push to GitHub
   - Site updates automatically

## 🔧 Build Process

Your static build includes:

```bash
npm run build
```

Outputs to `dist/` folder containing:
- Optimized React app
- CSV product data
- Static assets
- Environment variables (encrypted)

## 🏃‍♂️ Local Development

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env
# Add your EmailJS keys to .env

# Start development server
npm run dev
```

## 🔍 Testing Static Features

### Test Product Loading
1. Products should load from CSV
2. Check browser console for "Loaded X products from CSV"
3. Verify fallback to JSON if CSV fails

### Test Email Notifications
1. Complete a booking flow
2. Check emails arrive at shanker87@gmail.com
3. Verify customer confirmation emails

### Test Contact Form
1. Submit contact form
2. Verify email delivery to admin

## 🚨 Troubleshooting

### Products not loading?
- Check `public/products.csv` exists
- Verify CSV format is correct
- Check browser console for errors

### Emails not sending?
- Verify EmailJS keys in environment
- Check EmailJS dashboard for service status
- Look for errors in browser console

### Site not deploying?
- Check build errors in hosting platform logs
- Verify all dependencies are in package.json
- Ensure environment variables are set

## 🎯 Next Steps

1. **Set up EmailJS account** (15 minutes)
2. **Choose hosting platform** (GitHub Pages recommended)
3. **Deploy your static site** (5 minutes)
4. **Test booking and contact flows** (10 minutes)
5. **You're live!** 🎉

## 📈 Scaling Options

When you outgrow static hosting:

1. **More emails**: Upgrade EmailJS ($15/month for 1000 emails)
2. **Analytics**: Add Google Analytics or Plausible
3. **Payment processing**: Add Stripe Checkout (still works statically)
4. **Database**: Consider Supabase or Firebase for advanced features

Your PassionFruit rental platform is now completely self-contained and ready for the web!