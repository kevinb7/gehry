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
