"use client";
import React from "react";
import Link from "next/link";
import { useState } from "react";
import PrivacyPolicyModal from "@/app/components/PrivacyPolicyModal";
import { GoHomeFill } from "react-icons/go";
import { MdAnimation } from "react-icons/md";
import { IoMdInformationCircle } from "react-icons/io";
import { HiSparkles } from "react-icons/hi2";
import { RiQuestionLine } from "react-icons/ri";

const Footer = () => {
  const [showPolicyModal, setShowPolicyModal] = useState(false);

  const quickLinks = [
    { href: "/", text: "Home", icon: GoHomeFill },
    { href: "/#features", text: "Features", icon: HiSparkles },
    { href: "/visualizer", text: "Visualizer", icon: MdAnimation },
    { href: "/#about", text: "About", icon: IoMdInformationCircle },
    { href: "/#faq", text: "FAQs", icon: RiQuestionLine },
  ];

  const socialLinks = [
    {
      href: "https://twitter.com",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      label: "Twitter",
    },
    {
      href: "https://linkedin.com",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
      label: "LinkedIn",
    },
    {
      href: "https://github.com",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            clipRule="evenodd"
          />
        </svg>
      ),
      label: "GitHub",
    },
    {
      href: "https://instagram.com",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path
            fillRule="evenodd"
            d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"
            clipRule="evenodd"
          />
        </svg>
      ),
      label: "Instagram",
    },
  ];

  const legalLinks = [
    { href: "/privacy", text: "Privacy Policy", type: "modal" },
    { href: "/terms", text: "Terms of Service", type: "link" },
    { href: "/cookies", text: "Cookies", type: "link" },
  ];

  return (
    <footer className="bg-black text-gray-400">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-white">
                DSA<span className="text-blue-500">Visualizer</span>
              </span>
            </div>
            <p className="text-gray-500 leading-relaxed">
              Interactive visualization tools for mastering data structures and
              algorithms.
            </p>
            <div className="space-y-3">
              <div className="flex items-start">
                <svg
                  className="w-5 h-5 mt-0.5 mr-3 flex-shrink-0"
                  fill="red"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6 4 4 6.5 4c1.74 0 3.41 1.01 4.13 2.44h1.74C14.09 5.01 15.76 4 17.5 4 20 4 22 6 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                <span>
                  Made with ♥ by{" "}
                  <a
                    href="https://www.linkedin.com/in/sohan-rout/"
                    className="text-blue-400 hover:text-blue-300"
                  >
                    Sohan Rout
                  </a>
                </span>
              </div>
              {/*
              <div className="flex items-start">
                <svg className="w-5 h-5 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:contact@dsavisualizer.com" className="hover:text-blue-400 transition">contact@dsavisualizer.com</a>
              </div>
              */}
              <div className="flex justify-left">
                <a
                className="border rounded-xl"
                  href="https://www.producthunt.com/products/dsa-visualizer?embed=true&utm_source=badge-featured&utm_medium=badge&utm_source=badge-dsa&#0045;visualizer"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={`https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=974127&theme=dark&t=1749182745821`}
                    alt="DSA&#0032;Visualizer - Visualize&#0032;&#0038;&#0032;learn&#0032;dsa&#0032;the&#0032;smart&#0032;way | Product Hunt"
                    style={{ width: 250, height: 54 }}
                    width="250"
                    height="54"
                  />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Navigation
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="hover:text-blue-400 transition flex items-center gap-2 group"
                  >
                    {link.icon && <link.icon className="text-xl" />}
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal + Social */}
          <div className="space-y-8">
            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                Legal
              </h3>
              <ul className="space-y-3">
                {legalLinks.map((link, index) => (
                  <li key={index}>
                    {link.type === "modal" ? (
                      <button
                        onClick={() => setShowPolicyModal(true)}
                        className="text-gray-500 hover:text-blue-400 transition"
                      >
                        {link.text}
                      </button>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-gray-500 hover:text-blue-400 transition"
                      >
                        {link.text}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Render the modal */}
            <PrivacyPolicyModal
              isOpen={showPolicyModal}
              onClose={() => setShowPolicyModal(false)}
            />

            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                Connect
              </h3>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full bg-gray-900 hover:bg-gray-900/70 hover:text-blue-600 flex items-center justify-center transition-colors"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-gray-900">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} DSAVisualizer. All rights
              reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                href="/sitemap-0.xml"
                className="text-sm text-gray-500 hover:text-blue-400 transition"
              >
                Sitemap
              </Link>
              <Link
                href="/#review"
                className="text-sm text-gray-500 hover:text-blue-400 transition"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
