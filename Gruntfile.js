/*global module:false*/
module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-exec');

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            browser: {
                src: ['src/**/*.js'],
                options: {
                    jshintrc: ".jshintrc-browser"
                }
            },
            node: {
                src: ['Gruntfile.js', 'test/**/*.js', 'bin/*'],
                options: {
                    jshintrc: ".jshintrc-node"
                }
            }
        },
        clean: ["lib", "coverage"],
        concat: {
            htmlhint: {
                src: ['src/core.js', 'src/reporter.js', 'src/htmlparser.js', 'src/rules/*.js'],
                dest: 'lib/htmlhint.js'
            }
        },
        exec: {
            test: {
                command: '"./node_modules/.bin/mocha" --recursive',
                stdout: true,
                stderr: true
            },
            cover: {
                command: '"./node_modules/.bin/istanbul" cover "./node_modules/mocha/bin/_mocha" -- --recursive',
                stdout: true,
                stderr: true
            }
        },
        uglify: {
            htmlhint: {
                options: {
                    banner: "/*!\r\n * HTMLHint v<%= pkg.version %>\r\n * https://github.com/yaniswang/HTMLHint\r\n *\r\n * (c) 2014-"+new Date().getFullYear()+" Yanis Wang <yanis.wang@gmail.com>.\r\n * MIT Licensed\r\n */\n",
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
            version: {
                files: {
                    'lib/htmlhint.js':'lib/htmlhint.js'
                },
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
                files: ['src/**/*.js', 'test/**/*.js'],
                tasks: 'dev'
            }
        }
    });

    grunt.registerTask('build', ['jshint', 'clean', 'concat']);

    grunt.registerTask('dev', ['build', 'exec:test']);

    grunt.registerTask('default', ['build', 'exec:cover', 'uglify', 'replace:version']);

};
