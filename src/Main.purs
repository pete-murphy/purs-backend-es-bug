module Main where

import Prelude

import Data.Either (Either(..))
import Data.Function.Uncurried (runFn0)
import Effect (Effect)
import Effect.Class.Console (log)
import Node.FS.Async as Async
import Node.FS.Stats (Stats(..), isFile)
import Node.FS.Sync as Sync

main :: Effect Unit
main =
  do
    stats <- Sync.stat "."
    if isFile stats then
      log "File."
    else
      log "Not a file."

    Async.stat "." case _ of
      Right (Stats stats') -> do
        if runFn0 stats'.isDirectory then
          log "Directory."
        else
          log "Not a directory."

      _ -> mempty

