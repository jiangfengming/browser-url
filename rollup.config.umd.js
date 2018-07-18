import babel from 'rollup-plugin-babel'

export default {
  input: 'src/index.js',
  output: {
    exports: 'default',
    format: 'umd',
    name: 'Url',
    file: 'dist/Url.umd.js'
  },
  plugins: [
    babel()
  ]
}
