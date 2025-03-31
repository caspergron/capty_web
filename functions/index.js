const functions = require('firebase-functions/v2');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const cors = require('cors')({origin: true});

admin.initializeApp();

// Configure nodemailer with your email service
// For Gmail, you need to set up an App Password: https://support.google.com/accounts/answer/185833
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'coka7913@gmail.com', // REPLACE WITH YOUR EMAIL
    pass: 'dzvk mako hhnw lhdp'     // REPLACE WITH YOUR APP PASSWORD
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
    from: 'Capty Launch Notifications <coka7913@gmail.com>', // REPLACE WITH YOUR EMAIL
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
      from: 'Capty <coka7913@gmail.com>', // REPLACE WITH YOUR EMAIL
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

// New function to handle contact form submissions
exports.sendContactEmail = functions.https.onCall(async (data, context) => {
  const { name, email, message } = data;
  
  if (!name || !email || !message) {
    throw new functions.https.HttpsError(
      'invalid-argument', 
      'Missing required fields'
    );
  }
  
  // Email to yourself with the contact message
  const mailOptions = {
    from: 'Capty Contact Form <coka7913@gmail.com>', // REPLACE WITH YOUR EMAIL
    to: 'coka7913@gmail.com', // Your email where you want to receive contacts
    subject: 'New Contact Form Submission',
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px;">
        ${message.replace(/\n/g, '<br>')}
      </div>
      <p><em>Submitted on: ${new Date().toLocaleString()}</em></p>
    `
  };
  
  try {
    await transporter.sendMail(mailOptions);
    
    // Send confirmation email to the user
    const userMailOptions = {
      from: 'Capty <coka7913@gmail.com>', // REPLACE WITH YOUR EMAIL
      to: email,
      subject: 'Your message has been received',
      html: `
        <h2>Thanks for contacting Capty!</h2>
        <p>Hello ${name},</p>
        <p>We've received your message and will get back to you as soon as possible.</p>
        <p>The Capty Team</p>
      `
    };
    
    await transporter.sendMail(userMailOptions);
    
    return { success: true, message: 'Contact emails sent successfully' };
  } catch (error) {
    console.error('Error sending contact email:', error);
    throw new functions.https.HttpsError(
      'internal', 
      'Error sending contact email',
      error.message
    );
  }
});

// Trigger on new Firestore document creation
exports.sendEmailOnFirestoreWrite = functions.firestore
  .onDocumentCreated('notificationRequests/{requestId}', async (event) => {
    const snapshot = event.data;
    if (!snapshot) {
      console.log('No data associated with the event');
      return;
    }
    
    const data = snapshot.data();
    const { name, email, country } = data;
    
    if (!name || !email || !country) {
      console.error('Missing required fields in Firestore document');
      return;
    }
    
    // Configure email to yourself
    const mailOptions = {
      from: 'Capty Launch Notifications <coka7913@gmail.com>', // REPLACE WITH YOUR EMAIL
      to: 'coka7913@gmail.com', // Your email where you want to receive notifications
      subject: 'New Launch Notification Request (via Firestore)',
      html: `
        <h2>New Launch Notification Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Country:</strong> ${country}</p>
        <p><strong>Document ID:</strong> ${event.params.requestId}</p>
        <p><em>Submitted on: ${new Date().toLocaleString()}</em></p>
      `
    };
    
    try {
      await transporter.sendMail(mailOptions);
      console.log('Email notification sent successfully');
      return { success: true };
    } catch (error) {
      console.error('Error sending email notification:', error);
      return { success: false, error: error.message };
    }
  });

// Trigger on new contact message creation
exports.sendEmailOnContactMessageWrite = functions.firestore
  .onDocumentCreated('contactMessages/{messageId}', async (event) => {
    const snapshot = event.data;
    if (!snapshot) {
      console.log('No data associated with the event');
      return;
    }
    
    const data = snapshot.data();
    const { name, email, message } = data;
    
    if (!name || !email || !message) {
      console.error('Missing required fields in contact message document');
      return;
    }
    
    // Configure email to yourself
    const mailOptions = {
      from: 'Capty Contact Form <coka7913@gmail.com>', // REPLACE WITH YOUR EMAIL
      to: 'coka7913@gmail.com', // Your email where you want to receive contacts
      subject: 'New Contact Form Submission (via Firestore)',
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px;">
          ${message.replace(/\n/g, '<br>')}
        </div>
        <p><strong>Document ID:</strong> ${event.params.messageId}</p>
        <p><em>Submitted on: ${new Date().toLocaleString()}</em></p>
      `
    };
    
    try {
      await transporter.sendMail(mailOptions);
      console.log('Contact email notification sent successfully');
      return { success: true };
    } catch (error) {
      console.error('Error sending contact email notification:', error);
      return { success: false, error: error.message };
    }
  });