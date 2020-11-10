# cloud-build-cache

Cache folders such as node_modules in Google Cloud Storage and restore them on next builds.

**NOTE: If you are using `npm install` in your projects and are looking to speed up your CI/CD build process you should first look at using `npm ci`.**

**NOTE: I found this method of caching `node_modules` only a little bit faster than using `npm ci` for larger projects with many dependencies. It's up to you to find out what works best for you and your team. See --no-cache option to disable cloud storage cache.**


## Install

You can find this package on `npm`.

`npm install cloud-build-cache`

## Example usage

**Node**

```javascript
const {
  installPackage,
} = require("cloud-build-cache");

installPackage({
    bucketName: 'my-project-build-cache',
    storageOptions: {
        keyFilename: path.resolve(__dirname, '../service-account.json'),
    },
});
```

**CLI**

```
Usage: cloud-build-cache [options] [command]

Options:
  -h, --help         display help for command

Commands:
  install [options]  Fetch node_modules from cloud storage bucket before installing the package.
  help [command]     display help for command


Usage: cloud-build-cache install [options]

Fetch node_modules from cloud storage bucket before installing the package.

Options:
  --bucket <name>      Name of google cloud storage bucket. Used as cache location.
  --cwd [cwd]          Current working directory.
  --key <keyFilename>  Path to key file with service account for Google cloud storage.
  --no-cache           Do not use cache bucket.
  --cmd [cmd]          Command to create node_modules folder. (default: "npm ci")
  -h, --help           display help for command.
```
