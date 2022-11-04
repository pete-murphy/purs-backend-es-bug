import * as $runtime from "../runtime.js";
import * as Data$dFunction$dUncurried from "../Data.Function.Uncurried/index.js";
import * as Data$dUnit from "../Data.Unit/index.js";
import * as Effect$dConsole from "../Effect.Console/index.js";
import * as Node$dFS$dAsync from "../Node.FS.Async/index.js";
import * as Node$dFS$dStats from "../Node.FS.Stats/index.js";
import * as Node$dFS$dSync from "../Node.FS.Sync/index.js";
const main = () => {
  const a$p = Node$dFS$dSync.statSyncImpl(".");
  (() => {
    if (Node$dFS$dStats.statsMethod("isFile", a$p)) { return Effect$dConsole.log("File."); }
    return Effect$dConsole.log("Not a file.");
  })()();
  return Node$dFS$dAsync.stat(".")(v => {
    if (v.tag === "Right") {
      if (Data$dFunction$dUncurried.runFn0(v._1._1.isDirectory)) { return Effect$dConsole.log("Directory."); }
      return Effect$dConsole.log("Not a directory.");
    }
    return () => Data$dUnit.unit;
  })();
};
export {main};
