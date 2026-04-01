import React from "react";
import Image from "next/image";
import Link from "next/link";
import { demoNavCategories } from "@/lib/demo-data";

export const DemoNavbar = () => {
  return (
    <>
      {/* Row 1: Top promo bar */}
      <div className="demo-promo-bar">
        <Link legacyBehavior href="/pants"><a className="demo-promo-bar-link">
          SpringFest is here &mdash; find fresh deals for your home and
          landscape. <span className="font-bold">Shop Now &gt;</span>
        </a></Link>
      </div>

      {/* Row 2: Main header */}
      <header className="demo-header-main pointer-events-auto">
        <div className="demo-header-inner">
          {/* Logo */}
          <Link legacyBehavior href="/"><a className="flex items-center shrink-0">
            <Image
              src="/lowes-logo.png"
              alt="Lowe's Home Improvement"
              width={120}
              height={55}
              priority
            />
          </a></Link>

          {/* Store selector */}
          <div className="demo-store-selector hidden md:flex items-center gap-1 shrink-0">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <span className="text-sm font-medium whitespace-nowrap">
              San Francisco Lowe&apos;s
            </span>
            <span className="text-xs opacity-75">10 PM</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>

          {/* ZIP code */}
          <div className="demo-zip-selector hidden lg:flex items-center gap-1 shrink-0">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span className="text-xs">94124</span>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>

          {/* Search bar */}
          <div className="flex-1 max-w-2xl mx-4">
            <div className="relative">
              <input
                type="text"
                placeholder="What can we help you find?"
                className="demo-search-input w-full"
                readOnly
              />
              <button className="demo-search-btn" aria-label="Search" type="button">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right nav icons */}
          <nav className="flex items-center gap-5 shrink-0" aria-label="Navigation icons">
            <button type="button" className="demo-nav-icon hidden md:flex flex-col items-center gap-0.5">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
              <span className="text-[10px]">Mylow</span>
            </button>
            <button type="button" className="demo-nav-icon hidden md:flex flex-col items-center gap-0.5">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <span className="text-[10px]">Sign In</span>
            </button>
            <Link legacyBehavior href="#"><a className="demo-nav-icon flex flex-col items-center gap-0.5 relative">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              <span className="text-[10px]">Cart</span>
            </a></Link>
          </nav>
        </div>
      </header>

      {/* Row 3: Category navigation */}
      <nav className="demo-category-nav pointer-events-auto" aria-label="Category navigation">
        <div className="demo-category-nav-inner">
          <Link legacyBehavior href="/"><a className="demo-cat-link demo-cat-link-special">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
            Shop All
          </a></Link>
          <Link legacyBehavior href="#"><a className="demo-cat-link demo-cat-link-special">
            Installations
          </a></Link>
          <Link legacyBehavior href="#"><a className="demo-cat-link demo-cat-link-special">
            Deals
          </a></Link>
          <Link legacyBehavior href="#"><a className="demo-cat-link demo-cat-link-special">
            Design &amp; Ideas
          </a></Link>
          <span className="demo-cat-divider" />
          {demoNavCategories.map((cat) => (
            <Link legacyBehavior key={cat.label} href={`/${cat.slug}`}><a className="demo-cat-link">
              {cat.label}
            </a></Link>
          ))}
        </div>
      </nav>
    </>
  );
};
