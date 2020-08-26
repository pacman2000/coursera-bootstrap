var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create(); 
var del = require('del');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var usemin = require('gulp-usemin');
var rev = require('gulp-rev');
var cleanCss = require('gulp-clean-css');
var flatmap = require('gulp-flatmap');
var htmlmin = require('gulp-htmlmin');


gulp.task('sass', function (done) {
    gulp.src('./scss/*.scss') //source = ruta de los archivos SCSS
    .pipe(sass().on('error', sass.logError)) //ponemos el callback error
    .pipe(gulp.dest('./css')); //destino de los css   
    done();
});
 
gulp.task('sass:watch', function () {
    gulp.watch('./scss/*.scss', gulp.series('sass'));  
}); 

//tarea browser: busca los archivos html, css,... y recarga nuestra tarea
gulp.task('browser-sync', function () {
    var files = ['./*.html', './css/*.css', './scss/*.scss','./img/*.{png, jpg, gif}', './js/*.js'];
    browserSync.init(files,{
        server: {
            baseDir: './'
        }
    });
}); 

//tarea default que con un único paso levanta el sitio web. indicamos que corra la tarea del browser-sync e immediatamente ejecute el sass:watch para ver los cambios
gulp.task('default', gulp.series('browser-sync'), function(){
    gulp.start('sass:watch');
});

gulp.task('clean', function(){
    return del(['dist']);
});

gulp.task('copyfonts', function(){
    return gulp.src('./node_modules/open-iconic/font/fonts/*.{ttf,woff,eof,svg,eot,otf}*') 
    .pipe(gulp.dest('./dist/fonts'));     
});

gulp.task('imagemin', function(done){
    gulp.src('./images/*.{png,jpg,jpeg,gif}') 
    .pipe(imagemin({optimizationLevel: 3, progressive: true, interlaced: true})) 
    .pipe(gulp.dest('./dist/images')); 
    done();
});

gulp.task('usemin', function(){
    return gulp.src('*.html') 
    .pipe(flatmap(function(stream, file){
        return stream
            .pipe(usemin({
                css: [rev()],
                html: [function() {return htmlmin({collapseWhitespace:true})}],
                js: [uglify(), rev()],
                inlinejs: [uglify()],
                inlinecss: [cleanCss(), 'concat']
            }));
    }))
    .pipe(gulp.dest('dist/')); 
});

gulp.task('build', gulp.series('clean', 'copyfonts','imagemin', 'usemin'));
