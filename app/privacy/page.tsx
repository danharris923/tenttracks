import type { Metadata } from 'next'
import Link from 'next/link'
import { Shield, Mail, ExternalLink } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Privacy Policy | TentTracks',
  description: 'Learn how TentTracks collects, uses, and protects your personal information. Our commitment to privacy and data protection.',
  robots: {
    index: true,
    follow: true,
  },
}

export default function PrivacyPolicyPage() {
  const lastUpdated = 'January 15, 2024'
  
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gray-50 py-16">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-6">
              <Shield className="h-8 w-8 text-primary-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
            <p className="text-lg text-gray-600">
              Your privacy is important to us. This policy explains how we collect, use, and protect your information.
            </p>
            <p className="mt-4 text-sm text-gray-500">
              Last updated: {lastUpdated}
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="mx-auto max-w-4xl prose prose-lg max-w-none">
            
            <h2>1. Information We Collect</h2>
            
            <h3>Information You Provide</h3>
            <p>
              We collect information you provide directly to us, such as when you:
            </p>
            <ul>
              <li>Create an account or profile</li>
              <li>Subscribe to our newsletter</li>
              <li>Contact us through our forms</li>
              <li>Leave reviews or comments</li>
              <li>Participate in surveys or promotions</li>
            </ul>

            <h3>Information Collected Automatically</h3>
            <p>
              When you use our website, we automatically collect certain information, including:
            </p>
            <ul>
              <li>Device information (browser type, operating system)</li>
              <li>Usage data (pages visited, time spent, clicks)</li>
              <li>Location data (if you enable location services)</li>
              <li>Cookies and similar technologies</li>
            </ul>

            <h2>2. How We Use Your Information</h2>
            
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide and improve our services</li>
              <li>Personalize your experience</li>
              <li>Send you newsletters and updates (with your consent)</li>
              <li>Respond to your inquiries and support requests</li>
              <li>Analyze usage patterns and improve our website</li>
              <li>Prevent fraud and ensure security</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2>3. Information Sharing</h2>
            
            <p>We do not sell your personal information. We may share information in the following situations:</p>
            
            <h3>Service Providers</h3>
            <p>
              We share information with third-party service providers who help us operate our website and services, such as:
            </p>
            <ul>
              <li>Analytics providers (Google Analytics, Vercel Analytics)</li>
              <li>Email service providers</li>
              <li>Cloud hosting services</li>
              <li>Customer support tools</li>
            </ul>

            <h3>Legal Requirements</h3>
            <p>
              We may disclose information if required by law or if we believe disclosure is necessary to:
            </p>
            <ul>
              <li>Comply with legal process</li>
              <li>Protect our rights and property</li>
              <li>Ensure user safety</li>
              <li>Investigate fraud or security issues</li>
            </ul>

            <h2>4. Affiliate Relationships</h2>
            
            <p>
              TentTracks participates in affiliate marketing programs. When you click on affiliate links and make purchases:
            </p>
            <ul>
              <li>We may receive a commission at no additional cost to you</li>
              <li>The retailer may track your purchase through cookies</li>
              <li>We do not have access to your payment information</li>
              <li>Each retailer has their own privacy policy</li>
            </ul>

            <h2>5. Cookies and Tracking</h2>
            
            <h3>Essential Cookies</h3>
            <p>
              These cookies are necessary for the website to function and cannot be disabled:
            </p>
            <ul>
              <li>Session management</li>
              <li>Security features</li>
              <li>Load balancing</li>
            </ul>

            <h3>Analytics Cookies</h3>
            <p>
              We use analytics cookies to understand how visitors use our site:
            </p>
            <ul>
              <li>Google Analytics (anonymized IP addresses)</li>
              <li>Vercel Analytics</li>
              <li>Performance monitoring</li>
            </ul>

            <h3>Marketing Cookies</h3>
            <p>
              These cookies help us deliver relevant advertising:
            </p>
            <ul>
              <li>Affiliate tracking</li>
              <li>Social media integration</li>
              <li>Personalized content</li>
            </ul>

            <h2>6. Your Rights and Choices</h2>
            
            <h3>Access and Control</h3>
            <p>You have the right to:</p>
            <ul>
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Delete your account and data</li>
              <li>Export your data</li>
              <li>Opt out of marketing communications</li>
            </ul>

            <h3>Cookie Management</h3>
            <p>
              You can control cookies through your browser settings. Note that disabling certain cookies may affect website functionality.
            </p>

            <h2>7. Data Security</h2>
            
            <p>We implement security measures to protect your information:</p>
            <ul>
              <li>Encryption in transit (HTTPS)</li>
              <li>Secure data storage</li>
              <li>Regular security audits</li>
              <li>Access controls and monitoring</li>
              <li>Employee training on data protection</li>
            </ul>

            <h2>8. International Transfers</h2>
            
            <p>
              Your information may be transferred to and processed in countries other than your own. 
              We ensure appropriate safeguards are in place to protect your data during international transfers.
            </p>

            <h2>9. Children&apos;s Privacy</h2>
            
            <p>
              Our services are not directed to children under 13. We do not knowingly collect personal 
              information from children under 13. If we learn we have collected such information, 
              we will delete it promptly.
            </p>

            <h2>10. Changes to This Policy</h2>
            
            <p>
              We may update this privacy policy from time to time. We will notify you of material 
              changes by posting the updated policy on our website and updating the &quot;Last updated&quot; date.
            </p>

            <h2>11. Contact Us</h2>
            
            <p>
              If you have questions about this privacy policy or our data practices, please contact us:
            </p>
            
            <div className="bg-gray-50 p-6 rounded-lg not-prose">
              <div className="flex items-center mb-4">
                <Mail className="h-5 w-5 text-primary-600 mr-2" />
                <span className="font-medium">Email:</span>
              </div>
              <p className="mb-4">privacy@tenttracks.com</p>
              
              <div className="text-sm text-gray-600">
                <p>Mailing Address:</p>
                <p>TentTracks Privacy Officer</p>
                <p>123 Outdoor Way</p>
                <p>Adventure City, AC 12345</p>
                <p>United States</p>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 not-prose mt-8">
              <h3 className="font-semibold text-blue-900 mb-2">Your Data Rights</h3>
              <p className="text-blue-800 text-sm mb-4">
                You have the right to access, correct, or delete your personal information. 
                Contact us to exercise these rights.
              </p>
              <Link 
                href="/contact" 
                className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                Contact Us About Your Data
                <ExternalLink className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}