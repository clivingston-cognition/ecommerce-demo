import Link from "next/link";
import { demoCategories } from "@/lib/demo-data";

export const DemoNavbar = () => {
  return (
    <>
      {/* Promo bar */}
      <div className="demo-promo-bar">
        Free Shipping on Orders Over $45 &mdash; Shop Now &amp; Save
      </div>

      {/* Main navbar */}
      <header className="pointer-events-auto w-full px-4 sm:px-8 lg:px-12 py-4 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="36" height="36" rx="4" fill="#ffffff" />
            <path d="M8 10h4v16H8V10zm6 0h4l6 10v-10h4v16h-4l-6-10v10h-4V10z" fill="#003da5" />
          </svg>
          <span className="text-xl font-bold tracking-tight hidden sm:inline">
            Lowe&apos;s
          </span>
        </Link>

        {/* Category links */}
        <nav className="hidden lg:flex items-center gap-6">
          {demoCategories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/${cat.slug}`}
              className="text-sm font-medium hover:opacity-80 transition-opacity"
            >
              {cat.label}
            </Link>
          ))}
        </nav>

        {/* Search bar */}
        <div className="flex-1 max-w-lg mx-4">
          <input
            type="text"
            placeholder="Search for products, brands, or categories..."
            className="w-full px-4 py-2.5 text-sm rounded"
            readOnly
          />
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-4 shrink-0">
          <span className="text-sm font-medium hidden md:inline">
            Sign In
          </span>
          <span className="text-sm font-medium hidden md:inline">Cart</span>
        </div>
      </header>
    </>
  );
};
