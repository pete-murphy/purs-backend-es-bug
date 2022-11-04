# Minimal failing example for `purs-backend-es` & `node-fs`

```shell
npm install
```

then `npm run example` succeeds with

```
Not a file.
Directory.
```

but `npm run example:es` fails with

```
Not a file.
node:internal/fs/utils:416
  return this._checkModeProperty(S_IFDIR);
              ^

TypeError: Cannot read properties of undefined (reading '_checkModeProperty')
    at StatsBase.isDirectory (node:internal/fs/utils:416:15)
```
