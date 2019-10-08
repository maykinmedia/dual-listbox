const gulp = require('gulp');
const jsdoc2md = require('jsdoc-to-markdown');
const path = require('path');
const through = require('through2');
const Vinyl = require('vinyl');
const paths = require('../paths');

/**
 * Gulp implementation for jsdoc-to-markdown.
 * @return {Stream} A stream containing Vinyl files to be written down with gulp.dest().
 */
function gulpJsdoc2md(cb) {
    /**
     * Creates a stream using through2, each file in the stream is turned into an entry in files.
     * @param {Object} files  Array of files currently in buffer.
     * @return {Stream}
     */
    const createStream = (files) => {
        return through.obj((file, enc, cb) => {
            files.push(file);
            cb();
        });
    };
    const createVinylFiles = (files, stream) => {
        files.forEach(file => {
            const fileinfo = path.parse(file.path);

            const vinylFile = new Vinyl({
                path: fileinfo.name + '.md',
                contents: new Buffer.from(jsdoc2md.renderSync({files: file.path}))
            });
            stream.push(vinylFile);
        });
        cb();
    };


    const files = [];
    const stream = createStream(files);
    stream._flush = createVinylFiles.bind(stream, files, stream);
    return stream;

}


/**
 * doc task
 * Run using "gulp jsdoc"
 * Generates documentation files
 */
function jsdoc(cb) {
    return gulp.src([paths.source])
        .pipe(gulpJsdoc2md(cb))
        .pipe(gulp.dest(paths.doc));
    // cb();
}

gulp.task('jsdoc', jsdoc);
exports.jsdoc = jsdoc;
