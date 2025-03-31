import React from 'react';
import Navigation from '../components/Navigation';
import BetaAnnouncement from '../components/BetaAnnouncement';

function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-primary-lightest">
      <Navigation />
      <BetaAnnouncement />
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm p-8 md:p-12">
            <h1 className="text-3xl font-bold text-primary mb-8">Privacy Policy</h1>
            <p className="text-gray-600 mb-4">Effective Date: March 1, 2024</p>
            <p className="text-gray-600 mb-8">Last Updated: March 1, 2024</p>

            <div className="prose prose-lg max-w-none">
              <p className="mb-6">
                ACEMAKERS DEVELOPMENT PTE. LTD ("Company," "we," "us," or "our") operates Capty, a disc golf platform that helps users track their progress, connect with players, and buy/sell discs. This Privacy Policy explains how we collect, use, and protect your data.
              </p>
              <p className="mb-8">
                By using Capty, you agree to this Privacy Policy. If you do not agree, please do not use the app.
              </p>

              <h2 className="text-2xl font-bold text-primary mt-8 mb-4">1. General Information</h2>
              <ul className="list-none space-y-2 mb-8">
                <li>Company Name: ACEMAKERS DEVELOPMENT PTE. LTD</li>
                <li>Address: 111 North Bridge Road, #20-05, Peninsula Plaza, Singapore 179098</li>
                <li>Registration Number (UEN): 202509691G</li>
                <li>Contact Email: casper@acemakers.sg</li>
                <li>Data Protection Officer: Casper Gronbjerg</li>
              </ul>

              <h2 className="text-2xl font-bold text-primary mt-8 mb-4">2. Data Collection & Usage</h2>
              <h3 className="text-xl font-semibold mb-4">Personal Data We Collect</h3>
              <p className="mb-4">When you use Capty, we may collect the following personal data:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>User Account Information: Name, email, phone number, profile image</li>
                <li>Performance & Gameplay Data: PDGA number, PDGA rating, tournament participation</li>
                <li>Marketplace Data: Disc listings, descriptions, images uploaded for sales ads</li>
                <li>Club & Social Data: Club memberships, event participation, user interactions</li>
                <li>Login Credentials: Authentication via Google, Apple, or other login methods</li>
                <li>Location Data: Real-time GPS-based location used for course recommendations and local player connections (we do not store this data)</li>
              </ul>
              <p className="mb-6">We do not collect health, fitness, or biometric data.</p>

              <h3 className="text-xl font-semibold mb-4">Financial Data (Future Implementation)</h3>
              <p className="mb-6">
                In the future, Capty will introduce features that allow users to manage payments and credits between buyers and sellers in the marketplace. When implemented, this section will be updated to reflect how payment details are processed and stored.
              </p>

              <h3 className="text-xl font-semibold mb-4">Third-Party Services We Integrate With</h3>
              <p className="mb-4">Capty integrates with the following services to enhance the user experience:</p>
              <ul className="list-disc pl-6 mb-8 space-y-2">
                <li>Twilio (for SMS verification and notifications)</li>
                <li>Firebase (for database storage and user authentication)</li>
                <li>Google & Apple (for single sign-on login methods)</li>
                <li>Shopify (for webshop integration in the disc marketplace)</li>
              </ul>

              <h2 className="text-2xl font-bold text-primary mt-8 mb-4">3. Data Storage & Security</h2>
              <h3 className="text-xl font-semibold mb-4">Where We Store Your Data</h3>
              <p className="mb-6">User data is securely stored on Digital Ocean servers with industry-standard encryption.</p>

              <h3 className="text-xl font-semibold mb-4">How Long We Retain Your Data</h3>
              <p className="mb-6">We retain user data until the user chooses to delete it.</p>

              <h3 className="text-xl font-semibold mb-4">How We Protect Your Data</h3>
              <p className="mb-4">We follow industry best practices, including:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Encryption: Data is encrypted both in transit and at rest.</li>
                <li>Access Control: Only authorized personnel have access to sensitive data.</li>
                <li>Monitoring: We continuously monitor for security threats and vulnerabilities.</li>
              </ul>

              <h3 className="text-xl font-semibold mb-4">How You Can Delete Your Data</h3>
              <p className="mb-4">You have two ways to delete your data:</p>
              <ul className="list-disc pl-6 mb-8 space-y-2">
                <li>Request via Support: Email us at casper@acemakers.sg to request deletion.</li>
                <li>Self-Deletion via Web Admin: Log into the Capty web admin and initiate data deletion manually.</li>
              </ul>

              <h2 className="text-2xl font-bold text-primary mt-8 mb-4">4. User Permissions & Third-Party Sharing</h2>
              <h3 className="text-xl font-semibold mb-4">Who We Share Data With</h3>
              <p className="mb-6">
                Capty does not sell or share user data with third-party advertisers. However, we do retrieve public PDGA data to allow users to compare rankings and track performance.
              </p>

              <h3 className="text-xl font-semibold mb-4">Personalized Ads</h3>
              <p className="mb-6">We do not display personalized ads based on user data.</p>

              <h3 className="text-xl font-semibold mb-4">Permissions Required</h3>
              <p className="mb-4">To provide full functionality, Capty requests the following permissions:</p>
              <ul className="list-none mb-8 space-y-2">
                <li>📍 Location Data – Used in real-time for course recommendations and finding nearby players. (Not stored)</li>
                <li>📸 Camera & Photos – Used to upload images of discs when creating marketplace listings.</li>
              </ul>

              <h2 className="text-2xl font-bold text-primary mt-8 mb-4">5. User Rights & Compliance</h2>
              <h3 className="text-xl font-semibold mb-4">Your Rights Under GDPR (Europe)</h3>
              <p className="mb-4">Capty complies with GDPR, giving you the right to:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Access the personal data we store about you</li>
                <li>Correct inaccurate or outdated information</li>
                <li>Request deletion of your account and associated data</li>
              </ul>

              <h3 className="text-xl font-semibold mb-4">Your Rights Under CCPA (California)</h3>
              <p className="mb-6">Since Capty does not sell user data, there is no need for an opt-out mechanism under CCPA.</p>

              <h3 className="text-xl font-semibold mb-4">Children's Privacy (COPPA Compliance)</h3>
              <p className="mb-8">Capty is not designed for children under 13, and we do not knowingly collect data from minors.</p>

              <h2 className="text-2xl font-bold text-primary mt-8 mb-4">6. Privacy Policy Updates & Notifications</h2>
              <p className="mb-4">If we make any significant changes to this Privacy Policy, we will notify users by:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Posting an update on our website</li>
                <li>Sending an in-app notification</li>
              </ul>
              <p className="mb-8">We encourage users to review this policy periodically.</p>

              <h2 className="text-2xl font-bold text-primary mt-8 mb-4">7. Contact Information for Privacy Concerns</h2>
              <p className="mb-4">If you have any questions or concerns regarding this Privacy Policy, you may contact us at:</p>
              <ul className="list-none mb-8 space-y-2">
                <li>📧 Email: casper@acemakers.sg</li>
                <li>👤 Data Protection Officer: Casper Gronbjerg</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;