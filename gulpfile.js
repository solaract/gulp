var gulp = require('gulp'),
      // uglify = require('gulp-uglify'),                      //js压缩
      // jshint = require('gulp-jshint'),                      //js语法检查
	// concat = require('gulp-concat'),                      //合并文件
      gulpLoadPlugins = require('gulp-load-plugins'),       //包管理
      plugins = gulpLoadPlugins();
      // less = require('gulp-less'),                          //less编译
      // cssmin = require('gulp-minify-css'),                  //css压缩
      // rename = require('gulp-rename'),                      //重命名
      // clean = require('gulp-clean'),                         //清空文件夹
      // imgmin = require('gulp-imagemin');                    //图片压缩
gulp.task('defalut',function(){
      
      gulp.watch('less/*.less',['less']);
      gulp.watch('js/*.js',['js']);
})      

gulp.task('less',function(){
      return gulp.src('less/*.less')
          .pipe(plugins.less())
          .pipe(plugins.cssmin({compatibility: 'ie7'}))
          .pipe(gulp.dest('min/css/'))   
          .pipe(plugins.rename({suffix: '.min'}))       
          .pipe(gulp.dest('css/'));
})
gulp.task('js',function(){
      return gulp.src('js/*.js')
            .pipe(plugins.jshint())
            .pipe(plugins.jshint.reporter('default'))
            .pipe(plugins.uglify())
            // .pipe(plugins.concat('app.js'))
            .pipe(gulp.dest('min/js/'))
            .pipe(plugins.rename({suffix: '.min'}))
            .pipe(gulp.dest('js/'))
})
gulp.task('clean',function(){
      return gulp.src('min',{read:false})
            .pipe(plugins.clean());
})
// gulp.task('default', function () {
//    return gulp.src('js/*.+(js|css)')
//       .pipe(jshint())
//       .pipe(jshint.reporter('default'))
//       .pipe(uglify())
//       .pipe(concat('app.js'))
//       .pipe(gulp.dest('build'));
// });

// gulp.task('default', function () {
//    return gulp.src('js/*.+(js|css)')
//       .pipe(plugins.jshint())
//       .pipe(plugins.jshint.reporter('default'))
//       .pipe(plugins.uglify())
//       .pipe(plugins.concat('app.js'))
//       .pipe(gulp.dest('build'));
// });

