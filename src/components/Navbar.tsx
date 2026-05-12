"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar({ settings }: { settings?: any }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Beranda" },
    { href: "/#programs", label: "Program" },
    { href: "/#faq", label: "FAQ" },
    { href: "/#contact", label: "Kontak" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/profile", label: "Profile" },
    { href: "/admin/login", label: "Admin" }
  ];

  const whatsappNumber = (settings?.contact_whatsapp || "6281234567890").replace(/\D/g, "");

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? "bg-white/90 backdrop-blur-md shadow-lg py-3"
        : "bg-transparent py-5"
        }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform">
            <span className="font-display text-2xl text-white">N</span>
          </div>
          <div className="flex flex-col">
            <span
              className={`font-display text-2xl leading-none ${scrolled ? "text-primary" : "text-white"
                }`}
            >
              NG.LEARN
            </span>
            <span
              className={`text-[10px] font-bold tracking-widest uppercase ${scrolled ? "text-neutral/40" : "text-white/60"
                }`}
            >
              Study is Fun!
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`font-bold text-sm hover:text-primary transition-colors ${scrolled ? "text-neutral" : "text-white"
                }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            className="btn btn-warning btn-sm rounded-full px-6 font-black shadow-lg shadow-yellow-400/20"
          >
            Tanya Admin
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className={`lg:hidden btn btn-ghost btn-sm ${scrolled ? "text-neutral" : "text-white"
            }`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-2xl p-6 flex flex-col gap-4 border-t"
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-neutral font-bold text-lg p-2 hover:bg-sky-50 rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              className="btn btn-primary w-full rounded-xl font-black mt-2"
            >
              Tanya via WhatsApp
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
