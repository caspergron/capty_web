import React from 'react';
import Navigation from '../components/Navigation';
import BetaAnnouncement from '../components/BetaAnnouncement';

function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-primary-lightest">
      <Navigation />
      <BetaAnnouncement />
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm p-8 md:p-12">
            <h1 className="text-3xl font-bold text-primary mb-8">Terms and Conditions</h1>
            <p className="text-gray-600 mb-4">Effective Date: March 1, 2024</p>
            <p className="text-gray-600 mb-8">Last Updated: March 1, 2024</p>

            <div className="prose prose-lg max-w-none">
              <p className="mb-6">
                Welcome to Capty, a disc golf platform operated by ACEMAKERS DEVELOPMENT PTE. LTD ("Company," "we," "us," or "our"). By using Capty, you agree to abide by these Terms and Conditions.
              </p>
              <p className="mb-8">
                If you do not agree with these terms, please do not use the app.
              </p>

              <h2 className="text-2xl font-bold text-primary mt-8 mb-4">1. General Information</h2>
              <ul className="list-none space-y-2 mb-8">
                <li>Company Name: ACEMAKERS DEVELOPMENT PTE. LTD</li>
                <li>Address: 111 North Bridge Road, #20-05, Peninsula Plaza, Singapore 179098</li>
                <li>Registration Number (UEN): 202509691G</li>
                <li>Legal Contact Email: casper@acemakers.sg</li>
                <li>Jurisdiction: This agreement is governed by the laws of Singapore.</li>
              </ul>

              <h2 className="text-2xl font-bold text-primary mt-8 mb-4">2. User Accounts & Responsibilities</h2>
              
              <h3 className="text-xl font-semibold mb-4">2.1 Eligibility</h3>
              <ul className="list-disc pl-6 mb-6">
                <li>You must be at least 13 years old to use Capty.</li>
                <li>Users must verify their identity via phone number and OTP authentication.</li>
              </ul>

              <h3 className="text-xl font-semibold mb-4">2.2 User Conduct & Platform Rules</h3>
              <p className="mb-4">By using Capty, you agree not to:</p>
              <ul className="list-none space-y-2 mb-6">
                <li>✅ Provide false information when updating club or course data (multiple violations may lead to suspension).</li>
                <li>✅ Misuse the marketplace for fraudulent or misleading sales.</li>
                <li>✅ Scrape data from the website or app.</li>
                <li>✅ Fail to follow through on agreements with other Capty users.</li>
              </ul>
              
              <p className="mb-6 text-red-600">
                🚫 Hate speech, discrimination, harassment, or offensive behavior based on culture, gender, sexual orientation, or religion is strictly prohibited.
              </p>

              <h3 className="text-xl font-semibold mb-4">2.3 Account Suspension & Termination</h3>
              <p className="mb-6">
                Capty reserves the right to suspend or terminate accounts if users violate these terms, engage in fraudulent behavior, or remain inactive for extended periods.
              </p>

              <h3 className="text-xl font-semibold mb-4">2.4 Account Recovery</h3>
              <p className="mb-6">
                If you lose access to your account, you must contact support for assistance.
              </p>

              <h3 className="text-xl font-semibold mb-4">2.5 Account Deletion</h3>
              <p className="mb-4">Users can delete their accounts by:</p>
              <ul className="list-disc pl-6 mb-8">
                <li>Using the web admin panel</li>
                <li>Requesting deletion via support at casper@acemakers.sg</li>
              </ul>

              <h2 className="text-2xl font-bold text-primary mt-8 mb-4">3. Payments & Transactions (Marketplace Rules)</h2>
              
              <h3 className="text-xl font-semibold mb-4">3.1 Payment Processing</h3>
              <ul className="list-disc pl-6 mb-6">
                <li>Capty will process transactions via Mangopay, a third-party payment provider.</li>
                <li>Capty will introduce a 10% transaction fee starting January 2026, once payment and shipping options are enabled.</li>
              </ul>

              <h3 className="text-xl font-semibold mb-4">3.2 Marketplace Responsibility</h3>
              <ul className="list-disc pl-6 mb-6">
                <li>Capty does not act as an intermediary in marketplace transactions.</li>
                <li>All disputes are between buyers and sellers, and Capty is not responsible for resolving them.</li>
              </ul>

              <h3 className="text-xl font-semibold mb-4">3.3 Buyer Protection & Refunds</h3>
              <p className="mb-4">If a user receives a wrong disc, they must resolve the issue directly with the seller.</p>
              <p className="mb-4">If a buyer does not receive their disc, Capty provides buyer protection up to $30 USD (200 DKK) under these conditions:</p>
              <ul className="list-disc pl-6 mb-8">
                <li>The buyer must provide official documentation from the shipping company proving the package was lost.</li>
                <li>Capty will process the refund under its 10% fee coverage policy.</li>
              </ul>

              <h2 className="text-2xl font-bold text-primary mt-8 mb-4">4. User-Generated Content & Community Guidelines</h2>
              
              <h3 className="text-xl font-semibold mb-4">4.1 Allowed Content</h3>
              <p className="mb-4">Users may upload:</p>
              <ul className="list-none space-y-2 mb-6">
                <li>✅ Disc sales ads, marketplace listings</li>
                <li>✅ Messages, comments, and reviews</li>
                <li>✅ Leaderboard & performance data</li>
              </ul>

              <h3 className="text-xl font-semibold mb-4">4.2 Restricted Content</h3>
              <p className="mb-6 text-red-600">
                🚫 Hate speech, illegal sales, spam, offensive images, or any form of harassment is strictly prohibited.
              </p>

              <h3 className="text-xl font-semibold mb-4">4.3 Ownership of Uploaded Content</h3>
              <ul className="list-disc pl-6 mb-6">
                <li>Capty owns all content uploaded to the platform.</li>
                <li>Users do not retain ownership of their listings, reviews, or messages.</li>
                <li>Capty does not have permission to use uploaded images for marketing purposes.</li>
              </ul>

              <h3 className="text-xl font-semibold mb-4">4.4 Content Removal</h3>
              <p className="mb-8">
                Capty reserves the right to remove any content that violates these terms, contains misleading information, or disrupts the platform's integrity.
              </p>

              <h2 className="text-2xl font-bold text-primary mt-8 mb-4">5. Disclaimers & Liabilities</h2>
              
              <h3 className="text-xl font-semibold mb-4">5.1 Liability Disclaimer</h3>
              <ul className="list-disc pl-6 mb-6">
                <li>Capty is not responsible for damages caused by incorrect data, disputes between users, or technical errors.</li>
                <li>Marketplace listings and leaderboard rankings are provided "as-is", and Capty cannot guarantee their accuracy.</li>
              </ul>

              <h3 className="text-xl font-semibold mb-4">5.2 Technical Support</h3>
              <p className="mb-4">Users experiencing bugs, crashes, or account issues can contact support:</p>
              <ul className="list-disc pl-6 mb-8">
                <li>Via the Capty app</li>
                <li>Through the web admin panel</li>
                <li>On the Capty website</li>
              </ul>

              <h2 className="text-2xl font-bold text-primary mt-8 mb-4">6. Service Availability & Modifications</h2>
              
              <h3 className="text-xl font-semibold mb-4">6.1 Right to Modify or Discontinue</h3>
              <ul className="list-disc pl-6 mb-8">
                <li>Capty reserves the right to modify, suspend, or shut down any part of the platform at any time.</li>
                <li>Capty is not liable for any damages resulting from service downtime or disruptions.</li>
              </ul>

              <h2 className="text-2xl font-bold text-primary mt-8 mb-4">7. Changes to the Terms & Conditions</h2>
              <p className="mb-4">Any changes to these Terms will be announced via:</p>
              <ul className="list-disc pl-6 mb-6">
                <li>Website notifications</li>
                <li>In-app alerts</li>
              </ul>
              <p className="mb-8">Continued use of Capty after updates means you accept the new terms.</p>

              <h2 className="text-2xl font-bold text-primary mt-8 mb-4">8. Contact & Legal Inquiries</h2>
              <p className="mb-4">For any legal questions or disputes, contact us at:</p>
              <ul className="list-none mb-8 space-y-2">
                <li>📧 Email: casper@acemakers.sg</li>
                <li>📍 Company: ACEMAKERS DEVELOPMENT PTE. LTD</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TermsAndConditions;