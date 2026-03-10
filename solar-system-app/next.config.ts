import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS || false;

let assetPrefix = '';
let basePath = '';

if (isGithubActions) {
  // trim off `<owner>/`
  const repo = process.env.GITHUB_REPOSITORY?.replace(/.*?\//, '') || '3D-Solar-System-Website';
  assetPrefix = `/${repo}/`;
  basePath = `/${repo}`;
}

const nextConfig: NextConfig = {
  output: isGithubActions ? 'export' : undefined,
  basePath: basePath || undefined,
  assetPrefix: assetPrefix || undefined,
};

export default nextConfig;
