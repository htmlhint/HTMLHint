/*global module:false*/
module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: ["lib"],
        concat: {
            htmlhint: {
                src: ['src/core.js', 'src/reporter.js', 'src/htmlparser.js', 'src/rules/*.js'],
                dest: 'lib/htmlhint.js'
            }
        },
        uglify: {
            htmlhint: {
                options: {
                    banner: "/*! HTMLHint v<%= pkg.version %> | (c) 2013 Yanis Wang <yanis.wang@gmail.com>.\r\nMIT Licensed */\n",
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
                files: { 'lib/':'lib/htmlhint.js'},
                options: {
                    prefix: '@',
                    variables: {
                        'VERSION': '<%= pkg.version %>'
                    }
                },
            }
        },
        watch: {
            src: {
                files: 'src/**/*.js',
                tasks: 'concat',
            }
        }
    });

    // Default task.
    grunt.registerTask('default', ['clean', 'concat', 'uglify', 'replace']);

};
