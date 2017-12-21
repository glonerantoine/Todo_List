var browserSync = require("browser-sync");
var gulp = require("gulp");
var gulpCleanCss = require("gulp-clean-css");
var gulpSass = require("gulp-sass");
var gulpUglify = require("gulp-uglify");
var mergeStream = require("merge-stream");

gulp.task("materialize",function(){
	gulp.src("./node_modules/materialize-css/dist/css/materialize.min.css")
	.pipe(gulp.dest("dist/css/"));
});


gulp.task("ScriptJS", function(){
	var jquery = gulp.src("./node_modules/jquery/dist/css/jquery.min.css")
	.pipe(gulp.dest("./dist/js/"));

	var materialize = gulp.src("./node_modules/materialize-css/dist/js/materialize.min.js")
	.pipe(gulp.dest("./dist/js/"));

	return mergeStream(jquery, materialize);
});


gulp.task("sass", function(){
	return gulp.src("./assets/scss/*.scss")
	.pipe(gulpSass())                   // transforme le scss en css
	.pipe(gulpCleanCss())           // action pour minimifier
	.pipe(gulp.dest("./dist/css/")) // export
});


gulp.task("uglify", function(){  
	gulp.src("./assets/js/*.js")   //minimifiez le js
	.pipe(gulpUglify())          //action pour minimifier
	.pipe(gulp.dest("./dist/js/")) //export

});


gulp.task("browser-sync", function(){
	browserSync.init({ // initialise browser-sync
		server:"./"    // pour le dossier courant
	});
});


gulp.task("gulpWatch",["materialize","ScriptJS","sass","uglify","browser-sync"], function(){
	gulp.watch("assets/scss/*.scss",["sass"]).on("change", browserSync.reload)
	gulp.watch("assets/js/*.js",["uglify"]).on("change", browserSync.reload)
	gulp.watch('./*.html').on("change", browserSync.reload)
});

gulp.task("default",["gulpWatch"]);