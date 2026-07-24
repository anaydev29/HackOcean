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
          <svg
            width="34"
            height="34"
            viewBox="0 0 34 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="shrink-0"
            style={{ filter: "drop-shadow(0 0 6px rgba(46, 176, 147, 0.5))" }}
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="sonarGrad" x1="0" y1="0" x2="34" y2="34" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#1C7293" />
                <stop offset="100%" stopColor="#2EB093" />
              </linearGradient>
            </defs>
            {/* Center dot */}
            <circle cx="17" cy="17" r="3" fill="url(#sonarGrad)" />
            {/* Inner arc */}
            <path
              d="M10.5 17a6.5 6.5 0 0 1 6.5-6.5"
              stroke="url(#sonarGrad)"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
            {/* Middle arc */}
            <path
              d="M7 17a10 10 0 0 1 10-10"
              stroke="url(#sonarGrad)"
              strokeWidth="1.8"
              strokeLinecap="round"
              fill="none"
              opacity="0.7"
            />
            {/* Outer arc */}
            <path
              d="M3.5 17A13.5 13.5 0 0 1 17 3.5"
              stroke="url(#sonarGrad)"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
              opacity="0.4"
            />
          </svg>
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
