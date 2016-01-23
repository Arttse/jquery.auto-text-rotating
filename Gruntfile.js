module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        doctoc: {
            options: {
                bitbucket: false,
                removeAd: true,
                header: '## Table of Contents'
            },
            toc: {
                options: {
                    target: './README.md'
                }
            }
        },
        jshint: {
            options: {
                reporter: require('jshint-stylish'),
                jshintrc: true
            },
            main: '<%= pkg.name %>.js'
        },
        uglify: {
            options: {
                banner: '/*!\n' +
                '* <%= pkg.description %>\n' +
                '* <%= pkg.repository.url %>\n' +
                '* Copyright (c) 2015-<%= grunt.template.today("yyyy") %> <%= pkg.author.name %>\n' +
                '* Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)\n' +
                '* Version: <%= pkg.version %>\n' +
                '*/\n'
            },
            build: {
                src: '<%= pkg.name %>.js',
                dest: '<%= pkg.name %>.min.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-doctoc');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Default task(s).
    grunt.registerTask('default', ['jshint','uglify']);
};