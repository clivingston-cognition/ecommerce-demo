import Link from "next/link";

export const DemoFooter = () => {
  const linkStyles = "text-sm transition duration-150 ease hover:text-white";
  const liStyles = "my-1.5";

  return (
    <footer className="px-6 py-16 pointer-events-auto border-t border-solid">
      <nav className="flex flex-wrap justify-around gap-8 mx-auto max-w-screen-2xl">
        <div className="w-full max-w-xs">
          <h2 className="my-3 text-sm font-semibold uppercase tracking-wider">
            Departments
          </h2>
          <ul>
            <li className={liStyles}>
              <Link href="/t-shirts" className={linkStyles}>
                Tools &amp; Hardware
              </Link>
            </li>
            <li className={liStyles}>
              <Link href="/pants" className={linkStyles}>
                Lawn &amp; Garden
              </Link>
            </li>
            <li className={liStyles}>
              <Link href="/sweatshirts" className={linkStyles}>
                Lighting &amp; Electrical
              </Link>
            </li>
            <li className={liStyles}>
              <Link href="#" className={linkStyles}>
                Appliances
              </Link>
            </li>
            <li className={liStyles}>
              <Link href="#" className={linkStyles}>
                Flooring
              </Link>
            </li>
          </ul>
        </div>

        <div className="w-full max-w-xs">
          <h2 className="my-3 text-sm font-semibold uppercase tracking-wider">
            Customer Service
          </h2>
          <ul>
            <li className={liStyles}>
              <Link href="#" className={linkStyles}>
                Contact Us
              </Link>
            </li>
            <li className={liStyles}>
              <Link href="#" className={linkStyles}>
                Returns &amp; Exchanges
              </Link>
            </li>
            <li className={liStyles}>
              <Link href="#" className={linkStyles}>
                Shipping &amp; Delivery
              </Link>
            </li>
            <li className={liStyles}>
              <Link href="#" className={linkStyles}>
                Order Status
              </Link>
            </li>
          </ul>
        </div>

        <div className="w-full max-w-xs">
          <h2 className="my-3 text-sm font-semibold uppercase tracking-wider">
            About
          </h2>
          <ul>
            <li className={liStyles}>
              <Link href="#" className={linkStyles}>
                About Lowe&apos;s
              </Link>
            </li>
            <li className={liStyles}>
              <Link href="#" className={linkStyles}>
                Careers
              </Link>
            </li>
            <li className={liStyles}>
              <Link href="#" className={linkStyles}>
                Store Locator
              </Link>
            </li>
            <li className={liStyles}>
              <Link href="#" className={linkStyles}>
                Lowe&apos;s Pro
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <div className="mt-12 pt-6 border-t border-gray-700 text-center text-xs text-gray-500 max-w-screen-2xl mx-auto">
        &copy; 2026 Lowe&apos;s. All rights reserved.
        This is a demo site.
      </div>
    </footer>
  );
};
