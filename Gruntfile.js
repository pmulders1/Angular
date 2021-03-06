module.exports = function(grunt) {
    grunt.initConfig({
        browserify: {
            js: {
                src: 'app/js/app.js',
                dest: 'dist/js/app.js',
                options: {
                    external: ['angular'],
                    debug: true,
                    browserifyOptions: { debug: true }
                }
            }
        },
        copy: {
            all: {
                expand: true,
                cwd: 'app/',
                src: ['**/*.html', '**/*.css', '**/*.png'],
                dest: 'dist/'
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'expanded',
                    compass: true
                },
                files: {
                    'dist/css/style.css'        : 'app/css/style.scss',
                    'dist/css/montserrat.css'   : 'app/css/font/montserrat.scss',
                    'dist/css/architects.css'   : 'app/css/font/architects.scss',
                    'dist/css/indie.css'        : 'app/css/font/indie.scss',
                    'dist/css/josefin.css'      : 'app/css/font/josefin.scss',
                    'dist/css/titillium.css'    : 'app/css/font/titillium.scss',
                }
            }
        },
        watch: {
            js: {
                files: "app/**/*.js",
                tasks: "browserify"
            },
            html: {
                files: 'app/**/*.html',
                tasks: 'copy'
            },
            css: {
                files: 'app/**/*.scss',
                tasks: 'sass'
            },
            images: {
                files: 'app/**/*.png',
                tasks: 'copy'
            }
        },
        'http-server': {
            dev: {
                root: './dist',
                port: 3000,
                openBrowser : true,
                runInBackground: true
            }
        }
    });

    // Load the npm installed tasks
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-http-server');
    grunt.loadNpmTasks('grunt-contrib-sass');    

    // The default tasks to run when you type: grunt
    grunt.registerTask('default', ['browserify', 'copy', 'sass',  'http-server', 'watch']);
};