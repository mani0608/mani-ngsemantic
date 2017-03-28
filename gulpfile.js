const pkg = require('./package.json');
const gulp = require('gulp');
const exec = require('child_process').exec;
const del = require ('del');
const runSequence = require('run-sequence');
const tsc = require('gulp-typescript');
const rollup = require('rollup');
const nodeResolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const concat = require('gulp-concat');
const inlineNg2Template = require('gulp-inline-ng2-template');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const replace = require('gulp-replace');



gulp.task('clean', function(){
  return del([
    'dist/node_modules/**',
    'app/**/*.ngfactory.ts',
    'app/**/*.js',
    'app/**/*.json',
    'app/**/*.map'    
  ]);
});

gulp.task('clean:src', function(){
  return del([
    'app/**/*.ngfactory.ts',
    'app/**/*.js',
    'app/**/*.json',
    'app/**/*.map'
  ]);
});


gulp.task('clean:dist', function(){
  return del([
    'assets/**',
    'dist/**'
  ]);
});

gulp.task('watch', function() {
	gulp.watch('app/**/*.ts', ['compile:dev']);
});

gulp.task('compile:dev', function (cb) {
  exec('"node_modules\\.bin\\tsc" -p tsconfig.json', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

gulp.task('rollup:app', function(){
  return rollup.rollup( {
    entry: 'dist/app/main.aot.js',
    onwarn: function (warning) {
      // Skip certain warnings

      // should intercept ... but doesn't in some rollup versions
      if (warning.code === 'THIS_IS_UNDEFINED') { return; }
      // intercepts in some rollup versions
      if ( warning.message.indexOf("The 'this' keyword is equivalent to 'undefined'") > -1 ) { return; }

      // console.warn everything else
      console.warn(warning.message);
    },

    plugins: [
          nodeResolve({
            jsnext: true,
			main: true
          }),
          commonjs({
              include: ['node_modules/rxjs/**',
			  'node_modules/primeng/components/**',
			  'node_modules/ng-semantic/ng-semantic.js']
          })
    ]
  })
  .then(function(bundle) {
      bundle.write( {
        format: "iife",
        dest: "dist/app.bundle.js",
        sourceMap: true
      });
  });
});

gulp.task('bundle:vendor', function() {
    return gulp
        .src([
			"bower_components/jquery/dist/jquery.slim.js",
			"bower_components/tether/dist/js/tether.min.js",
			"bower_components/bootstrap/dist/js/bootstrap.min.js",
            "node_modules/core-js/client/shim.min.js",
            "node_modules/zone.js/dist/zone.js"
        ])
        .pipe(concat("vendor.bundle.js"))
        .pipe(gulp.dest('dist'));

});

gulp.task('compress', function (cb) {
  pump([
    gulp.src([
      'dist/*.bundle.js',
      'dist/*.bundle.*.js',
      '!dist/**/*.map', 
      '!dist/**/*.min.js'
    ]),
    uglify(),
    rename({ suffix: '.min' }),
    gulp.dest('dist')
  ], cb);
});

gulp.task('copy:html', function() {
    gulp.src('index.prod.html')
        .pipe(rename('index.html'))
        .pipe(gulp.dest('dist'));
    return gulp.src('app/**/*.html')
        .pipe(gulp.dest('dist/app'));
});

gulp.task('compile:aot', function (cb) {
  exec('"node_modules\\.bin\\ngc" -p tsconfig.prod.json', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

gulp.task('compile:es6', function () {
  return gulp.src(['./app/**/*.ts'])
    .pipe(inlineNg2Template({ base: '/app', useRelativePaths:true }))
    .pipe(tsc({
      "target": "es5",
      "module": "es6",
      "moduleResolution": "node",
      "experimentalDecorators": true,
      "emitDecoratorMetadata": true,
      "lib": ["es6", "dom"]
    }))
    .pipe(gulp.dest('./dist/app'));
});

gulp.task('bundle:app', function (cb) {
    runSequence('compile:aot', 'compile:es6', 'copy:html', 'rollup:app', cb);
});

gulp.task('bundle:all',['bundle:app','bundle:vendor'], function(cb) {
});

gulp.task('build:app', ['clean:dist', 'clean:src'], function(cb) {
    runSequence(
      'bundle:all',
      'compress',
      'clean', cb);
});

gulp.task('dev', ['compile:dev']);
gulp.task('app', ['build:app']);