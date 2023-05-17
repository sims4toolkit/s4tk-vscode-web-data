const fs = require("fs");
const path = require("path");
const glob = require("glob");

const SRC_DIR = path.resolve(__dirname, "..", "src");

const indices = glob.sync(path.join(SRC_DIR, "**", "*.json"));
const contents = glob.sync(path.join(SRC_DIR, "**", "*.html"));
const images = glob.sync(path.join(SRC_DIR, "**", "*.png"));
