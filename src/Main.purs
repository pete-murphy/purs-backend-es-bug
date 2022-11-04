module Main where

import Prelude

import Data.Either (Either(..))
import Data.Function.Uncurried (runFn0)
import Effect (Effect)
import Effect.Console (logShow)
import Node.FS.Async (stat)
import Node.FS.Stats (Stats(..))

main :: Effect Unit
main = do
  stat "." case _ of
    Right (Stats stats) -> do
      logShow $ runFn0 stats.isDirectory
    _ -> mempty

