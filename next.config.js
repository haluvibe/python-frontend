/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/upload",
        destination: process.env.PYTHON_APP_ORIGIN + '/api/data',
      }
    ]
  },

}

module.exports = nextConfig
