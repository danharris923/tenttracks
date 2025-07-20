import Link from 'next/link'
import { MapPin, Mail, ExternalLink } from 'lucide-react'

interface FooterLink {
  name: string
  href: string
  external?: boolean
}

interface FooterSection {
  title: string
  links: FooterLink[]
}

const footerSections: FooterSection[] = [
  {
    title: 'Discover',
    links: [
      { name: 'Campgrounds', href: '/destinations' },
      { name: 'Gear Deals', href: '/gear-deals' },
      { name: 'Blog', href: '/blog' },
      { name: 'Reviews', href: '/reviews' },
    ]
  },
  {
    title: 'Company',
    links: [
      { name: 'About Us', href: '/about' },
      { name: 'Contact', href: '/contact' },
      { name: 'Careers', href: '/careers' },
      { name: 'Press', href: '/press' },
    ]
  },
  {
    title: 'Legal',
    links: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'FTC Disclosure', href: '/disclosure' },
    ]
  },
  {
    title: 'Partners',
    links: [
      { name: 'Amazon', href: 'https://amazon.com', external: true },
      { name: 'Cabela&apos;s', href: 'https://cabelas.com', external: true },
      { name: 'REI', href: 'https://rei.com', external: true },
      { name: 'National Parks', href: 'https://nps.gov', external: true },
    ]
  }
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="container py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link 
              href="/" 
              className="flex items-center space-x-2 font-bold text-xl text-white hover:text-primary-400 transition-colors mb-4"
            >
              <div className="h-8 w-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <MapPin className="h-5 w-5 text-white" />
              </div>
              <span>TentTracks</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Discover amazing campgrounds across North America and find the best camping gear deals.
            </p>
            <div className="flex items-center text-sm text-gray-400">
              <Mail className="h-4 w-4 mr-2" />
              <a 
                href="mailto:hello@tenttracks.com" 
                className="hover:text-primary-400 transition-colors"
              >
                hello@tenttracks.com
              </a>
            </div>
          </div>

          {/* Navigation Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-white mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-primary-400 transition-colors text-sm flex items-center"
                      >
                        {link.name}
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
                      >
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              © {currentYear} TentTracks. All rights reserved.
            </div>
            
            <div className="text-sm text-gray-400 text-center md:text-right">
              <div>Made with ❤️ for outdoor enthusiasts</div>
              <div className="mt-1">
                This site contains affiliate links. We may earn a commission when you purchase through these links.
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}