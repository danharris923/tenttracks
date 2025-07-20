import type { Metadata } from 'next'
import { Scale, AlertTriangle, ExternalLink } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Terms of Service | TentTracks',
  description: 'Terms and conditions for using TentTracks. User responsibilities, affiliate disclosures, and legal agreements.',
  robots: {
    index: true,
    follow: true,
  },
}

export default function TermsOfServicePage() {
  const lastUpdated = 'January 15, 2024'
  const effectiveDate = 'January 15, 2024'
  
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gray-50 py-16">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-6">
              <Scale className="h-8 w-8 text-primary-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
            <p className="text-lg text-gray-600">
              Please read these terms carefully before using TentTracks services.
            </p>
            <div className="mt-4 text-sm text-gray-500">
              <p>Last updated: {lastUpdated}</p>
              <p>Effective date: {effectiveDate}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="mx-auto max-w-4xl prose prose-lg max-w-none">
            
            <h2>1. Acceptance of Terms</h2>
            
            <p>
              By accessing or using TentTracks (&quot;the Service&quot;), you agree to be bound by these Terms of Service 
              (&quot;Terms&quot;). If you do not agree to these Terms, please do not use the Service.
            </p>
            
            <p>
              These Terms apply to all visitors, users, and others who access or use the Service.
            </p>

            <h2>2. Description of Service</h2>
            
            <p>TentTracks provides:</p>
            <ul>
              <li>Campground information and reviews</li>
              <li>Camping gear recommendations and deals</li>
              <li>Outdoor adventure content and guides</li>
              <li>Community features and user-generated content</li>
            </ul>
            
            <p>
              The Service is provided for informational and entertainment purposes. We do not guarantee 
              the accuracy, completeness, or reliability of any information provided.
            </p>

            <h2>3. User Accounts</h2>
            
            <h3>Account Creation</h3>
            <p>
              To access certain features, you may need to create an account. You must:
            </p>
            <ul>
              <li>Provide accurate, complete, and current information</li>
              <li>Maintain the security of your password</li>
              <li>Accept responsibility for all activities under your account</li>
              <li>Notify us immediately of unauthorized use</li>
            </ul>

            <h3>Account Termination</h3>
            <p>
              We may terminate or suspend your account at any time for violation of these Terms or for any other reason.
            </p>

            <h2>4. User Content and Conduct</h2>
            
            <h3>User-Generated Content</h3>
            <p>
              You may submit reviews, comments, photos, and other content (&quot;User Content&quot;). By submitting User Content, you:
            </p>
            <ul>
              <li>Grant us a non-exclusive, royalty-free, worldwide license to use, modify, and display your content</li>
              <li>Represent that you own or have permission to use the content</li>
              <li>Agree that your content does not violate any third-party rights</li>
            </ul>

            <h3>Prohibited Conduct</h3>
            <p>You agree not to:</p>
            <ul>
              <li>Post false, misleading, or defamatory content</li>
              <li>Violate any laws or regulations</li>
              <li>Infringe on intellectual property rights</li>
              <li>Spam or harass other users</li>
              <li>Attempt to hack or compromise the Service</li>
              <li>Use automated tools to access the Service</li>
            </ul>

            <h2>5. Affiliate Marketing Disclosure</h2>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 not-prose">
              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-yellow-900 mb-2">FTC Compliance Notice</h3>
                  <p className="text-yellow-800 text-sm">
                    TentTracks participates in affiliate marketing programs. We may earn commissions 
                    from purchases made through our links at no additional cost to you.
                  </p>
                </div>
              </div>
            </div>

            <h3>Affiliate Relationships</h3>
            <p>
              TentTracks has affiliate relationships with:
            </p>
            <ul>
              <li>Amazon Associates Program</li>
              <li>Cabela&apos;s Affiliate Program</li>
              <li>REI Co-op Affiliate Program</li>
              <li>Other outdoor gear retailers</li>
            </ul>

            <h3>Commission Disclosure</h3>
            <p>
              When you click on affiliate links and make purchases:
            </p>
            <ul>
              <li>We may receive a commission from the retailer</li>
              <li>The price you pay remains the same</li>
              <li>Our recommendations are based on genuine opinion and research</li>
              <li>Commission potential does not influence our editorial content</li>
            </ul>

            <h2>6. Intellectual Property</h2>
            
            <h3>Our Content</h3>
            <p>
              The Service and its content, including text, graphics, logos, and software, are owned by 
              TentTracks or our licensors and are protected by copyright and other intellectual property laws.
            </p>

            <h3>Limited License</h3>
            <p>
              We grant you a limited, non-exclusive, non-transferable license to access and use the Service 
              for personal, non-commercial purposes.
            </p>

            <h3>Restrictions</h3>
            <p>You may not:</p>
            <ul>
              <li>Copy, modify, or distribute our content</li>
              <li>Reverse engineer any part of the Service</li>
              <li>Use our trademarks without permission</li>
              <li>Create derivative works</li>
            </ul>

            <h2>7. Third-Party Links and Services</h2>
            
            <p>
              The Service may contain links to third-party websites and services. We are not responsible for:
            </p>
            <ul>
              <li>The content or practices of third-party sites</li>
              <li>The availability of external links</li>
              <li>Transactions with third-party vendors</li>
              <li>Third-party privacy policies</li>
            </ul>

            <h2>8. Disclaimers</h2>
            
            <h3>Information Accuracy</h3>
            <p>
              While we strive for accuracy, campground information, pricing, and availability may change. 
              Always verify details directly with campgrounds and retailers.
            </p>

            <h3>Safety and Risk</h3>
            <p>
              Outdoor activities involve inherent risks. You are responsible for:
            </p>
            <ul>
              <li>Your own safety and well-being</li>
              <li>Proper trip planning and preparation</li>
              <li>Following all applicable laws and regulations</li>
              <li>Obtaining necessary permits and insurance</li>
            </ul>

            <h2>9. Limitation of Liability</h2>
            
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, TENTTRACKS SHALL NOT BE LIABLE FOR:
            </p>
            <ul>
              <li>INDIRECT, INCIDENTAL, OR CONSEQUENTIAL DAMAGES</li>
              <li>LOSS OF PROFITS, DATA, OR BUSINESS OPPORTUNITIES</li>
              <li>DAMAGES RESULTING FROM OUTDOOR ACTIVITIES</li>
              <li>THIRD-PARTY ACTIONS OR OMISSIONS</li>
            </ul>

            <p>
              OUR TOTAL LIABILITY SHALL NOT EXCEED $100 OR THE AMOUNT YOU PAID US IN THE LAST 12 MONTHS.
            </p>

            <h2>10. Indemnification</h2>
            
            <p>
              You agree to indemnify and hold harmless TentTracks from any claims, damages, or expenses 
              arising from your use of the Service or violation of these Terms.
            </p>

            <h2>11. Privacy</h2>
            
            <p>
              Your privacy is important to us. Please review our Privacy Policy, which explains how we 
              collect, use, and protect your information.
            </p>

            <h2>12. Modifications</h2>
            
            <p>
              We may update these Terms from time to time. We will notify you of material changes by:
            </p>
            <ul>
              <li>Posting the updated Terms on our website</li>
              <li>Updating the &quot;Last updated&quot; date</li>
              <li>Sending email notifications for significant changes</li>
            </ul>

            <p>
              Your continued use of the Service after changes constitutes acceptance of the new Terms.
            </p>

            <h2>13. Governing Law</h2>
            
            <p>
              These Terms are governed by the laws of the United States and the State of [State], 
              without regard to conflict of law principles.
            </p>

            <h2>14. Dispute Resolution</h2>
            
            <h3>Informal Resolution</h3>
            <p>
              Before filing any legal action, please contact us to resolve the dispute informally.
            </p>

            <h3>Arbitration</h3>
            <p>
              Any disputes not resolved informally shall be settled through binding arbitration in 
              accordance with the rules of the American Arbitration Association.
            </p>

            <h2>15. Severability</h2>
            
            <p>
              If any provision of these Terms is found to be unenforceable, the remaining provisions 
              will remain in full force and effect.
            </p>

            <h2>16. Contact Information</h2>
            
            <p>
              If you have questions about these Terms, please contact us:
            </p>
            
            <div className="bg-gray-50 p-6 rounded-lg not-prose">
              <p><strong>Email:</strong> legal@tenttracks.com</p>
              <p><strong>Mailing Address:</strong></p>
              <p>TentTracks Legal Department<br />
              123 Outdoor Way<br />
              Adventure City, AC 12345<br />
              United States</p>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-6 not-prose mt-8">
              <h3 className="font-semibold text-red-900 mb-2">Important Notice</h3>
              <p className="text-red-800 text-sm mb-4">
                These terms contain important limitations on our liability and your rights. 
                Please read them carefully.
              </p>
              <a 
                href="/privacy" 
                className="inline-flex items-center text-sm font-medium text-red-600 hover:text-red-800"
              >
                Read Our Privacy Policy
                <ExternalLink className="h-4 w-4 ml-1" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}