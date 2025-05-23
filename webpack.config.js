import { resolve, join } from 'node:path';
import HtmlBundlerPlugin from 'html-bundler-webpack-plugin';

function activateClass(activeHref) {
  return activeHref === this.href ? ' active' : '';
}

const setLinks = (activeHref = '') => [
  {
    label: 'home',
    href: '/',
    get active() {
      return activateClass.call(this, activeHref);
    },
  },
  {
    label: 'shop',
    href: 'shop.html',
    get active() {
      return activateClass.call(this, activeHref);
    },
  },
  {
    label: 'blog',
    href: 'blog.html',
    get active() {
      return activateClass.call(this, activeHref);
    },
  },
  {
    label: 'about',
    href: 'about.html',
    get active() {
      return activateClass.call(this, activeHref);
    },
  },
];

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
            title: 'home',
            links: setLinks('/'),
          }, // pass variables into template
        },
        {
          import: 'src/pages/shop.html', // template file
          filename: 'shop.html', // => dist/shop.html
          data: {
            title: 'shop',
            links: setLinks('shop.html'),
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
              { name: 'all', value: 'all' },
              { name: 'new', value: 'new' },
              { name: 'sale', value: 'sale' },
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
            options: ['popular', 'price', 'name', 'sale'],
          }, // pass variables into template
        },

        {
          import: 'src/pages/login.html', // template file
          filename: 'login.html', // => dist/login.html
          data: {
            title: 'login',
          }, // pass variables into template
        },

        {
          import: 'src/pages/card.html', // template file
          filename: 'card.html', // => dist/card.html
          data: {
            title: 'card',
            links: setLinks(),
            images: Array.from({ length: 8 }),
          }, // pass variables into template
        },
      ],

      js: {
        // output filename of compiled JavaScript
        filename: 'scripts/[name].js', // => dist/scripts/main.js
      },
      css: {
        // output filename of extracted CSS
        filename: 'styles/[name].css', // => dist/styles/main.css
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
        use: ['css-loader', 'postcss-loader', 'sass-loader'],
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

      { test: /\.svg$/i, type: 'asset/source' },

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
      '@forms': join(import.meta.dirname, 'src/scripts/forms'),
      '@api': join(import.meta.dirname, 'src/scripts/api'),
      '@states': join(import.meta.dirname, 'src/scripts/states'),
    },
  },

  stats: 'minimal',
};
