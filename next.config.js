/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/v1",
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
