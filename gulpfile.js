var gulp = require('gulp'),
      uglify = require('gulp-uglify'),                      //js压缩
      jshint = require('gulp-jshint'),                      //js语法检查
	concat = require('gulp-concat'),                      //合并文件
      // gulpLoadPlugins = require('gulp-load-plugins'),       //包管理
      // plugins = gulpLoadPlugins({
      //       pattern: ['gulp-*', 'gulp.*'],
      //       replaceString: /\bgulp[\-.]/
      // }),
      less = require('gulp-less'),                          //less编译
      cssmin = require('gulp-minify-css'),                  //css压缩
      rename = require('gulp-rename'),                      //重命名
      clean = require('gulp-clean'),                         //清空文件夹
      imgmin = require('gulp-imagemin');                    //图片压缩
gulp.task('default',['cleanAll','less','img','js','html'],function(){
      
      gulp.watch('src/less/*.less',['less']).on('change',function(e){
            console.log('File ' + e.path + ' was ' + e.type + ', running tasks...');
      });
      gulp.watch('src/js/*.js',['js']).on('change',function(e){
            console.log('File ' + e.path + ' was ' + e.type + ', running tasks...');
      });
      gulp.watch('src/img/*',['img']).on('change',function(e){
            console.log('File ' + e.path + ' was ' + e.type + ', running tasks...');
      });
      gulp.watch('src/view/*',['html']).on('change',function(e){
            console.log('File ' + e.path + ' was ' + e.type + ', running tasks...');
      });
})      

gulp.task('less',function(){
      var src = 'src/less/*.less',
          dist =  'dist/css/';
      gulp.src(src)
          .pipe(less())         
          .pipe(cssmin({compatibility: 'ie7'}))
          .pipe(gulp.dest(dist))   
          .pipe(rename({suffix: '.min'}))       
          .pipe(gulp.dest(dist));
      return gulp.start('clean'); 
})
gulp.task('js',function(){
      var src = 'src/js/*.js',
          dist =  'dist/js/';
      gulp.src(src)
            .pipe(jshint())
            .pipe(jshint.reporter('default'))
            .pipe(uglify())
            // .pipe(concat('app.js'))
            .pipe(gulp.dest(dist))
            .pipe(rename({suffix: '.min'}))
            .pipe(gulp.dest(dist));
      return gulp.start('clean');   
})
gulp.task('img',function(){
      var src = 'src/img/*',
          dist = 'dist/img/';
      return gulp.src(src)
            .pipe(imgmin())    
            .pipe(gulp.dest(dist))   
})
gulp.task('html',function(){
      var src = 'src/view/*',
          dist = 'dist/view/';
      return gulp.src(src)
            .pipe(gulp.dest(dist))      
})
gulp.task('clean',function(){
      return gulp.src(['dist/**/*.+(js|css)','!dist/**/*.min.+(js|css)'],{read:false})
            .pipe(clean());
})
gulp.task('cleanAll',function(){
      return gulp.src('dist/*/*')
            .pipe(clean());
})
gulp.task('lib',function(){
      return gulp.src(['bower_components/**/*.min.js','bower_components/**/**/*.min.js'])
            .pipe(rename({dirname:''}))
            .pipe(gulp.dest('lib/'))
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

