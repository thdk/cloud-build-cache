# cloud-build-cache

Cache folders such as node_modules in gcs and restore them on next builds.

**NOTE: If you are using `npm install` in your projects and are looking to speed up your CI/CD build process you should first look at using `npm ci`.**


## Install

You can find this package on `npm`.

`npm install cloud-build-cache`

## Example usage

**node**

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
Usage: cbc install [options]

Fetch node_modules from cloud storage bucket before installing the package.

Options:
  --bucket [name]      Name of google cloud storage bucket. Used as cache location.
  --cwd [cwd]          Current working directory.
  --key [keyFilename]  Path to key file with service account for Google cloud storage.
  --no-cache           Do not look in cache bucket. Still uploads archive to bucket
  --cmd [cmd]          Command to create node_modules folder. (default: "npm ci")
  -h, --help           display help for command
```