import type { NextConfig } from "next";
import path from "path";
import fs from "fs";

// Monorepo: sem turbopack.root o Turbopack infere o workspace root errado —
// o dev server sobe mas trava em todo request HTTP.
const monorepoRoot = path.resolve(__dirname, "../..");
const isMonorepo = fs.existsSync(path.join(monorepoRoot, "package.json"));

const nextConfig: NextConfig = {
  ...(isMonorepo ? { turbopack: { root: monorepoRoot } } : {}),
};

export default nextConfig;
