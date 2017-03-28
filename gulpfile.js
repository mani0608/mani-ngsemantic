const pkg = require('./package.json');
const gulp = require('gulp');
const exec = require('child_process').exec;
const del = require ('del');
const runSequence = require('run-sequence');
const tsc = require('gulp-typescript');
const rollup = require('rollup');
const nodeResolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');



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

gulp.task('compile:aot', function (cb) {
  exec('"node_modules\\.bin\\ngc" -p tsconfig.prod.json', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

gulp.task('dev', ['compile:dev']);