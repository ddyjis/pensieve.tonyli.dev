const path = require('path')
const withPwa = require('next-pwa')({
  dest: 'public',
})

/** @type {import('next').NextConfig} */
const nextConfig = withPwa({
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
})

module.exports = nextConfig
