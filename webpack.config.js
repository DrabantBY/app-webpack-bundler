import { resolve, join } from 'node:path';
import HtmlBundlerPlugin from 'html-bundler-webpack-plugin';

export default {
  output: {
    path: resolve(import.meta.dirname, 'dist'),
    clean: true,
  },

  plugins: [
    new HtmlBundlerPlugin({
      entry: [
        {
          import: 'src/pages/home.html', // template file
          filename: 'index.html', // => dist/index.html
          data: {
            title: 'Home page',
            links: [
              { label: 'home', href: '/', active: true },
              { label: 'shop', href: 'shop.html' },
              { label: 'blog', href: 'blog.html' },
              { label: 'about', href: 'about.html' },
            ],
            categories: [
              { label: 'house', value: 33 },
              { label: 'potter', value: 12 },
              { label: 'seeds', value: 65 },
              { label: 'succulents', value: 17 },
              { label: 'terrariums', value: 19 },
              { label: 'gardening', value: 13 },
              { label: 'accessories', value: 18 },
            ],
            sizes: [
              { label: 'small', value: 39 },
              { label: 'medium', value: 86 },
              { label: 'large', value: 23 },
            ],
            tabs: [
              { name: 'all plants', active: true },
              { name: 'new arrivals', active: false },
              { name: 'sale', active: false },
            ],
            plants: [
              { name: 'barberton daisy', price: 119, discount: 25 },
              { name: 'angel wing begonia', price: 169, discount: null },
              { name: 'african violet', price: 199, discount: null },
              { name: 'blushing bromeliad', price: 139, discount: 13 },
              { name: 'aluminum plant', price: 179, discount: null },
              { name: "bird's nest fern", price: 199, discount: null },
              { name: 'broadleaf lady palm', price: 59, discount: null },
              { name: 'chinese evergreen', price: 39, discount: null },
            ],
          }, // pass variables into template
        },
        {
          import: 'src/pages/shop.html', // template file
          filename: 'shop.html', // => dist/about.html
          data: {
            title: 'Shop page',
            links: [
              { label: 'home', href: '/' },
              { label: 'shop', href: 'shop.html', active: true },
              { label: 'blog', href: 'blog.html' },
              { label: 'about', href: 'about.html' },
            ],
          }, // pass variables into template
        },
      ],

      js: {
        // output filename of compiled JavaScript
        filename: 'scripts/main.js', // => dist/scripts/main.js
      },
      css: {
        // output filename of extracted CSS
        filename: 'styles/main.css', // => dist/styles/main.css
      },
      // preprocessor: 'nunjucks',
      preprocessor: 'nunjucks',
      preprocessorOptions: {
        // an array of relative or absolute templates paths, defaults the current working directory
        views: ['src/pages/templates', 'src/pages/chunks'],
        async: false, // defaults 'false'
        jinjaCompatibility: false, // installs support for Jinja compatibility, defaults 'false'
        // here are original Nunjucks options
        autoescape: true, // escape dangerous characters, defaults 'true'
      },
    }),
  ],

  module: {
    rules: [
      {
        test: /\.(s?css)$/i,
        use: ['css-loader', 'sass-loader'],
      },

      {
        test: /\.(ico|png|jp?g|webp|tiff|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/img/[name][ext]',
        },
      },

      {
        test: /\.(svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/svg/[name][ext]',
        },
      },

      {
        test: /\.(woff2?|eot|[ot]tf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name][ext]',
        },
      },
    ],
  },

  devServer: {
    open: true,
    compress: true,
    static: {
      directory: join(import.meta.dirname, 'dist'),
    },
    watchFiles: {
      paths: ['src/**/*.*'],
      options: {
        usePolling: true,
      },
    },
  },

  devtool: 'eval-source-map',

  resolve: {
    extensions: ['.js'],
    alias: {
      '@img': join(import.meta.dirname, 'src/assets/img'),
      '@svg': join(import.meta.dirname, 'src/assets/svg'),
      '@fonts': join(import.meta.dirname, 'src/assets/fonts'),
      '@styles': join(import.meta.dirname, 'src/styles'),
      '@scripts': join(import.meta.dirname, 'src/scripts'),
      '@common': join(import.meta.dirname, 'src/scripts/common'),
      '@tools': join(import.meta.dirname, 'src/scripts/common/tools'),
      '@const': join(import.meta.dirname, 'src/scripts/common/const'),
      '@handlers': join(import.meta.dirname, 'src/scripts/common/handlers'),
      '@filters': join(import.meta.dirname, 'src/scripts/filters'),
      '@api': join(import.meta.dirname, 'src/scripts/api'),
    },
  },

  stats: 'minimal',
};
