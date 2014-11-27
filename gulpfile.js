var gulp = require("gulp");
var testee = require("testee");

gulp.task("test", function() {
    testee.test(["test/runner.html"], ["firefox"], { browsers: "firefox" })
        .then(function() {
            process.exit(0);
        }, function() {
            process.exit(1);
        });
});

var browserify = require('browserify');
var source = require('vinyl-source-stream');
var tsc = require("gulp-tsc");

gulp.task("build-browser", function () {
    return browserify({ extensions: ['.ts'], standalone: 'teleporter' })
      .plugin('tsify', { target: 'ES5', removeComments: true })
      .add('./src/teleporter.ts')
      .bundle()
      .pipe(source('teleporter.js'))
      .pipe(gulp.dest('./dist'));
});

gulp.task("build-node", function () {
    gulp.src(['src/**/*.ts'])
      .pipe(tsc({ target: 'ES5', removeComments: true, declaration: true }))
      .pipe(gulp.dest('./lib'))
});

gulp.task("default", ["build-node", "build-browser"]);
