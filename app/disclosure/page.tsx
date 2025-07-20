import type { Metadata } from 'next'
import { AlertCircle, DollarSign, ExternalLink, Shield } from 'lucide-react'

export const metadata: Metadata = {
  title: 'FTC Affiliate Disclosure | TentTracks',
  description: 'Federal Trade Commission (FTC) affiliate marketing disclosure. Learn about our affiliate relationships and commission structure.',
  robots: {
    index: true,
    follow: true,
  },
}

export default function FTCDisclosurePage() {
  const lastUpdated = 'January 15, 2024'
  
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gray-50 py-16">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6">
              <AlertCircle className="h-8 w-8 text-orange-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">FTC Affiliate Disclosure</h1>
            <p className="text-lg text-gray-600">
              In compliance with FTC guidelines, we disclose our affiliate relationships and how we earn commissions.
            </p>
            <p className="mt-4 text-sm text-gray-500">
              Last updated: {lastUpdated}
            </p>
          </div>
        </div>
      </section>

      {/* Important Notice */}
      <section className="bg-orange-50 border-b border-orange-200 py-8">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <div className="bg-orange-100 border border-orange-300 rounded-lg p-6">
              <div className="flex items-start">
                <AlertCircle className="h-6 w-6 text-orange-600 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h2 className="font-bold text-orange-900 mb-2">Important Disclosure</h2>
                  <p className="text-orange-800">
                    <strong>TentTracks contains affiliate links.</strong> When you click on links to products and make a purchase, 
                    we may receive a commission at no additional cost to you. This helps support our site and allows us to 
                    continue providing valuable camping information and deals.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="mx-auto max-w-4xl prose prose-lg max-w-none">
            
            <h2>What Are Affiliate Links?</h2>
            
            <p>
              Affiliate links are special URLs that contain a unique identifier that tells a retailer that 
              a customer came from our website. When you click on an affiliate link and make a purchase, 
              the retailer pays us a commission.
            </p>

            <p>
              <strong>Important:</strong> Using affiliate links does not cost you anything extra. The price 
              you pay is the same whether you use our affiliate link or go directly to the retailer&apos;s website.
            </p>

            <h2>Our Affiliate Partners</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <DollarSign className="h-5 w-5 text-green-600 mr-2" />
                  Amazon Associates
                </h3>
                <p className="text-gray-700 text-sm mb-3">
                  We participate in the Amazon Associates Program, an affiliate advertising program designed 
                  to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com.
                </p>
                <p className="text-xs text-gray-600">
                  Commission Rate: 1-10% depending on product category
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <DollarSign className="h-5 w-5 text-green-600 mr-2" />
                  Cabela&apos;s Affiliate Program
                </h3>
                <p className="text-gray-700 text-sm mb-3">
                  We are affiliates of Cabela&apos;s and earn commissions on qualifying purchases of outdoor gear and equipment.
                </p>
                <p className="text-xs text-gray-600">
                  Commission Rate: 2-8% depending on product category
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <DollarSign className="h-5 w-5 text-green-600 mr-2" />
                  REI Co-op
                </h3>
                <p className="text-gray-700 text-sm mb-3">
                  We participate in REI&apos;s affiliate program to earn commissions on outdoor gear and equipment sales.
                </p>
                <p className="text-xs text-gray-600">
                  Commission Rate: 3-7% depending on product category
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <DollarSign className="h-5 w-5 text-green-600 mr-2" />
                  Other Partners
                </h3>
                <p className="text-gray-700 text-sm mb-3">
                  We may also participate in other affiliate programs with outdoor gear retailers and service providers.
                </p>
                <p className="text-xs text-gray-600">
                  Commission rates vary by partner
                </p>
              </div>
            </div>

            <h2>How We Use Affiliate Links</h2>
            
            <h3>Product Recommendations</h3>
            <p>
              When we recommend camping gear, equipment, or services, we often include affiliate links to make 
              it easy for you to find and purchase these items. Our recommendations are based on:
            </p>
            <ul>
              <li>Personal experience and testing</li>
              <li>Research and expert reviews</li>
              <li>User feedback and ratings</li>
              <li>Product specifications and features</li>
            </ul>

            <h3>Gear Deals Section</h3>
            <p>
              Our gear deals section features products from our affiliate partners. These deals are curated based on:
            </p>
            <ul>
              <li>Discount percentage and value</li>
              <li>Product quality and ratings</li>
              <li>Relevance to camping and outdoor activities</li>
              <li>Seasonal needs and trends</li>
            </ul>

            <h2>Our Editorial Policy</h2>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 not-prose">
              <div className="flex items-start">
                <Shield className="h-6 w-6 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-blue-900 mb-2">Editorial Independence</h3>
                  <p className="text-blue-800 text-sm">
                    Our editorial content is not influenced by affiliate commission potential. We recommend 
                    products based on their merit, not their commission rates.
                  </p>
                </div>
              </div>
            </div>

            <h3>Honest Reviews</h3>
            <p>
              We are committed to providing honest, unbiased reviews and recommendations. Our affiliate relationships 
              do not influence our editorial opinions or the products we choose to feature.
            </p>

            <h3>Transparency</h3>
            <p>
              We clearly identify affiliate links and sponsored content throughout our website. Look for these indicators:
            </p>
            <ul>
              <li><strong>&quot;Affiliate Link&quot;</strong> labels on product links</li>
              <li><strong>&quot;As an Amazon Associate, we earn from qualifying purchases&quot;</strong> notices</li>
              <li><strong>&quot;Sponsored&quot;</strong> tags on paid content</li>
              <li><strong>&quot;FTC: Affiliate Link&quot;</strong> disclaimers on buttons</li>
            </ul>

            <h2>FTC Guidelines Compliance</h2>
            
            <p>
              The Federal Trade Commission (FTC) requires websites to disclose affiliate relationships. 
              We comply with these guidelines by:
            </p>
            <ul>
              <li>Clearly marking affiliate links</li>
              <li>Providing this comprehensive disclosure page</li>
              <li>Including disclosure statements on relevant pages</li>
              <li>Being transparent about our commission structure</li>
            </ul>

            <h3>16 CFR Part 255 Compliance</h3>
            <p>
              This disclosure complies with the FTC&apos;s <strong>16 CFR Part 255: &quot;Guides Concerning the Use of 
              Endorsements and Testimonials in Advertising.&quot;</strong>
            </p>

            <h2>Cookie and Tracking Disclosure</h2>
            
            <p>
              Our affiliate partners may use cookies and tracking technologies to:
            </p>
            <ul>
              <li>Track affiliate referrals</li>
              <li>Ensure we receive proper commission credit</li>
              <li>Provide personalized shopping experiences</li>
              <li>Analyze customer behavior</li>
            </ul>

            <p>
              Each partner has their own privacy policy governing their use of cookies and data collection.
            </p>

            <h2>Your Rights and Choices</h2>
            
            <h3>No Obligation</h3>
            <p>
              You are under no obligation to use our affiliate links. You can always:
            </p>
            <ul>
              <li>Go directly to the retailer&apos;s website</li>
              <li>Search for products independently</li>
              <li>Compare prices across multiple retailers</li>
              <li>Use browser extensions that find better deals</li>
            </ul>

            <h3>Cookie Control</h3>
            <p>
              You can control or disable cookies through your browser settings. Note that this may affect 
              the functionality of affiliate tracking.
            </p>

            <h2>Questions About Our Affiliate Relationships</h2>
            
            <p>
              If you have questions about our affiliate relationships or this disclosure, please contact us:
            </p>
            
            <div className="bg-gray-50 p-6 rounded-lg not-prose">
              <p><strong>Email:</strong> disclosure@tenttracks.com</p>
              <p><strong>Subject Line:</strong> &quot;Affiliate Disclosure Question&quot;</p>
              <p className="mt-3 text-sm text-gray-600">
                We&apos;re committed to transparency and will respond to your questions promptly.
              </p>
            </div>

            <h2>Additional Resources</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose">
              <a 
                href="https://www.ftc.gov/tips-advice/business-center/guidance/ftcs-endorsement-guides-what-people-are-asking"
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">FTC Endorsement Guides</h4>
                    <p className="text-sm text-gray-600">Official FTC guidelines</p>
                  </div>
                  <ExternalLink className="h-5 w-5 text-gray-400" />
                </div>
              </a>

              <a 
                href="/privacy"
                className="block bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">Privacy Policy</h4>
                    <p className="text-sm text-gray-600">How we protect your data</p>
                  </div>
                  <ExternalLink className="h-5 w-5 text-gray-400" />
                </div>
              </a>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6 not-prose mt-8">
              <h3 className="font-semibold text-green-900 mb-2">Thank You for Your Support</h3>
              <p className="text-green-800 text-sm">
                When you use our affiliate links, you help support TentTracks at no additional cost to yourself. 
                This allows us to continue providing free, high-quality camping content and resources.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}