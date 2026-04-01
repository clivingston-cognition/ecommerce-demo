import React from "react";
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
              <li className={li}><Link legacyBehavior href="#"><a className={lk}>About Lowe&apos;s</a></Link></li>
              <li className={li}><Link legacyBehavior href="#"><a className={lk}>Careers</a></Link></li>
              <li className={li}><Link legacyBehavior href="#"><a className={lk}>Corporate Responsibility</a></Link></li>
              <li className={li}><Link legacyBehavior href="#"><a className={lk}>Newsroom</a></Link></li>
              <li className={li}><Link legacyBehavior href="#"><a className={lk}>Investors</a></Link></li>
            </ul>
          </div>

          <div>
            <h2 className="demo-footer-heading">Customer Service</h2>
            <ul>
              <li className={li}><Link legacyBehavior href="#"><a className={lk}>Contact Us</a></Link></li>
              <li className={li}><Link legacyBehavior href="#"><a className={lk}>FAQ</a></Link></li>
              <li className={li}><Link legacyBehavior href="#"><a className={lk}>Order Status</a></Link></li>
              <li className={li}><Link legacyBehavior href="#"><a className={lk}>Shipping &amp; Delivery</a></Link></li>
              <li className={li}><Link legacyBehavior href="#"><a className={lk}>Returns &amp; Exchanges</a></Link></li>
            </ul>
          </div>

          <div>
            <h2 className="demo-footer-heading">Services</h2>
            <ul>
              <li className={li}><Link legacyBehavior href="#"><a className={lk}>Installation Services</a></Link></li>
              <li className={li}><Link legacyBehavior href="#"><a className={lk}>Store Locator</a></Link></li>
              <li className={li}><Link legacyBehavior href="#"><a className={lk}>Lowe&apos;s Pro</a></Link></li>
              <li className={li}><Link legacyBehavior href="#"><a className={lk}>Lowe&apos;s Rental</a></Link></li>
              <li className={li}><Link legacyBehavior href="#"><a className={lk}>Gift Cards</a></Link></li>
            </ul>
          </div>

          <div>
            <h2 className="demo-footer-heading">Resources</h2>
            <ul>
              <li className={li}><Link legacyBehavior href="#"><a className={lk}>Design &amp; Ideas</a></Link></li>
              <li className={li}><Link legacyBehavior href="#"><a className={lk}>DIY Projects</a></Link></li>
              <li className={li}><Link legacyBehavior href="#"><a className={lk}>Rebates</a></Link></li>
              <li className={li}><Link legacyBehavior href="#"><a className={lk}>Credit Cards</a></Link></li>
              <li className={li}><Link legacyBehavior href="#"><a className={lk}>Subscriptions</a></Link></li>
            </ul>
          </div>

          <div>
            <h2 className="demo-footer-heading">Connect</h2>
            <div className="flex gap-3 mt-2">
              {["Facebook", "Twitter", "Pinterest", "Instagram", "YouTube"].map(
                (s) => (
                  <Link legacyBehavior key={s} href="#"><a className="demo-social-icon" title={s}>
                    {s[0]}
                  </a></Link>
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
            <Link legacyBehavior href="#"><a className="hover:text-white">Terms</a></Link>
            <Link legacyBehavior href="#"><a className="hover:text-white">Privacy</a></Link>
            <Link legacyBehavior href="#"><a className="hover:text-white">CA Notice</a></Link>
            <Link legacyBehavior href="#"><a className="hover:text-white">AdChoices</a></Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
