import { dirname } from "path";
import { fileURLToPath } from "url";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

const __dirname = dirname(fileURLToPath(import.meta.url));

const eslintConfig = [
  ...nextCoreWebVitals.map((config) => ({
    ...config,
    settings: {
      ...config.settings,
      next: {
        ...config.settings?.next,
        rootDir: __dirname,
      },
    },
  })),
];

export default eslintConfig;
