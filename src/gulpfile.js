"use strict";

const gulp = require("gulp");
const concat = require("gulp-concat");
const sass = require("gulp-sass")(require("sass"));
const cleanCSS = require("gulp-clean-css");
const prefixer = require("gulp-autoprefixer");
const browserSync = require("browser-sync").create();
const bump = require("gulp-bump");
const header = require("gulp-header");
const fs = require("fs");
const uglify = require("gulp-uglify");

var pkg;

const banner = {
	theme:
		"/**\n" +
		" * Theme Name: Caille Blanc Villa 2024\n" +
		" * Version: <%= pkg.version %>\n" +
		" * Author: <%= pkg.author %>\n" +
		" */\n",
};
function getJson(done) {
	pkg = JSON.parse(fs.readFileSync("./package.json", "utf8"));
	done();
}
function bumpVersion() {
	return gulp
		.src("./package.json")
		.pipe(bump({ type: "patch" }))
		.pipe(gulp.dest("./"));
}

function css() {
	return gulp
		.src("./sass/app.scss")
		.pipe(sass())
		.pipe(prefixer())
		.pipe(concat("./style.css"))
		.pipe(cleanCSS("./style.css"))
		.pipe(header(banner.theme, { pkg: pkg }))
		.pipe(gulp.dest("../", { overwrite: true }))
		.pipe(browserSync.stream());
}
function js() {
	return gulp
		.src("./js/*.js")
		.pipe(concat("app.js"))
		.pipe(uglify())
		.pipe(gulp.dest("../", { overwrite: true }))
		.pipe(browserSync.stream());
}
function watchFiles() {
	browserSync.init({
		server: {
			baseDir: "./",
		},
	});
	gulp.watch("./sass/**/*.scss", css);
	gulp.watch("../index.html").on("change", browserSync.reload);
	gulp.watch("../stays.html").on("change", browserSync.reload);
	gulp.watch("./js/*.js", js);
}
const watch = gulp.series(bumpVersion, getJson, watchFiles);
const build = gulp.series(gulp.parallel(css, js));

exports.css = css;
exports.bumpVersion = bumpVersion;
exports.build = build;
exports.watch = watch;
exports.bump = bumpVersion;
exports.default = watch;
