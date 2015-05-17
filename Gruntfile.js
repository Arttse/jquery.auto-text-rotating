module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: ["<%= pkg.name %>.min.js"],
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
                '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>\n' +
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

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Default task(s).
    grunt.registerTask('default', ['jshint','clean','uglify']);
};