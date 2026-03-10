import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';
const repo = '3D-Solar-System-Website';

const nextConfig: NextConfig = {
  output: isProd ? 'export' : undefined,
  basePath: isProd ? `/${repo}` : undefined,
  assetPrefix: isProd ? `/${repo}/` : undefined,
};

export default nextConfig;
