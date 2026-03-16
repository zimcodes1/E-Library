import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export default function TermsAndConditions() {
  useEffect(() => {
    document.title = 'Terms and Conditions | Libronet';
  }, []);

  return (
    <div className="min-h-screen bg-[#060410] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-500/20 rounded-full mb-6">
            <i className="fa fa-file-contract text-2xl text-purple-400"></i>
          </div>
          <h1 className="text-4xl font-bold text-gray-50 mb-4 font-[Super]">Terms and Conditions</h1>
          <p className="text-gray-400 mb-2">Please read these terms carefully before using Libronet</p>
          <p className="text-sm text-gray-500">Last Updated: {new Date().toLocaleDateString()}</p>
        </div>

        {/* Content */}
        <div className="bg-[#48576019] border border-gray-800 rounded-2xl p-8 lg:p-12">
          <div className="space-y-8 text-gray-300">
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-purple-400 font-bold text-sm">1</span>
                </div>
                <h2 className="text-2xl font-semibold text-gray-50">Acceptance of Terms</h2>
              </div>
              <p className="leading-relaxed">By accessing and using Libronet, you accept and agree to be bound by these Terms and Conditions. If you do not agree, please do not use our platform.</p>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-purple-400 font-bold text-sm">2</span>
                </div>
                <h2 className="text-2xl font-semibold text-gray-50">User Accounts</h2>
              </div>
              <p className="mb-3 leading-relaxed">You must create an account to access certain features. You are responsible for:</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-3">
                  <i className="fa fa-check text-purple-400 mt-1 text-sm"></i>
                  <span>Maintaining the confidentiality of your account credentials</span>
                </li>
                <li className="flex items-start gap-3">
                  <i className="fa fa-check text-purple-400 mt-1 text-sm"></i>
                  <span>All activities that occur under your account</span>
                </li>
                <li className="flex items-start gap-3">
                  <i className="fa fa-check text-purple-400 mt-1 text-sm"></i>
                  <span>Providing accurate and current information</span>
                </li>
                <li className="flex items-start gap-3">
                  <i className="fa fa-check text-purple-400 mt-1 text-sm"></i>
                  <span>Notifying us immediately of any unauthorized access</span>
                </li>
              </ul>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-purple-400 font-bold text-sm">3</span>
                </div>
                <h2 className="text-2xl font-semibold text-gray-50">Content and Copyright</h2>
              </div>
              <p className="mb-3 leading-relaxed">When uploading books or content to Libronet, you represent that:</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-3">
                  <i className="fa fa-shield-alt text-green-400 mt-1 text-sm"></i>
                  <span>You own the rights or have permission to share the content</span>
                </li>
                <li className="flex items-start gap-3">
                  <i className="fa fa-shield-alt text-green-400 mt-1 text-sm"></i>
                  <span>The content does not infringe on any third-party rights</span>
                </li>
                <li className="flex items-start gap-3">
                  <i className="fa fa-shield-alt text-green-400 mt-1 text-sm"></i>
                  <span>You grant Libronet a non-exclusive license to host and distribute the content</span>
                </li>
                <li className="flex items-start gap-3">
                  <i className="fa fa-shield-alt text-green-400 mt-1 text-sm"></i>
                  <span>You will not upload copyrighted material without proper authorization</span>
                </li>
              </ul>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-red-400 font-bold text-sm">4</span>
                </div>
                <h2 className="text-2xl font-semibold text-gray-50">Prohibited Activities</h2>
              </div>
              <p className="mb-3 leading-relaxed">Users must not:</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-3">
                  <i className="fa fa-times text-red-400 mt-1 text-sm"></i>
                  <span>Upload malicious files or viruses</span>
                </li>
                <li className="flex items-start gap-3">
                  <i className="fa fa-times text-red-400 mt-1 text-sm"></i>
                  <span>Violate any applicable laws or regulations</span>
                </li>
                <li className="flex items-start gap-3">
                  <i className="fa fa-times text-red-400 mt-1 text-sm"></i>
                  <span>Harass, abuse, or harm other users</span>
                </li>
                <li className="flex items-start gap-3">
                  <i className="fa fa-times text-red-400 mt-1 text-sm"></i>
                  <span>Attempt to gain unauthorized access to the platform</span>
                </li>
                <li className="flex items-start gap-3">
                  <i className="fa fa-times text-red-400 mt-1 text-sm"></i>
                  <span>Use automated systems to scrape or download content in bulk</span>
                </li>
                <li className="flex items-start gap-3">
                  <i className="fa fa-times text-red-400 mt-1 text-sm"></i>
                  <span>Share or distribute copyrighted material illegally</span>
                </li>
              </ul>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-yellow-400 font-bold text-sm">5</span>
                </div>
                <h2 className="text-2xl font-semibold text-gray-50">Content Removal</h2>
              </div>
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <i className="fa fa-exclamation-triangle text-yellow-400 mt-1"></i>
                  <p className="leading-relaxed">We reserve the right to remove any content that violates these terms, infringes copyright, or is deemed inappropriate without prior notice.</p>
                </div>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-blue-400 font-bold text-sm">6</span>
                </div>
                <h2 className="text-2xl font-semibold text-gray-50">Privacy and Data</h2>
              </div>
              <p className="leading-relaxed">Your use of Libronet is also governed by our Privacy Policy. We collect and process data as described in that policy.</p>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gray-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-gray-400 font-bold text-sm">7</span>
                </div>
                <h2 className="text-2xl font-semibold text-gray-50">Disclaimer of Warranties</h2>
              </div>
              <p className="mb-3 leading-relaxed">Libronet is provided "as is" without warranties of any kind. We do not guarantee:</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-3">
                  <i className="fa fa-info-circle text-gray-400 mt-1 text-sm"></i>
                  <span>Uninterrupted or error-free service</span>
                </li>
                <li className="flex items-start gap-3">
                  <i className="fa fa-info-circle text-gray-400 mt-1 text-sm"></i>
                  <span>Accuracy or reliability of content</span>
                </li>
                <li className="flex items-start gap-3">
                  <i className="fa fa-info-circle text-gray-400 mt-1 text-sm"></i>
                  <span>That the platform will meet your specific requirements</span>
                </li>
              </ul>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-orange-400 font-bold text-sm">8</span>
                </div>
                <h2 className="text-2xl font-semibold text-gray-50">Limitation of Liability</h2>
              </div>
              <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
                <p className="leading-relaxed">To the maximum extent permitted by law, Libronet shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the platform.</p>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-red-400 font-bold text-sm">9</span>
                </div>
                <h2 className="text-2xl font-semibold text-gray-50">Termination</h2>
              </div>
              <p className="leading-relaxed">We may terminate or suspend your account at any time for violations of these terms. You may also delete your account at any time.</p>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-purple-400 font-bold text-sm">10</span>
                </div>
                <h2 className="text-2xl font-semibold text-gray-50">Changes to Terms</h2>
              </div>
              <p className="leading-relaxed">We reserve the right to modify these terms at any time. Continued use of the platform after changes constitutes acceptance of the new terms.</p>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-green-400 font-bold text-sm">11</span>
                </div>
                <h2 className="text-2xl font-semibold text-gray-50">Governing Law</h2>
              </div>
              <p className="leading-relaxed">These terms are governed by applicable laws. Any disputes shall be resolved in the appropriate jurisdiction.</p>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-blue-400 font-bold text-sm">12</span>
                </div>
                <h2 className="text-2xl font-semibold text-gray-50">Contact</h2>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <i className="fa fa-envelope text-blue-400"></i>
                  <p className="leading-relaxed">For questions about these Terms and Conditions, please contact us through the platform's support channels.</p>
                </div>
              </div>
            </section>
          </div>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-gray-800">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link 
                to="/" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition font-medium"
              >
                <i className="fa fa-arrow-left"></i>
                Back to Home
              </Link>
              <div className="text-center sm:text-right">
                <p className="text-gray-400 text-sm">Have questions?</p>
                <p className="text-purple-400 text-sm font-medium">Contact our support team</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
