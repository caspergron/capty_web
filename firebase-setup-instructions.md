# Firebase Setup Instructions

Follow these steps to set up Firebase for the Capty notification system:

## 1. Create a Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter a name for your project (e.g., "Capty Landing")
4. Follow the setup wizard to create your project

## 2. Set Up Firebase in Your App

1. In the Firebase console, click on the gear icon next to "Project Overview" and select "Project settings"
2. Scroll down to "Your apps" section and click the web icon (</>) to add a web app
3. Register your app with a nickname (e.g., "Capty Landing Web")
4. Copy the Firebase configuration object and update your environment variables in the `.env` file with these values

## 3. Set Up Firestore Database

1. In the Firebase console, go to "Firestore Database"
2. Click "Create database"
3. Start in production mode
4. Choose a location close to your target audience
5. Create the following collection:
   - `notificationRequests`

## 4. Set Up Firebase Functions

1. Install the Firebase CLI:
   ```
   npm install -g firebase-tools
   ```

2. Log in to Firebase:
   ```
   firebase login
   ```

3. Initialize Firebase in your project directory:
   ```
   firebase init
   ```
   - Select "Functions"
   - Choose your project
   - Select JavaScript or TypeScript
   - Enable ESLint (optional)
   - Install dependencies when prompted

4. Create the function to send emails:

Create a file `functions/index.js` (or `functions/src/index.ts` for TypeScript) with:

```javascript
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

admin.initializeApp();

// Configure nodemailer with your email service (Gmail, SendGrid, etc.)
// For Gmail, you'll need to set up an App Password: https://support.google.com/accounts/answer/185833
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-app-password'
  }
});

exports.sendLaunchNotificationEmail = functions.https.onCall(async (data, context) => {
  const { name, email, country } = data;
  
  if (!name || !email || !country) {
    throw new functions.https.HttpsError(
      'invalid-argument', 
      'Missing required fields'
    );
  }
  
  // Email to yourself with the notification request
  const mailOptions = {
    from: 'Capty Launch Notifications <your-email@gmail.com>',
    to: 'coka7913@gmail.com', // Your email where you want to receive notifications
    subject: 'New Launch Notification Request',
    html: `
      <h2>New Launch Notification Request</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Country:</strong> ${country}</p>
      <p><em>Submitted on: ${new Date().toLocaleString()}</em></p>
    `
  };
  
  try {
    await transporter.sendMail(mailOptions);
    
    // Optional: Send confirmation email to the user
    const userMailOptions = {
      from: 'Capty <your-email@gmail.com>',
      to: email,
      subject: 'Your Capty Launch Notification is Confirmed',
      html: `
        <h2>Thanks for your interest in Capty!</h2>
        <p>Hello ${name},</p>
        <p>We've received your request to be notified when Capty launches in May 2025.</p>
        <p>We'll send you an email as soon as we're live!</p>
        <p>The Capty Team</p>
      `
    };
    
    await transporter.sendMail(userMailOptions);
    
    return { success: true, message: 'Notification emails sent successfully' };
  } catch (error) {
    console.error('Error sending email:', error);
    throw new functions.https.HttpsError(
      'internal', 
      'Error sending notification email',
      error.message
    );
  }
});

// Optional: Also trigger on Firestore write
exports.sendEmailOnNewRequest = functions.firestore
  .document('notificationRequests/{requestId}')
  .onCreate(async (snap, context) => {
    const data = snap.data();
    
    // Same email sending logic as above
    // This is a backup in case the HTTP function fails
    // ...
  });
```

5. Install nodemailer in the functions directory:
```
cd functions
npm install nodemailer
```

6. Deploy the functions:
```
firebase deploy --only functions
```

## 5. Update Environment Variables

1. Create a `.env` file in your project root based on the `.env.example` template
2. Add your Firebase configuration values
3. Restart your development server

## 6. Testing

1. Fill out the notification form on your website
2. Check that the data appears in your Firestore database
3. Verify that you receive the email notification