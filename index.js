'use strict';

var configure = function (gulp, config) {
    var gulpPlugins = require('gulp-load-plugins')(),
        env = {
            production: gulpPlugins.util.env.production,
            sourceMaps: !gulpPlugins.util.env.production
        };

    require('gulp-help')(gulp);

    if (config.styles) {
        for (var i = 0; i < config.styles.length; i++) {
            var thisBuild = config.styles[i];

            gulp.task('styles', 'Build stylesheets', function () {
                return gulp.src(thisBuild.src)
                .pipe(gulpPlugins.if(env.sourceMaps, gulpPlugins.sourcemaps.init()))
                .pipe(gulpPlugins.sassGlob())
                .pipe(
                    gulpPlugins.sass({
                        includePaths: thisBuild.includePaths
                    }).on('error', gulpPlugins.sass.logError)
                )
                .pipe(
                    gulpPlugins.autoprefixer({
                        browsers: config.browsersList
                    })
                )
                .pipe(gulpPlugins.csso())
                .pipe(gulpPlugins.if(env.sourceMaps, gulpPlugins.sourcemaps.write(thisBuild.sourcemaps)))
                .pipe(gulp.dest(thisBuild.dest));
            }, {
                aliases: ['stylesheets', 'css', 'scss']
            });
        }
    }

    if (config.javascript) {
        for (var i = 0; i < config.javascript.length; i++) {
            var thisBuild = config.javascript[i];

            gulp.task('javascript', 'Compile Javascript', function () {
                return gulp.src(thisBuild.src)
                .pipe(gulpPlugins.if(env.sourceMaps, gulpPlugins.sourcemaps.init()))
                .pipe(gulpPlugins.include())
                .pipe(gulpPlugins.uglify())
                .pipe(gulpPlugins.if(env.sourceMaps, gulpPlugins.sourcemaps.write(thisBuild.sourcemaps)))
                .pipe(gulp.dest(thisBuild.dest));
            }, {
                aliases: ['js']
            });

        }
    }

    gulp.task('watch', 'Watch for changes', function() {
        if (config.styles) {
            for (var i = 0; i < config.styles.length; i++) {
                gulp.watch(config.styles[i].watch, ['styles']);
            }
        }

        if (config.javascript) {
            gulp.watch(config.javascript.watch, ['javascript']);
        }
    });

    gulp.task('assets', 'Build all assets', function() {
        if (config.styles) {
            gulp.start('styles');
        }

        if (config.javascript) {
            gulp.start('javascript');
        }
    });

};

// Expose 'configure'
module.exports.configure = configure;
