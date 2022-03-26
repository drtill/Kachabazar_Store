const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

module.exports = withPWA({
  pwa: {
    dest: 'public',
    register: true,
    runtimeCaching,
    buildExcludes: [/middleware-manifest\.json$/],
    scope: '/',
    sw: 'service-worker.js',
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development',
  },

  reactStrictMode: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  // images: {
  //   loader: 'imgix',
  //   path: '/',
  // },
  serverRuntimeConfig:
  {
    liffId:'1656555843-E6WV7arj',
    lineUserId:'Ucc91941c54b99372c3c37dbfce7e3a51',
    linePOSId:'U5bcb2afaf17c20551ab5afdcfec5c1d3',
    groupId:'1656555843-E6WV7arj',
    orderId:0,
    companyId:2,
    locationId:2,
    companyName:'',
    locationName:'',
    //secondSecret: process.env.NEXT_PUBLIC_LIFF_ID,
    //orderConfig:'',
    //orderDetailsConfig:''
  },
  images: {
    domains: [
      'coinpos-uat.azurewebsites.net',
      'localhost',
      'profile.line-scdn.net',
      'images.unsplash.com',
      'img.icons8.com',
      'i.ibb.co',
      'i.postimg.cc',
      'fakestoreapi.com',
      'res.cloudinary.com',
      'lh3.googleusercontent.com',
      '',
    ],
  },
});

// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
// });

// module.exports = withBundleAnalyzer({});
