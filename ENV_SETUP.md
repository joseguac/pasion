# Email Configuration Setup

To enable the contact form email functionality, you need to create a `.env.local` file in the root directory with the following variables:

## Create `.env.local` file

Create a file named `.env.local` in the root of your project (`/Users/josetorres/dev/pasion/.env.local`) with these variables:

```env
# Email Configuration (PrivateEmail SMTP)
EMAIL_HOST=mail.privateemail.com
EMAIL_PORT=465
EMAIL_SECURE=true
EMAIL_FROM=jose.torres@verteks.ai
EMAIL_PASSWORD=your-account-password-here
EMAIL_TO=jtorresuci@gmail.com
```

## PrivateEmail Setup (CURRENT CONFIGURATION)

You're using PrivateEmail for jose.torres@verteks.ai:

1. Use your **regular email account password** for `EMAIL_PASSWORD`
2. The settings are already configured above for PrivateEmail
3. No app-specific password needed (unlike Gmail)

**Your Settings:**
- Server: `mail.privateemail.com`
- Port: `465` (SSL/TLS)
- Username: `jose.torres@verteks.ai`
- Password: Your PrivateEmail account password

## Alternative: Gmail Setup

If you switch to Gmail, you would need to create an **App Password**:

1. Go to your Google Account settings: https://myaccount.google.com/
2. Navigate to **Security**
3. Enable **2-Step Verification** (if not already enabled)
4. Under "2-Step Verification", find **App passwords**
5. Create a new app password for "Mail"
6. Copy the generated 16-character password
7. Use this password for `EMAIL_PASSWORD` in your `.env.local` file
8. Change HOST to `smtp.gmail.com`, PORT to `587`, SECURE to `false`

## Testing

Once configured:
1. Restart your development server (`npm run dev`)
2. Open the website
3. Click the message icon
4. Fill out and submit the contact form
5. Check the inbox for jtorresuci@gmail.com

## Security Notes

- Never commit `.env.local` to version control (it's already in .gitignore)
- Use app-specific passwords, not your main account password
- Keep your credentials secure

