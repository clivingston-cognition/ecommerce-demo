import coreWebVitals from "eslint-config-next/core-web-vitals";

const config = [
  ...coreWebVitals,
  {
    rules: {
      // Disable rules that are new or stricter in eslint-config-next 16.2.x
      // and flag pre-existing code patterns
      "react-hooks/error-boundaries": "off",
      "react/no-unescaped-entities": "off",
    },
  },
  {
    files: ["src/lib/stripe/logger.ts"],
    rules: {
      // logger.ts uses "use" prefix in non-hook utility functions
      "react-hooks/rules-of-hooks": "off",
    },
  },
];

export default config;
