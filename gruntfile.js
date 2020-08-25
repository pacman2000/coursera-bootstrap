module.exports = function (grunt) {
    require('time-grunt')(grunt);
    require('jit-grunt')(grunt,{useminPrepare:'grunt-usemin'});    
 
    grunt.initConfig({
        sass:{
            dist:{
                files: [{
                    expand: true,
                    cwd: 'css',
                    src: ['*.scss'],
                    dest: 'css',
                    ext: '.css'
                }]
            }
        },

        watch:{            
            files: ['css/*.scss'],
            tasks: ['css']
        },

        browserSync: {
            dev:{
                bsFiles: { //browser files (qué archivos mirar)
                    src: [
                        'css/*.css',
                        '*.html',
                        'js/*.js'
                    ]
                },
                options: { 
                    watchTask: true,
                    server: {
                        baseDir: './' //Directorio base para nuestro servidor
                    }                        
                }
            }
        },

        imagemin: {
            dynamic:{
                files: [{
                    expand: true,
                    cwd: './',
                    src: ['images/*.{png,gif,jpg,jpeg}'],
                    dest: 'dist'
               }]
            }
        },

        copy: {
            html:{
                files: [{
                    expand: true,
                    dot: true,
                    cwd: './',
                    src: ['*.html'],
                    dest: 'dist'
               }]
            },
            fonts: {
                files: [{
                    //for font-awesome
                    expand: true,
                    dot: true,
                    cwd: '//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
                    src: ['fonts/*.*'],
                    dest: 'dist'
               }]
            }
        },

        clean: {
            build: {
                src: ['dist/']
            }
        },

        cssmin: {
            dist: {}
        },

        uglify: {
            dist: {}
        },

        filerev: {
            options: {
                encoding: 'utf8',
                algorithm: 'md5',
                lenght: 20
            },

            release: {
                //filerev:release hashes (md5) all asssets (images, js and css) in dist directory
                files: [{
                    src: [
                        'dist/js/*.js',
                        'dist/css/*.css',
                    ]
                }]
            }
        },

        concat: {
            options: {
                separator: ';'
            },
            dist: {}
        },

        useminPrepare: {
            foo: {
                dest: 'dist',
                src: ['index.html', 'about.html', 'contact.html','services.html']
            },
            options: {
                flow: {
                    steps: {
                        css: ['cssmin'],
                        js: ['uglify']
                    },
                    post: {
                        css: [{
                            name: 'cssmin',
                            createConfig: function(context, block){
                                var generated = context.options.generated;
                                generated.options = {
                                    keepSpecialComments: 0,
                                    rebase: false
                                }
                            } 
                        }]
                    }
                }
            }
        },

        usemin: {
            html: ['dist/index.html', 'dist/about.html', 'dist/contact.html', 'dist/services.html'],
            options: {
                assetsDir: ['dist', 'dist/css', 'dist/js']
            }
        }
        
    });
 
    // Where we tell Grunt we plan to use some plug-ins.
    //grunt.loadNpmTasks('grunt-contrib-xxxx');   

    /* Al añadir grunt-usemin podemos eliminar todas las loadNpmTasks y añadir grunt.registerTask('build', ...
    
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch'); 
    grunt.loadNpmTasks('grunt-browser-sync'); 
    grunt.loadNpmTasks('grunt-contrib-imagemin'); */ 



    // Where we tell Grunt what to do when we type "grunt" into the terminal.
    //grunt.registerTask('default', ['xxxx']);
    grunt.registerTask('css', ['sass']);
    grunt.registerTask('default', ['browserSync', 'watch']);
    grunt.registerTask('img:compress', ['imagemin']);
    grunt.registerTask('build', [
        'clean',
        'copy',
        'imagemin',
        'useminPrepare',
        'concat',
        'cssmin',
        'uglify',
        'filerev',
        'usemin'
    ]);
};