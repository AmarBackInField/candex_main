# CandexAI Backend Setup Guide

This guide will help you set up the backend API for handling form submissions and sending emails to lovjeet_s@me.iitr.ac.in.

## Prerequisites

- Node.js installed on your system
- A Gmail account (or other email provider) for sending emails

## Backend Setup

### 1. Install Backend Dependencies

Run this command in your project root directory:

```bash
npm install --save-dev nodemon express cors nodemailer dotenv
```

Or use the provided package-backend.json:

```bash
cp package-backend.json package-backend.json.backup
npm install express cors nodemailer dotenv nodemon --save
```

### 2. Configure Email Settings

1. **For Gmail (Recommended):**
   - Go to your Google Account settings
   - Navigate to Security > 2-Step Verification (enable if not already)
   - Go to Security > App passwords
   - Generate an app password for "Mail"
   - Copy the generated 16-character password

2. **Update the .env file:**
   ```
   EMAIL_USER=your-gmail@gmail.com
   EMAIL_PASS=your-16-character-app-password
   PORT=3001
   ```

### 3. Start the Backend Server

```bash
node server.js
```

Or for development with auto-restart:

```bash
npx nodemon server.js
```

The server will run on `http://localhost:3001`

### 4. Update Frontend Configuration

The forms are already configured to send requests to:
- `/api/join-waitlist` - For waitlist submissions
- `/api/book-demo` - For demo booking requests

Make sure your frontend is running on a different port (e.g., 3000) than the backend (3001).

### 5. Test the Setup

1. Start both the backend server and your React frontend
2. Fill out either the waitlist or demo form
3. Check that:
   - Forms submit successfully
   - Admin receives notification at lovjeet_s@me.iitr.ac.in
   - Users receive confirmation emails
   - Console shows success messages

## Email Templates

The system sends beautifully designed HTML emails:

### For Waitlist:
- **Admin Email**: Notification with user details and registration info
- **User Email**: Welcome email with next steps and expectations

### For Demo Booking:
- **Admin Email**: Demo request with contact details and preferences
- **User Email**: Confirmation with what to expect and next steps

## Troubleshooting

### Common Issues:

1. **Email not sending:**
   - Check EMAIL_USER and EMAIL_PASS in .env
   - Make sure you're using an App Password for Gmail
   - Verify 2-Step Verification is enabled

2. **CORS errors:**
   - Ensure both frontend and backend are running
   - Check that ports don't conflict (frontend: 3000, backend: 3001)

3. **Form submission fails:**
   - Check backend console for error messages
   - Verify API endpoints match frontend fetch calls
   - Ensure server.js is running

### Alternative Email Providers:

If you prefer not to use Gmail, you can configure other providers:

```javascript
// For SendGrid
const transporter = nodemailer.createTransporter({
  service: 'SendGrid',
  auth: {
    user: 'apikey',
    pass: process.env.SENDGRID_API_KEY
  }
});

// For Outlook
const transporter = nodemailer.createTransporter({
  service: 'hotmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});
```

## Security Notes

- Never commit .env file to version control
- Use environment variables for sensitive data
- Consider using a dedicated email service for production
- Implement rate limiting for production use

## Production Deployment

For production deployment:

1. Use a proper hosting service (Heroku, Vercel, etc.)
2. Set environment variables in your hosting platform
3. Use a dedicated email service (SendGrid, Mailgun, etc.)
4. Implement proper error handling and logging
5. Add rate limiting and input validation

Your CandexAI email system is now ready! 🚀
