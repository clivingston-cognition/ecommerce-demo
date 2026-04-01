import React from "react";
import type { AppProps } from "next/app";
import { DemoNavbar } from "@/components/demo/DemoNavbar";
import { DemoFooter } from "@/components/demo/DemoFooter";
import "@/styles/globals.css";
import "@/styles/colors.css";
import "@/styles/animations.css";
import "@/styles/demo-lowes.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div data-demo="lowes">
      <DemoNavbar />
      <main className="pointer-events-auto">
        <Component {...pageProps} />
      </main>
      <DemoFooter />
    </div>
  );
}

export default MyApp;
