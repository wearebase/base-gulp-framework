'use strict';

var configure = function (gulp, config) {
    var gulpPlugin = require('gulp-load-plugins')(),
        env = {
            production: gulpPlugin.util.env.production,
            sourceMaps: !gulpPlugin.util.env.production
        };

    require('gulp-help')(gulp);

    if (config.styles) {
        for (var i = 0; i < config.styles.length; i++) {
            var thisBuild = config.styles[i];

            gulp.task('styles', 'Build stylesheets', function () {
                return gulp.src(thisBuild.src)
                .pipe(gulpPlugin.if(env.sourceMaps, gulpPlugin.sourcemaps.init()))
                .pipe(gulpPlugin.sassGlob())
                .pipe(
                    gulpPlugin.sass({
                        includePaths: thisBuild.includePaths
                    }).on('error', gulpPlugin.sass.logError)
                )
                .pipe(
                    gulpPlugin.autoprefixer({
                        browsers: config.browsersList
                    })
                )
                .pipe(gulpPlugin.csso())
                .pipe(gulpPlugin.if(env.sourceMaps, gulpPlugin.sourcemaps.write(thisBuild.sourcemaps)))
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
                .pipe(gulpPlugin.if(env.sourceMaps, gulpPlugin.sourcemaps.init()))
                .pipe(gulpPlugins.include())
                .pipe(gulpPlugins.uglify())
                .pipe(gulpPlugin.if(env.sourceMaps, gulpPlugin.sourcemaps.write(thisBuild.sourcemaps)))
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
