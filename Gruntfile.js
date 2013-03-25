/*global module:false*/
module.exports = function(grunt) {

    var setCmd = process.platform === 'win32' ? 'set' : 'export';

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks('grunt-mocha-hack');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-exec');

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            all: {
                src: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
                options: {
                    jshintrc: "jshint.json"
                }
            }
        },
        clean: ["lib", "lib-cov"],
        concat: {
            htmlhint: {
                src: ['src/core.js', 'src/reporter.js', 'src/htmlparser.js', 'src/rules/*.js'],
                dest: 'lib/htmlhint.js'
            }
        },
        "mocha-hack": {
            test: {
                src: "test/**/*.js",
                options: {
                    useColors: true,
                    reporter: 'spec'
                }
            }
        },
        exec: {
            jscover: {
                command: '"./node_modules/.bin/jscover" lib lib-cov',
                stdout: false,
                stderr: false
            },
            savecover: {
                command: setCmd + ' HTMLHINT_COV=1 & "./node_modules/.bin/mocha" --recursive --reporter html-cov > coverage.html'
            }
        },
        uglify: {
            htmlhint: {
                options: {
                    banner: "/*!\r\n * HTMLHint v<%= pkg.version %>\r\n * https://github.com/yaniswang/HTMLHint\r\n *\r\n * (c) 2013 Yanis Wang <yanis.wang@gmail.com>.\r\n * MIT Licensed\r\n */\n",
                    beautify: {
                        ascii_only: true
                    }
                },
                files: {
                    'lib/<%= pkg.name %>.js': ['<%= concat.htmlhint.dest %>']
                }
            }
        },
        replace: {
            htmlhint: {
                files: { 'lib/htmlhint.js':'lib/htmlhint.js'},
                options: {
                    prefix: '@',
                    variables: {
                        'VERSION': '<%= pkg.version %>'
                    }
                }
            }
        },
        watch: {
            src: {
                files: ['src/**/*.js'],
                tasks: 'dev'
            },
            test: {
                files: ['test/**/*.js'],
                tasks: 'test'
            }
        }
    });

    grunt.registerTask('dev', ['jshint', 'concat', 'test']);

    grunt.registerTask('test', 'mocha-hack');

    grunt.registerTask('test-cov', ['exec:jscover', 'exec:savecover']);

    grunt.registerTask('default', ['jshint', 'clean', 'concat', 'test', 'test-cov', 'uglify', 'replace']);

};
