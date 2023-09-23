/** @type {import('next').NextConfig} */
const nextConfig = {
  /* Redireccionamiento:
  http://localhost:3000/ redirecciona a http://localhost:3000/users */
  async redirects() {
    return [
      {
        source: '/',
        destination: '/users',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
