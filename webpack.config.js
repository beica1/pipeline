const path = require('path')

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: [
      path.join(__dirname, 'lib'),
      path.join(__dirname, 'src')
    ]
  }
}
