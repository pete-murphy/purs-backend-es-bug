import * as $runtime from "../runtime.js";
import * as Data$dList$dTypes from "../Data.List.Types/index.js";
const $KickUp = (_1, _2, _3) => ({tag: "KickUp", _1, _2, _3});
const $Set = (tag, _1, _2, _3, _4, _5) => ({tag, _1, _2, _3, _4, _5});
const $TreeContext = (tag, _1, _2, _3, _4) => ({tag, _1, _2, _3, _4});
const Leaf = /* #__PURE__ */ $Set("Leaf");
const Two = value0 => value1 => value2 => $Set("Two", value0, value1, value2);
const Three = value0 => value1 => value2 => value3 => value4 => $Set("Three", value0, value1, value2, value3, value4);
const TwoLeft = value0 => value1 => $TreeContext("TwoLeft", value0, value1);
const TwoRight = value0 => value1 => $TreeContext("TwoRight", value0, value1);
const ThreeLeft = value0 => value1 => value2 => value3 => $TreeContext("ThreeLeft", value0, value1, value2, value3);
const ThreeMiddle = value0 => value1 => value2 => value3 => $TreeContext("ThreeMiddle", value0, value1, value2, value3);
const ThreeRight = value0 => value1 => value2 => value3 => $TreeContext("ThreeRight", value0, value1, value2, value3);
const KickUp = value0 => value1 => value2 => $KickUp(value0, value1, value2);
const fromZipper = fromZipper$a0$copy => fromZipper$a1$copy => {
  let fromZipper$a0 = fromZipper$a0$copy, fromZipper$a1 = fromZipper$a1$copy, fromZipper$c = true, fromZipper$r;
  while (fromZipper$c) {
    const v = fromZipper$a0, tree = fromZipper$a1;
    if (v.tag === "Nil") {
      fromZipper$c = false;
      fromZipper$r = tree;
      continue;
    }
    if (v.tag === "Cons") {
      if (v._1.tag === "TwoLeft") {
        fromZipper$a0 = v._2;
        fromZipper$a1 = $Set("Two", tree, v._1._1, v._1._2);
        continue;
      }
      if (v._1.tag === "TwoRight") {
        fromZipper$a0 = v._2;
        fromZipper$a1 = $Set("Two", v._1._1, v._1._2, tree);
        continue;
      }
      if (v._1.tag === "ThreeLeft") {
        fromZipper$a0 = v._2;
        fromZipper$a1 = $Set("Three", tree, v._1._1, v._1._2, v._1._3, v._1._4);
        continue;
      }
      if (v._1.tag === "ThreeMiddle") {
        fromZipper$a0 = v._2;
        fromZipper$a1 = $Set("Three", v._1._1, v._1._2, tree, v._1._3, v._1._4);
        continue;
      }
      if (v._1.tag === "ThreeRight") {
        fromZipper$a0 = v._2;
        fromZipper$a1 = $Set("Three", v._1._1, v._1._2, v._1._3, v._1._4, tree);
        continue;
      }
      $runtime.fail();
    }
    $runtime.fail();
  };
  return fromZipper$r;
};
const insertAndLookupBy = comp => k => orig => {
  const up = up$a0$copy => up$a1$copy => {
    let up$a0 = up$a0$copy, up$a1 = up$a1$copy, up$c = true, up$r;
    while (up$c) {
      const v = up$a0, v1 = up$a1;
      if (v.tag === "Nil") {
        up$c = false;
        up$r = $Set("Two", v1._1, v1._2, v1._3);
        continue;
      }
      if (v.tag === "Cons") {
        if (v._1.tag === "TwoLeft") {
          up$c = false;
          up$r = fromZipper(v._2)($Set("Three", v1._1, v1._2, v1._3, v._1._1, v._1._2));
          continue;
        }
        if (v._1.tag === "TwoRight") {
          up$c = false;
          up$r = fromZipper(v._2)($Set("Three", v._1._1, v._1._2, v1._1, v1._2, v1._3));
          continue;
        }
        if (v._1.tag === "ThreeLeft") {
          up$a0 = v._2;
          up$a1 = $KickUp($Set("Two", v1._1, v1._2, v1._3), v._1._1, $Set("Two", v._1._2, v._1._3, v._1._4));
          continue;
        }
        if (v._1.tag === "ThreeMiddle") {
          up$a0 = v._2;
          up$a1 = $KickUp($Set("Two", v._1._1, v._1._2, v1._1), v1._2, $Set("Two", v1._3, v._1._3, v._1._4));
          continue;
        }
        if (v._1.tag === "ThreeRight") {
          up$a0 = v._2;
          up$a1 = $KickUp($Set("Two", v._1._1, v._1._2, v._1._3), v._1._4, $Set("Two", v1._1, v1._2, v1._3));
          continue;
        }
        $runtime.fail();
      }
      $runtime.fail();
    };
    return up$r;
  };
  const down = down$a0$copy => down$a1$copy => {
    let down$a0 = down$a0$copy, down$a1 = down$a1$copy, down$c = true, down$r;
    while (down$c) {
      const ctx = down$a0, v = down$a1;
      if (v.tag === "Leaf") {
        down$c = false;
        down$r = {found: false, result: up(ctx)($KickUp(Leaf, k, Leaf))};
        continue;
      }
      if (v.tag === "Two") {
        const v1 = comp(k)(v._2);
        if (v1.tag === "EQ") {
          down$c = false;
          down$r = {found: true, result: orig};
          continue;
        }
        if (v1.tag === "LT") {
          down$a0 = Data$dList$dTypes.$List("Cons", $TreeContext("TwoLeft", v._2, v._3), ctx);
          down$a1 = v._1;
          continue;
        }
        down$a0 = Data$dList$dTypes.$List("Cons", $TreeContext("TwoRight", v._1, v._2), ctx);
        down$a1 = v._3;
        continue;
      }
      if (v.tag === "Three") {
        const v1 = comp(k)(v._2);
        if (v1.tag === "EQ") {
          down$c = false;
          down$r = {found: true, result: orig};
          continue;
        }
        const v2 = comp(k)(v._4);
        if (v2.tag === "EQ") {
          down$c = false;
          down$r = {found: true, result: orig};
          continue;
        }
        if (v1.tag === "LT") {
          down$a0 = Data$dList$dTypes.$List("Cons", $TreeContext("ThreeLeft", v._2, v._3, v._4, v._5), ctx);
          down$a1 = v._1;
          continue;
        }
        if (v1.tag === "GT") {
          if (v2.tag === "LT") {
            down$a0 = Data$dList$dTypes.$List("Cons", $TreeContext("ThreeMiddle", v._1, v._2, v._4, v._5), ctx);
            down$a1 = v._3;
            continue;
          }
          down$a0 = Data$dList$dTypes.$List("Cons", $TreeContext("ThreeRight", v._1, v._2, v._3, v._4), ctx);
          down$a1 = v._5;
          continue;
        }
        down$a0 = Data$dList$dTypes.$List("Cons", $TreeContext("ThreeRight", v._1, v._2, v._3, v._4), ctx);
        down$a1 = v._5;
        continue;
      }
      $runtime.fail();
    };
    return down$r;
  };
  return down(Data$dList$dTypes.Nil)(orig);
};
const emptySet = Leaf;
export {$KickUp, $Set, $TreeContext, KickUp, Leaf, Three, ThreeLeft, ThreeMiddle, ThreeRight, Two, TwoLeft, TwoRight, emptySet, fromZipper, insertAndLookupBy};
