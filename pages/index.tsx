import React from "react";
import Head from "next/head";
import { DemoHomePage } from "@/components/demo/DemoHomePage";

export default function Home() {
  return (
    <>
      <Head>
        <title>Lowe&apos;s Home Improvement</title>
        <meta
          name="description"
          content="Find everything you need for your next home improvement project"
        />
      </Head>
      <DemoHomePage />
    </>
  );
}
