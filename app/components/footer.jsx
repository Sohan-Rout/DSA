import React from 'react';
import Link from 'next/link';

const ContactItem = ({ icon, children }) => (
  <p className="flex items-start text-gray-400">
    <span className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0">{icon}</span>
    <span>{children}</span>
  </p>
);

const NavLink = ({ href, children }) => (
  <li>
    <Link href={href} className="text-gray-400 hover:text-blue-400 transition flex items-center">
      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
      {children}
    </Link>
  </li>
);

const SocialLink = ({ href, icon, colorClass, children }) => (
  <a href={href} className={`text-gray-400 hover:${colorClass} transition flex items-center px-4 py-2`} aria-label={children}>
    {icon}
    <span className="text-sm ml-2">{children}</span>
  </a>
);

const LegalLink = ({ href, children }) => (
  <li>
    <Link href={href} className="text-gray-400 hover:text-blue-400 transition text-sm">
      {children}
    </Link>
  </li>
);

const Footer = () => {
  const quickLinks = [
    { href: "/", text: "Home" },
    { href: "/#features", text: "Features" },
    { href: "/visualizer", text: "Visualizer" },
    { href: "/#about", text: "About Us" },
    { href: "/#faq", text: "FAQs" }
  ];

  const socialLinks = [
    {
      href: "/",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
      colorClass: "text-gray-300", // X's color is typically black/white but using gray for dark mode
      text: "X"
    },
    {
      href: "https://www.linkedin.com/in/sohan-rout/",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      ),
      colorClass: "text-blue-600",
      text: "LinkedIn"
    },
    {
      href: "https://github.com/Sohan-Rout/DsaVisualizer",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
        </svg>
      ),
      colorClass: "text-gray-300",
      text: "GitHub"
    },
    {
      href: "https://www.instagram.com/dsavisualizer",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" clipRule="evenodd" />
        </svg>
      ),
      colorClass: "text-pink-500",
      text: "Instagram"
    }
  ];

  const legalLinks = [
    { href: "/privacy", text: "Privacy Policy" },
    { href: "/terms", text: "Terms of Service" },
    { href: "/cookies", text: "Cookie Policy" }
  ];

  const bottomLinks = [
    { href: "/sitemap.xml", text: "Sitemap" },
    { href: "/careers", text: "Careers" },
    { href: "/testimonial", text: "Contact Us" }
  ];

  return (
    <footer className="bg-black text-gray-300 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-4">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold text-white">DSA<span className='text-blue-600'>Visualizer</span></span>
            </div>
            <p className="text-gray-400 mb-4 leading-relaxed">
              Empowering developers with interactive data structures and algorithms visualization tools.
            </p>
            <div className="space-y-2">
            <ContactItem icon={
  <svg fill="red" viewBox="0 0 24 24" stroke="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6 4 4 6.5 4c1.74 0 
             3.41 1.01 4.13 2.44h1.74C14.09 5.01 15.76 4 17.5 4 
             20 4 22 6 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
  </svg>
}>
  Made With Love By<br /><a href='https://ecmaproject.vercel.app' className='text-white underline underline-offset-8 decoration-amber-500 hover:text-blue-400'><span className='text-amber-500'>E</span>cma<span className='text-amber-500'>P</span>rojects</a>
</ContactItem>
              <ContactItem icon={
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              }>
                <a href="mailto:contact@dsavisualizer.com" className="hover:text-blue-400 transition">contact@dsavisualizer.com</a>
              </ContactItem>
              <ContactItem icon={
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              }>
                +1 (555) 123-4567
              </ContactItem>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <NavLink key={index} href={link.href}>{link.text}</NavLink>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 uppercase tracking-wider">Connect</h3>
            <div className="flex flex-wrap gap-4 mb-6">
              {socialLinks.map((social, index) => (
                <SocialLink 
                  key={index}
                  href={social.href}
                  icon={social.icon}
                  colorClass={social.colorClass}
                >
                  {social.text}
                </SocialLink>
              ))}
            </div>
            <h3 className="text-lg font-semibold text-white mb-4 uppercase tracking-wider">Legal</h3>
            <ul className="space-y-2">
              {legalLinks.map((link, index) => (
                <LegalLink key={index} href={link.href}>{link.text}</LegalLink>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center px-4">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} DSAVisualizer. All rights reserved.
            </p>
            <div className="flex space-x-6">
              {bottomLinks.map((link, index) => (
                <Link key={index} href={link.href} className="text-gray-500 hover:text-blue-400 transition text-sm">
                  {link.text}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;