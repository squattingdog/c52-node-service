const gulp = require("gulp");
const sourcemaps = require("gulp-sourcemaps"); // So Istanbul is able to map the code
const tsProject = require("gulp-typescript").createProject("tsconfig.json");
const apidoc = require("gulp-apidoc");
const mocha = require("gulp-mocha");
const spawn = require("child_process").spawn;
const del = require("del");
const tslint = require("gulp-tslint");

let node;

gulp.task("apidoc", (done) => {
    apidoc({
        src: "./routes",
        dest: "../docs/apidoc"
    }, 
    done);
});

gulp.task("clean", () => {
    return del(["./dist/"]);
});

gulp.task("server", (done) => {
    startServer();
    done();
});

gulp.task('test', (done) => {
    var error = false;
    gulp.src('./**/*.spec.ts', { base: '.' })
        .pipe(mocha({ require: ["ts-node/register"] }))
        .on('error', function () {
            console.log('Tests failed!');
            error = true;
        })
        .on('end', function () {
            if (!error) {
                process.exit(0);
            } else {
                process.exit(1);
            }
        });

    done();
});

gulp.task("transpile", () => {
    return tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(tsProject()).js
        .pipe(sourcemaps.write("./maps"))
        .pipe(gulp.dest("./dist"));
});

gulp.task("tslint", () => {
    return tsProject.src()
        .pipe(tslint({
            formatter: "stylish"
        }))
        .pipe(tslint.report());
})

gulp.task("watch", () => {
    return gulp.watch(
        ["./src/**/*.ts", "./typings/*.ts", "./*.env"],
        {
            queue: false,
            ignoreInitial: false // Execute task on startup
        },
        gulp.series(["tslint", "clean", "transpile", "server"])
    );
});

gulp.task("default", gulp.series("transpile"), (done) => {
    done();
});

async function startServer() {
    if (node) {
        node.kill();
    }

    node = await spawn("node", ["./dist/app.js"], { stdio: "inherit" });
    node.on("close", function (code) {
        if (code === 8) {
            gulp.log("Error detected, waiting for changes...");
        }
    });
}

// clean up if an error goes unhandled
process.on("exit", function () {
    if (node) {
        node.kill();
    }
});