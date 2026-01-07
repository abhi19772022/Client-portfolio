# Email Setup Guide for Portfolio

## 🚀 Quick Setup (5 minutes)

### Step 1: Get Resend API Key

1. **Sign up at [Resend.com](https://resend.com)**
   - Free tier includes 3,000 emails/month
   - No credit card required

2. **Verify your email address**
   - Check your inbox for verification email
   - Click the verification link

3. **Create API Key**
   - Go to [API Keys](https://resend.com/api-keys)
   - Click "Create API Key"
   - Give it a name (e.g., "Portfolio Website")
   - Copy the API key (starts with `re_`)

### Step 2: Add API Key to Project

1. **Open `.env.local` file** (in project root)
2. **Replace** `your_api_key_here` with your actual API key:
   ```
   RESEND_API_KEY=re_your_actual_key_here
   ```
3. **Save the file**

### Step 3: Restart Dev Server

```bash
# Stop the current server (Ctrl+C)
# Then restart:
pnpm dev
```

## ✅ Testing

1. Open your portfolio in browser
2. Click on Messages app
3. Complete the inquiry form
4. Check console for confirmation logs
5. Check `abhimishra.db12@gmail.com` for the email

## 📧 Email Features

✨ **What's Included:**
- Professional HTML email template
- Automatic reply-to setup (clients can reply directly)
- Detailed project information
- Indian timezone timestamps
- Input validation (email & phone)
- Error handling & logging
- Fallback text version for email clients

## 🎨 Email Template Preview

The email includes:
- 🎬 Eye-catching header
- 👤 Client contact information
- 🎥 Complete project requirements
- ⏱️ Submission timestamp
- 📱 Mobile-responsive design

## 🔧 Troubleshooting

### Email not received?

1. **Check API key is set:**
   ```bash
   # In terminal
   echo $env:RESEND_API_KEY  # Windows PowerShell
   ```

2. **Check server logs:**
   - Look for `✅ Email sent successfully` in terminal
   - Or `❌ Error` messages

3. **Check spam folder**
   - Emails from new domains may go to spam initially

4. **Verify API key:**
   - Log in to Resend dashboard
   - Check API key status
   - Verify it's not disabled

### Common Issues

❌ **"Email service not configured"**
- API key missing in `.env.local`
- Restart dev server after adding key

❌ **"Valid email is required"**
- Form validation failed
- Check email format in iMessage component

❌ **Network error**
- Check internet connection
- Verify API endpoint is accessible

## 🚀 Production Setup

### For Custom Domain (Optional)

1. **Add your domain in Resend:**
   - Go to [Domains](https://resend.com/domains)
   - Click "Add Domain"
   - Follow DNS setup instructions

2. **Update email sender:**
   In `app/api/send-inquiry/route.ts`, change:
   ```typescript
   from: 'Himanshu Portfolio <noreply@yourdomain.com>',
   ```

3. **Add to Vercel/Production:**
   ```bash
   # Vercel
   vercel env add RESEND_API_KEY
   
   # Or in Vercel dashboard:
   Settings → Environment Variables → Add
   ```

## 📊 Monitoring

### View Sent Emails:
- [Resend Dashboard](https://resend.com/emails)
- See delivery status
- Check open rates (optional)
- Debug failed emails

## 💡 Tips

- Free tier is perfect for portfolio sites
- Emails are sent instantly (< 1 second)
- Resend provides excellent deliverability
- No IP warming needed
- Professional email infrastructure

## 🆘 Support

- **Resend Docs:** https://resend.com/docs
- **Resend Discord:** https://resend.com/discord
- **API Status:** https://status.resend.com

---

**All set!** 🎉 Your portfolio will now send professional email notifications for every inquiry.
