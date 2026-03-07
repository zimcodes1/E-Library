import { Link } from 'react-router-dom';

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms and Conditions</h1>
        <p className="text-sm text-gray-600 mb-8">Last Updated: {new Date().toLocaleDateString()}</p>

        <div className="space-y-6 text-gray-700">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">1. Acceptance of Terms</h2>
            <p>By accessing and using Libronet, you accept and agree to be bound by these Terms and Conditions. If you do not agree, please do not use our platform.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">2. User Accounts</h2>
            <p>You must create an account to access certain features. You are responsible for:</p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Maintaining the confidentiality of your account credentials</li>
              <li>All activities that occur under your account</li>
              <li>Providing accurate and current information</li>
              <li>Notifying us immediately of any unauthorized access</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">3. Content and Copyright</h2>
            <p className="mb-2">When uploading books or content to Libronet, you represent that:</p>
            <ul className="list-disc ml-6 space-y-1">
              <li>You own the rights or have permission to share the content</li>
              <li>The content does not infringe on any third-party rights</li>
              <li>You grant Libronet a non-exclusive license to host and distribute the content</li>
              <li>You will not upload copyrighted material without proper authorization</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">4. Prohibited Activities</h2>
            <p className="mb-2">Users must not:</p>
            <ul className="list-disc ml-6 space-y-1">
              <li>Upload malicious files or viruses</li>
              <li>Violate any applicable laws or regulations</li>
              <li>Harass, abuse, or harm other users</li>
              <li>Attempt to gain unauthorized access to the platform</li>
              <li>Use automated systems to scrape or download content in bulk</li>
              <li>Share or distribute copyrighted material illegally</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">5. Content Removal</h2>
            <p>We reserve the right to remove any content that violates these terms, infringes copyright, or is deemed inappropriate without prior notice.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">6. Privacy and Data</h2>
            <p>Your use of Libronet is also governed by our Privacy Policy. We collect and process data as described in that policy.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">7. Disclaimer of Warranties</h2>
            <p>Libronet is provided "as is" without warranties of any kind. We do not guarantee:</p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Uninterrupted or error-free service</li>
              <li>Accuracy or reliability of content</li>
              <li>That the platform will meet your specific requirements</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">8. Limitation of Liability</h2>
            <p>To the maximum extent permitted by law, Libronet shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the platform.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">9. Termination</h2>
            <p>We may terminate or suspend your account at any time for violations of these terms. You may also delete your account at any time.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">10. Changes to Terms</h2>
            <p>We reserve the right to modify these terms at any time. Continued use of the platform after changes constitutes acceptance of the new terms.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">11. Governing Law</h2>
            <p>These terms are governed by applicable laws. Any disputes shall be resolved in the appropriate jurisdiction.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">12. Contact</h2>
            <p>For questions about these Terms and Conditions, please contact us through the platform's support channels.</p>
          </section>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <Link to="/" className="text-blue-600 hover:text-blue-800 font-medium">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
