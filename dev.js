// tools for development only
// SVG: https://github.com/ben-eb/metalsmith-svgo

var metalsmith = require('metalsmith')
var collections = require('metalsmith-collections');
var markdown = require('metalsmith-markdown')
var sass = require('metalsmith-sass')
var browserSync = require('metalsmith-browser-sync')
var ignore = require('metalsmith-ignore')
var htmlMinifier = require('metalsmith-html-minifier')
var layouts = require('metalsmith-layouts')
var uglify = require('metalsmith-uglify')
var autoprefixer = require('metalsmith-autoprefixer')
var sitemap = require('metalsmith-sitemap')
var robots = require('metalsmith-robots')
var config = require('./config')
var clear_collections = require("./clear-collections"); //  metalsmith-collection dublication bug workaround

metalsmith(__dirname)
  .metadata({
    sitename: config.site_title,
    siteurl: config.dev_siteurl,
    style_sheet: config.style_sheet,
    googleanalytics: config.google_analytics_key,
    facebook_appid: config.facebook_appid,
    siteurl_fb_img: config.prod_siteurl_fb_img
  })
  .source('src')
  .destination('build')
  .clean(true)
  .use(markdown())
  .use(clear_collections(["test", "profile"])) //metalsmith-collection dublication bug workaround
  .use(collections({  // Used for navigation purposes
    test: {
      pattern: 'test/**/*.html',
      refer: false, // skip adding the "next" and "previous" links to your articles
      sortBy: 'eile',
    },
    profile: {
      refer: false, // skip adding the "next" and "previous" links to your articles
      sortBy: 'eile',
    }
  }))
  // .use(ignore([]))
  // .use( function(files, ms, done){
  //  // console.log(ms._metadata.collections.lektorius[0].contents.toString())
  //   console.log('files', files)
  //   done()
  // })
  .use(layouts({
    engine: 'pug',
    directory: 'layouts',
    // pretty: true // 'false' minifies HTML
  }))
  .use(sass({ // Options https://github.com/sass/node-sass
    outputDir: 'css',
    outputStyle: 'compressed', //Values: nested, expanded, compact, compressed
    includePaths: ['sass', 'sass/partials']
  }))
  .use(autoprefixer())
  .use(browserSync({
    server: 'build',
    browser: ['chrome'],
    // browser: ["chrome", "iexplore", "firefox"]
    files: ['src/**/*.scss', 'src/**/*.md', 'layouts/**/*.pug']
  }))
  .use(ignore(['test/**/*.html']))
  .build(function (err) {
    if (err) throw err
  })