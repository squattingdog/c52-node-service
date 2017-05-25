/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const ts = require('gulp-typescript');
const mocha = require('gulp-mocha');
const JSON_FILES = ['src/*.json', 'src/**/*.json'];

//get project typescript config
const tsProject = ts.createProject('tsconfig.json');

gulp.task('scripts', () => {
    const tsResult = tsProject.src()
    .pipe(tsProject());
    return tsResult.js.pipe(gulp.dest('dist'));
});

gulp.task('nodemon', ['scripts'], function (cb) {
    var started = false;
    return nodemon({
        script: './dist/app.js',
        //watch: ['./src/**/*.ts', './src/**/*.json'],
        //task: ['assets', 'scripts', 'test'],
        args: ['dev']
    }).on('start', function () {
        if (!started) {
            cb();
            started = true;
        }
    });
});

gulp.task('watch', ['scripts'], function() {
    gulp.watch('src/**/*.ts', ['scripts']);
    gulp.watch('test/**/*.ts', ['test']);
    gulp.watch('typings/**/*.ts', ['scripts', 'test']);
    gulp.watch('src/**/*.json', ['assets', 'scripts', 'test']);
});

gulp.task('assets', function () {
    return gulp.src(JSON_FILES)
    .pipe(gulp.dest('dist'));
});

gulp.task('test', function () {
    var error = false;
    gulp.
      src('./test/**/*.ts').
      pipe(mocha({compilers: 'compilers ts:ts-node/register'})).
      on('error', function () {
          console.log('Tests failed!');
          error = true;
      }).
      on('end', function () {
          if (!error) {
              process.exit(0);
          } else {
              process.exit(1);
          }
      });
});

gulp.task('dev', ['assets', 'watch', 'nodemon']);