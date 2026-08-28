import type { NextConfig } from 'next';

const isGitHubPages = process.env.GITHUB_PAGES === 'true';
const repositoryPath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const nextConfig: NextConfig = {
  output: isGitHubPages ? 'export' : undefined,
  // Vinext currently fails to prerender dynamic App Router routes when basePath
  // is set. Links and public assets are prefixed in the application instead.
  basePath: '',
  assetPrefix: isGitHubPages ? repositoryPath : '',
  trailingSlash: false,
};

export default nextConfig;
