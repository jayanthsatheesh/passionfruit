# GitHub Pages Deployment Guide

## Quick Setup (5 minutes)

### 1. Download Your Project
- Download project files from Replit
- **Skip the `attached_assets` folder** (contains large demo files that cause GitHub upload errors)
- See `docs/FILES_TO_UPLOAD.md` for the complete list of files to include/exclude
- The GitHub workflow will handle building automatically

### 2. Create GitHub Repository
1. Create a new repository on GitHub
2. Upload all your project files
3. Go to **Settings** → **Pages**
4. Set source to "GitHub Actions"

### 3. Add EmailJS Credentials as Secrets
1. Go to **Settings** → **Secrets and Variables** → **Actions**
2. Click "New repository secret" and add these 4 secrets:

| Secret Name | Description | Where to Find |
|-------------|-------------|---------------|
| `VITE_EMAILJS_SERVICE_ID` | Your EmailJS service ID | EmailJS Dashboard → Email Services |
| `VITE_EMAILJS_TEMPLATE_ID` | Booking confirmation template | EmailJS Dashboard → Email Templates |
| `VITE_EMAILJS_CONTACT_TEMPLATE_ID` | Contact form template | EmailJS Dashboard → Email Templates |
| `VITE_EMAILJS_PUBLIC_KEY` | Your public key | EmailJS Dashboard → Account |

### 4. Deploy
- Push your files to the repository
- GitHub Actions will automatically build and deploy
- Your site will be available at `https://yourusername.github.io/repository-name`

## EmailJS Setup Required

Before deployment, set up EmailJS:

1. **Sign up** at [emailjs.com](https://emailjs.com) (free tier: 200 emails/month)
2. **Create email service** (Gmail, Outlook, etc.)
3. **Create templates**:
   - One for booking confirmations (admin notifications)
   - One for contact forms and product requests
4. **Configure recipient**: All emails go to `shanker87@gmail.com`

Detailed EmailJS setup instructions: `docs/EMAILJS_SETUP.md`

## What Happens After Deployment

✅ **Fully static site** - No server costs
✅ **Automatic email notifications** to shanker87@gmail.com for:
- Booking confirmations
- Contact form submissions  
- Product requests (for items not in catalog)
✅ **Customer confirmations** sent automatically
✅ **Mobile numbers collected** in all forms
✅ **Product request system** for expanding inventory

**Total monthly cost: $0** (EmailJS free tier + GitHub Pages free hosting)

## Troubleshooting

**Emails not working?**
- Check that all 4 secrets are added correctly
- Verify EmailJS service and templates are configured
- Test templates in EmailJS dashboard first

**Site not building?**
- Check GitHub Actions tab for build errors
- Ensure all files were uploaded from Replit
- Verify no syntax errors in the code

**Need help?**
- Check the build logs in GitHub Actions
- All documentation is in the `docs/` folder