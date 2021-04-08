const withImages = require('next-images')

module.exports = withImages({
  inlineImageLimit: false,
  future: {
    webpack5: true,
  },
})
