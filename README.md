# n-cache-r (Node Cache Restore)

Cache folders node_modules in Google Cloud Storage and restore them on next builds.

## Install

You can find this package on `npm`.

`npm install n-cache-r`

## Example usage

**Node**

```javascript
const {
  installPackage,
} = require("n-cache-r");

installPackage({
    bucketName: 'my-project-build-cache',
    storageOptions: {
        keyFilename: path.resolve(__dirname, '../service-account.json'),
    },
});
```

**CLI**

```
Usage: n-cache-r [options] [command]

Options:
  -h, --help         display help for command

Commands:
  install [options]  Fetch node_modules from cloud storage bucket before installing the package.
  help [command]     display help for command


Usage: n-cache-r install [options]

Fetch node_modules from cloud storage bucket before installing the package.

Options:
  --bucket <name>      Name of google cloud storage bucket. Used as cache location.
  --cwd [cwd]          Current working directory.
  --key <keyFilename>  Path to key file with service account for Google cloud storage.
  --no-cache           Do not use cache bucket.
  --cmd [cmd]          Command to create node_modules folder. (default: "npm ci")
  -h, --help           display help for command.
```
