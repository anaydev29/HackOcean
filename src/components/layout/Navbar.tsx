"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Anchor,
  LayoutDashboard,
  AlertTriangle,
  Info,
  Radio,
} from "lucide-react";

const navLinks = [
  { href: "/", label: "Home", icon: Anchor },
  { href: "/dashboard", label: "Command Center", icon: LayoutDashboard },
  { href: "/dashboard/alerts", label: "Alerts", icon: AlertTriangle },
  { href: "/about", label: "About", icon: Info },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-card-border"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-bold tracking-tight"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-teal to-mint">
            <Anchor className="h-4 w-4 text-white" />
          </div>
          <span className="gradient-text">DeepSea Guardian</span>
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-1">
          {navLinks.map(({ href, label, icon: Icon }) => {
            const isActive =
              href === "/"
                ? pathname === "/"
                : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-teal/15 text-sky-300"
                    : "text-foreground/60 hover:bg-teal/10 hover:text-foreground"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{label}</span>
              </Link>
            );
          })}

          {/* Live Indicator */}
          <div className="ml-3 flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-400">
            <Radio className="h-3 w-3 pulse-live" />
            <span className="hidden sm:inline">LIVE</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
