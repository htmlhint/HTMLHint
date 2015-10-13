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
                        'VERSION': '<%= pkg.version %>',
                        'RELEASE': dateFormat('yyyyMMdd')
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

    function dateFormat(date, format) {
        if(format === undefined){
            format = date;
            date = new Date();
        }
        var map = {
            "M": date.getMonth() + 1, //月份
            "d": date.getDate(), //日
            "h": date.getHours(), //小时
            "m": date.getMinutes(), //分
            "s": date.getSeconds(), //秒
            "q": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds() //毫秒
        };
        format = format.replace(/([yMdhmsqS])(\1)*/g, function(all, t){
            var v = map[t];
            if(v !== undefined){
                if(all.length > 1){
                    v = '0' + v;
                    v = v.substr(v.length-2);
                }
                return v;
            }
            else if(t === 'y'){
                return (date.getFullYear() + '').substr(4 - all.length);
            }
            return all;
        });
        return format;
    }

};
