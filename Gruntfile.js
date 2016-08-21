module.exports = function (grunt) {
    grunt.initConfig({
        nodemon: {
            dev: {
                script: 'start.js',
                options: {
                    args: ['dev'],
                    callback: function (nodemon) {
                        nodemon.on('log', function (event) {
                            console.log(event.colour);
                        });
                    },
                    watch: ['*.js']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('dev', ['nodemon:dev']);
};