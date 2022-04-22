const esbuild = require("esbuild");
const sassPlugin = require("esbuild-plugin-sass");

esbuild
    .build({
        entryPoints: ["src/dual-listbox.js", "src/dual-listbox.scss"],
        bundle: true,
        minify: true,
        sourcemap: true,
        outdir: "./dist/",
        plugins: [sassPlugin()],
    })
    .catch((e) => console.error(e.message));
