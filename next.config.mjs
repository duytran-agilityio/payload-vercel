import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config here
  webpack: (webpackConfig, { isServer }) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    // Ensure react-markdown-editor-lite can resolve React properly
    if (!isServer) {
      // Make sure React is available to all modules
      webpackConfig.resolve.fallback = {
        ...webpackConfig.resolve.fallback,
      }

      // Ensure proper module resolution for react-markdown-editor-lite
      webpackConfig.resolve.modules = [
        ...(webpackConfig.resolve.modules || []),
        'node_modules',
      ]
    }

    return webpackConfig
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
