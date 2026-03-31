import Link from "next/link";

export const DemoFooter = () => {
  const lk = "text-sm transition duration-150 ease hover:text-white";
  const li = "my-1.5";

  return (
    <footer className="demo-footer pointer-events-auto">
      {/* Top footer: newsletter + app links */}
      <div className="demo-footer-top">
        <div className="demo-footer-inner">
          <div className="demo-footer-signup">
            <h3 className="text-sm font-bold mb-2">
              Sign up for deals &amp; project ideas
            </h3>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter email address"
                className="demo-footer-email"
                readOnly
              />
              <button type="button" className="demo-footer-submit">
                Sign Up
              </button>
            </div>
          </div>
          <div className="demo-footer-app hidden md:flex items-center gap-4">
            <span className="text-sm font-bold">Get the App</span>
            <span className="demo-app-badge">iOS</span>
            <span className="demo-app-badge">Android</span>
          </div>
        </div>
      </div>

      {/* Main footer columns */}
      <nav className="demo-footer-columns">
        <div className="demo-footer-inner demo-footer-grid">
          <div>
            <h2 className="demo-footer-heading">Who We Are</h2>
            <ul>
              <li className={li}><Link href="#" className={lk}>About Lowe&apos;s</Link></li>
              <li className={li}><Link href="#" className={lk}>Careers</Link></li>
              <li className={li}><Link href="#" className={lk}>Corporate Responsibility</Link></li>
              <li className={li}><Link href="#" className={lk}>Newsroom</Link></li>
              <li className={li}><Link href="#" className={lk}>Investors</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="demo-footer-heading">Customer Service</h2>
            <ul>
              <li className={li}><Link href="#" className={lk}>Contact Us</Link></li>
              <li className={li}><Link href="#" className={lk}>FAQ</Link></li>
              <li className={li}><Link href="#" className={lk}>Order Status</Link></li>
              <li className={li}><Link href="#" className={lk}>Shipping &amp; Delivery</Link></li>
              <li className={li}><Link href="#" className={lk}>Returns &amp; Exchanges</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="demo-footer-heading">Services</h2>
            <ul>
              <li className={li}><Link href="#" className={lk}>Installation Services</Link></li>
              <li className={li}><Link href="#" className={lk}>Store Locator</Link></li>
              <li className={li}><Link href="#" className={lk}>Lowe&apos;s Pro</Link></li>
              <li className={li}><Link href="#" className={lk}>Lowe&apos;s Rental</Link></li>
              <li className={li}><Link href="#" className={lk}>Gift Cards</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="demo-footer-heading">Resources</h2>
            <ul>
              <li className={li}><Link href="#" className={lk}>Design &amp; Ideas</Link></li>
              <li className={li}><Link href="#" className={lk}>DIY Projects</Link></li>
              <li className={li}><Link href="#" className={lk}>Rebates</Link></li>
              <li className={li}><Link href="#" className={lk}>Credit Cards</Link></li>
              <li className={li}><Link href="#" className={lk}>Subscriptions</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="demo-footer-heading">Connect</h2>
            <div className="flex gap-3 mt-2">
              {["Facebook", "Twitter", "Pinterest", "Instagram", "YouTube"].map(
                (s) => (
                  <Link key={s} href="#" className="demo-social-icon" title={s}>
                    {s[0]}
                  </Link>
                ),
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Bottom bar */}
      <div className="demo-footer-bottom">
        <div className="demo-footer-inner demo-footer-bottom-inner">
          <p>&copy; 2026 Lowe&apos;s. All rights reserved. This is a demo site.</p>
          <div className="flex gap-4 flex-wrap">
            <Link href="#" className="hover:text-white">Terms</Link>
            <Link href="#" className="hover:text-white">Privacy</Link>
            <Link href="#" className="hover:text-white">CA Notice</Link>
            <Link href="#" className="hover:text-white">AdChoices</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
