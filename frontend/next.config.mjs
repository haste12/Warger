/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['sharp', 'pdf-parse', 'pdf-to-img'],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push({
        'sharp': 'commonjs sharp',
        'pdf-parse': 'commonjs pdf-parse',
      });
    }
    return config;
  },
}

export default nextConfig;
