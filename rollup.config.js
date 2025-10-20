import fs from 'fs';
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import peerDependencies from 'rollup-plugin-peer-deps-external';

const loadJSON = (path) => JSON.parse(fs.readFileSync(new URL(path, import.meta.url)));

const pkg = loadJSON('./package.json')

export default {
  input: "src/index.ts",
  output: {
    dir: "dist",
    format: "esm",
    sourcemap: true,
    preserveModules: false,
  },
  plugins: [
    peerDependencies(),
    typescript(),
    postcss({
      modules: true,
      extract: true,
      minimize: true,
    }),
  ],
  external: Object.keys(pkg.peerDependencies),
};
