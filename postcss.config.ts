export default {
  plugins: {
    'postcss-pxtorem': {
      rootValue: 100, // 750 设计稿：1rem = 100px
      propList: ['*'],
      exclude: /node_modules/
    }
  }
}

