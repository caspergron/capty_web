# Firebase CLI Setup Instructions

To deploy your Cloud Functions, you'll need to set up the Firebase CLI. Follow these steps:

## 1. Install the Firebase CLI

If you haven't already installed the Firebase CLI, you can do so with npm:

```bash
npm install -g firebase-tools
```

## 2. Log in to Firebase

```bash
firebase login
```

This will open a browser window where you can log in with your Google account that has access to your Firebase project.

## 3. Initialize Firebase in your project

Navigate to your project directory and run:

```bash
firebase init
```

Follow the prompts:
- Select "Functions" when asked which features to set up
- Select your project ("capty-webpage")
- Choose JavaScript
- Say "Yes" to ESLint (recommended)
- Say "Yes" to installing dependencies

## 4. Set up functions directory

The initialization process will create a `functions` directory. Copy the `index.js` file I provided into this directory.

## 5. Install nodemailer in the functions directory

```bash
cd functions
npm install nodemailer
```

## 6. Update email configuration

Before deploying, update the `index.js` file with your actual email credentials:
- Replace `your-email@gmail.com` with your actual email
- Replace `your-app-password` with your Gmail App Password
  (Create one at https://myaccount.google.com/apppasswords)

## 7. Deploy your functions

```bash
firebase deploy --only functions
```

## 8. Deploy Firestore security rules

```bash
firebase deploy --only firestore:rules
```

After deployment, your Firebase Functions will be live and ready to handle email sending when users submit the notification form.