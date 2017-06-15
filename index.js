module.exports = function(gulp, config) {
    var gulpPlugin = require('gulp-load-plugins')();

    require('gulp-help')(gulp);

    gulp.task('css', 'Build stylesheets', function () {
        "use strict";

        return gulp.src(config.gulp.styles.src)
            .pipe(gulpPlugin.sassGlob())
            .pipe(
                gulpPlugin
                    .sass({
                        outputStyle: 'expanded',
                        includePaths: config.gulp.styles.includePaths
                    })
                    .on('error', gulpPlugin.sass.logError)
            )
            .pipe(
                gulpPlugin.autoprefixer({
                    browsers: ['last 2 versions', '> 5%'],
                    cascade: false
                })
            )
            .pipe(gulpPlugin.csso())
            .pipe(gulp.dest(config.gulp.styles.dest));

    }, {
        aliases: ['stylesheets', 'styles', 'scss']
    });

    return gulp;
};
