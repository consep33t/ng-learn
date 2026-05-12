"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useAdminStore } from "@/lib/store";

const navItems = [
  { href: "/admin/dashboard", icon: "📊", label: "Dashboard" },
  { href: "/admin/hero", icon: "🚀", label: "Hero Banner" },
  { href: "/admin/settings", icon: "⚙️", label: "Pengaturan Website" },
  { href: "/admin/programs", icon: "📚", label: "Program Les" },
  { href: "/admin/testimonials", icon: "💬", label: "Testimoni" },
  { href: "/admin/faqs", icon: "❓", label: "FAQ" },
  { href: "/admin/messages", icon: "✉️", label: "Pesan Masuk" },
  { href: "/admin/gallery", icon: "🖼️", label: "Galeri Foto" },
  { href: "/admin/admins", icon: "👤", label: "Kelola Admin" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { sidebarOpen, setSidebarOpen, toggleSidebar } = useAdminStore();

  if (pathname === "/admin/login") return <>{children}</>;

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 text-slate-100 flex flex-col shadow-2xl transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="p-8 border-b border-white/5">
          <Link href="/admin/dashboard" className="flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-500 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20 rotate-3 transition-transform hover:rotate-0">
              <span className="font-display text-2xl text-white">N</span>
            </div>
            <div>
              <div className="flex items-baseline">
                <span className="font-display text-2xl font-bold text-white tracking-tight">NG.</span>
                <span className="font-display text-2xl font-bold text-indigo-400 tracking-tight">LEARN</span>
              </div>
              <p className="text-slate-400 text-[10px] uppercase tracking-widest font-bold">Admin Portal</p>
            </div>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-8 px-4 space-y-1.5 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-4 px-5 py-3.5 rounded-2xl font-bold transition-all duration-300 group ${
                pathname === item.href
                  ? "bg-indigo-600 text-white shadow-xl shadow-indigo-900/40"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              <span className={`text-xl transition-transform duration-300 group-hover:scale-110 ${pathname === item.href ? "scale-110" : ""}`}>
                {item.icon}
              </span>
              <span className="tracking-wide">{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Bottom */}
        <div className="p-6 bg-slate-950/50 space-y-3">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-4 px-5 py-3 rounded-2xl text-slate-400 hover:bg-white/5 hover:text-white font-bold transition-all text-sm group"
          >
            <span className="transition-transform group-hover:rotate-12">🌐</span> Lihat Website
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="flex items-center gap-4 px-5 py-3 rounded-2xl text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 font-bold transition-all text-sm w-full group"
          >
            <span className="transition-transform group-hover:-translate-x-1">🚪</span> Keluar
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 lg:ml-72 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-30 px-8 h-20 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            <button
              className="btn btn-ghost btn-circle lg:hidden"
              onClick={() => toggleSidebar()}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
            <h1 className="font-display text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-3">
              <span className="bg-slate-100 p-2 rounded-xl">{navItems.find((n) => n.href === pathname)?.icon ?? "⚙️"}</span>
              {navItems.find((n) => n.href === pathname)?.label ?? "Admin Panel"}
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col items-end mr-2">
              <span className="text-sm font-bold text-slate-800">Super Admin</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Online</span>
            </div>
            <div className="w-12 h-12 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-200 ring-4 ring-slate-50 transition-transform hover:scale-105 cursor-pointer">
              A
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-8 lg:p-10 max-w-7xl w-full mx-auto animate-in fade-in duration-500">
          {children}
        </main>
      </div>
    </div>
  );
}
