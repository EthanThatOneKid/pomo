// Run:
// deno run -A tasks/build_npm.ts $VERSION

import { build, emptyDir } from "https://deno.land/x/dnt@0.33.0/mod.ts";

await emptyDir("./npm");

await build({
  entryPoints: ["./mod.ts"],
  testPattern: "**/*_test.ts",
  outDir: "./npm",
  // see JS docs for overview and more options
  shims: {
    deno: true,
  },
  package: {
    // package.json properties
    name: "pomo",
    version: Deno.args[0],
    description: "Pomodoro utility module.",
    license: "MIT",
    repository: {
      type: "git",
      url: "git+https://github.com/ethanthatonekid/pomo.git",
    },
    bugs: {
      url: "https://github.com/ethanthatonekid/pomo/issues",
    },
  },
});

// post build steps
Deno.copyFileSync("LICENSE", "npm/LICENSE");
Deno.copyFileSync("README.md", "npm/README.md");
