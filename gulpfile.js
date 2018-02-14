'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var runSequence = require('run-sequence');
var browserSync = require('browser-sync').create();
var del = require('del');
var fs = require('fs');

var
  source = 'source/',
  dest = 'dest/';

var options = {
  del: [
    'dest'
  ],
  browserSync: {
    server: {
      baseDir: dest
    }
  },
  htmlPrettify: {
    'indent_size': 2,
    'unformatted': ['pre', 'code'],
    'indent_with_tabs': false,
    'preserve_newlines': true,
    'brace_style': 'expand',
    'end_with_newline': true
  }
}

var scss = {
  sassOpts: {
    outputStyle: 'nested',
    precison: 3,
    errLogToConsole: true,
    includePaths: [
      './node_modules/bootstrap/scss/',
      './node_modules/font-awesome/scss/',
      './node_modules/slick-carousel/slick/'
    ]
  }
};


// fonts
var fonts = {
  in: [
    source + 'fonts/*.*',
    './node_modules/font-awesome/fonts/*', source + 'fonts-2/**/*',
    './node_modules/slick-carousel/slick/fonts/*'
  ],
  out: dest + 'fonts/'
};
var slickFonts = {
  in: [
    './node_modules/slick-carousel/slick/fonts/*',
  ],
  out: dest + 'css/fonts/'
};

// js
var js = {
  in: [
    source + 'js/*.*',
    './node_modules/jquery/dist/jquery.min.js',
    './node_modules/bootstrap/dist/js/bootstrap.min.js',
    './node_modules/slick-carousel/slick/slick.min.js',
    './node_modules/scrollreveal/dist/scrollreveal.min.js'
  ],
  out: dest + 'js/'
};




/**
 * Tasks
 * Allow add filter
 *
 */
gulp.task('browser-sync', function() {
  return browserSync.init(options.browserSync);
});

gulp.task('watch', function (cb) {
  $.watch(source + '/sass/**/*.scss', function () {
    gulp.start('compile-styles');
  });

  $.watch([source + '/*.html',source + '/**/*.html'], function () {
    return runSequence('compile-pages', browserSync.reload);
  })

  $.watch(source + '/**/*.js', function () {
    return runSequence('compile-js', browserSync.reload);
  })
})

// copy js
gulp.task('js', function () {
  return gulp
    .src(js.in)
    .pipe(gulp.dest(js.out));
});

// copy font
gulp.task('fonts', function () {
  return gulp
    .src(fonts.in)
    .pipe(gulp.dest(fonts.out));
});

gulp.task('slickFonts', function () {
  return gulp
    .src(slickFonts.in)
    .pipe(gulp.dest(slickFonts.out));
});

// = Delete
gulp.task('cleanup', function (cb) {
  return del(options.del, cb);
});


// = Main tasks
gulp.task('build', function (cb) {
  return runSequence(
    'cleanup',
    'compile-images',
    'compile-styles',
    'compile-js',
    'build-html',
    cb
    );
});

// = Build Style

gulp.task('compile-styles',['fonts', 'slickFonts'], function (cb) {
  return gulp.src([
    source + '/sass/*.scss',
    '!'+ source +'/sass/_*.scss'
  ])
  .pipe($.sourcemaps.init())
  .pipe($.sass(scss.sassOpts)
    .on('error', $.sass.logError))
  .pipe($.autoprefixer('last 2 versions'))
  .pipe($.concat('main.css'))
  .pipe($.sourcemaps.write('./', {
    includeContent: false,
    sourceRoot: source + '/sass'
  }))
  .pipe(gulp.dest(dest + '/css'))
  .pipe(browserSync.stream());
})

// = Build HTML

gulp.task('compile-pages', function (cb) {
  return gulp.src(['*.html', '!_*.html'], {cwd: 'source'})
  .pipe($.prettify(options.htmlPrettify))
  .pipe(gulp.dest(dest));

})

gulp.task('build-html', function (cb) {
  return runSequence(
    'compile-pages',
    cb
  );
});


// = Build JS

gulp.task('compile-js', ['js'], function() {
  return gulp.src(["*.js", "!_*.js"], {cwd: 'source/js'})
  .pipe($.include(options.include))
  .pipe(gulp.dest(dest + '/js'));
});


// = Build image
gulp.task('compile-images', function() {
  return gulp.src(source + "/images/*.*")
  .pipe($.jshint())
  .pipe($.jshint.reporter('default'))
  .pipe(gulp.dest(dest + '/images'));
});


// ================ Develop

gulp.task('dev', function (cb) {
  return runSequence(
    'build',
    [
    'browser-sync',
    'watch'
    ],
    cb
    )
})
