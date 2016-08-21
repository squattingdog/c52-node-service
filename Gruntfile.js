module.exports = function (grunt) {
    grunt.initConfig({
        concurrent: {
            dev: {
                tasks: ['nodemon', 'watch'],
                options: {
                    logConcurrentOutput: true
                }
            }
        },
        nodemon: {
            dev: {
                script: 'start.js',
                options: {
                    args: ['dev'],
                    callback: function (nodemon) {
                        nodemon.on('log', function (event) {
                            console.log(event.color);
                        });
                    },
                    watch: ['/**/*.js']
                }
            }
        },
        watch: {}
    });

    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('dev', ['concurrent:dev']);
};