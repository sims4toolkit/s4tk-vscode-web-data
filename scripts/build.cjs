const fs = require("fs");
const path = require("path");
const glob = require("glob");
const htmlMinify = require("html-minifier").minify;

const SRC_DIR = path.resolve(__dirname, "..", "src");
const BUILD_DIR = path.resolve(__dirname, "..", "build");

function getBuildDestination(srcpath) {
  const outpath = srcpath.replace(SRC_DIR, BUILD_DIR);
  const outdir = path.dirname(outpath);
  if (!fs.existsSync(outdir)) fs.mkdirSync(outdir, { recursive: true });
  return outpath;
}

const indices = glob.sync(path.join(SRC_DIR, "**", "*.json"));
const contents = glob.sync(path.join(SRC_DIR, "**", "*.html"));
const images = glob.sync(path.join(SRC_DIR, "**", "*.png"));

indices.forEach((filepath) => {
  const index = JSON.parse(fs.readFileSync(filepath).toString());
  delete index.$schema;
  const minified = JSON.stringify(index);
  fs.writeFileSync(getBuildDestination(filepath), minified);
});

contents.forEach((filepath) => {
  const content = fs.readFileSync(filepath).toString();
  const minified = htmlMinify(content, { collapseWhitespace: true });
  fs.writeFileSync(getBuildDestination(filepath), minified);
});

images.forEach((filepath) => {
  fs.copyFileSync(filepath, getBuildDestination(filepath));
});
