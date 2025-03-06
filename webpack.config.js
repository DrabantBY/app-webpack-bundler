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
          data: { title: 'Home page' }, // pass variables into template
        },
        {
          import: 'src/pages/about.html', // template file
          filename: 'about.html', // => dist/about.html
          data: { title: 'About page' }, // pass variables into template
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
        views: ['src/pages/chunks', 'src/pages/templates'],
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
      '@scripts': join(import.meta.dirname, 'src/scripts'),
      '@styles': join(import.meta.dirname, 'src/styles'),
    },
  },

  stats: 'minimal',
};
