/** @type {import('next').NextConfig} */
const path = require('path')
const nextConfig = {
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')]
    },
    output: "standalone",
    compiler: {
        styledComponents: true
    }
};

module.exports = nextConfig;