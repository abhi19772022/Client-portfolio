# ✅ Email Setup Checklist

Complete these steps to get emails working:

## Step 1: Get Resend Account
- [ ] Go to https://resend.com
- [ ] Click "Sign Up"
- [ ] Enter your email
- [ ] Verify email (check inbox)
- [ ] Log in to dashboard

## Step 2: Create API Key
- [ ] Click "API Keys" in sidebar
- [ ] Click "Create API Key"
- [ ] Name it: "Portfolio Website"
- [ ] Copy the key (starts with `re_`)
- [ ] Keep it safe (you'll need it next)

## Step 3: Configure Project
- [ ] Open file: `.env.local`
- [ ] Find line: `RESEND_API_KEY=your_api_key_here`
- [ ] Replace `your_api_key_here` with your actual key
- [ ] Save the file

## Step 4: Restart Server
- [ ] Stop current dev server (Ctrl+C in terminal)
- [ ] Run: `pnpm dev`
- [ ] Wait for server to start
- [ ] Server should be running on http://localhost:3000

## Step 5: Test It
- [ ] Open portfolio in browser
- [ ] Click on Messages app icon
- [ ] Fill out the inquiry form with test data
- [ ] Submit the form
- [ ] Check terminal for success message
- [ ] Check abhimishra.db12@gmail.com for email

## Step 6: Verify Success
Check for these indicators:

### In Terminal:
- [ ] See: `✅ Email sent successfully`
- [ ] See: Email ID in logs

### In Browser Console (F12):
- [ ] See: `{ success: true }`
- [ ] No error messages

### In Email:
- [ ] Received email at abhimishra.db12@gmail.com
- [ ] Email looks professional
- [ ] Contains all client details
- [ ] Can reply directly to client

## Optional: Production Setup (Later)

### For Vercel Deployment:
- [ ] Go to Vercel dashboard
- [ ] Select your project
- [ ] Go to Settings → Environment Variables
- [ ] Add new variable:
  - Name: `RESEND_API_KEY`
  - Value: Your Resend API key
- [ ] Redeploy the project

### For Custom Domain (Optional):
- [ ] Go to Resend dashboard
- [ ] Click "Domains"
- [ ] Add your domain
- [ ] Follow DNS setup instructions
- [ ] Update `from` address in code

---

## 🎉 You're Done!

When all boxes are checked, your email system is live!

Every inquiry submitted through your portfolio will be sent to:
📧 abhimishra.db12@gmail.com

## Need Help?

- 📖 Read: `EMAIL_SETUP.md` for detailed instructions
- 📖 Read: `SETUP_COMPLETE.md` for full documentation
- 📖 Read: `QUICK_REFERENCE.txt` for quick tips
- 🧪 Run: `node test-email.js` to test API
- 🆘 Visit: https://resend.com/docs for API docs

---

**Estimated Time:** 5 minutes
**Difficulty:** Easy ⭐
**Cost:** Free forever (3,000 emails/month)

Happy emailing! 🚀
