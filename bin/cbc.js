const { program } = require('commander');

const { installPackage } = require('../lib/index');

program
    .command('install', {
        isDefault: true,
    })
    .description('Fetch node_modules from cloud storage bucket before installing the package.')
    .option('--bucket [name]', 'Name of google cloud storage bucket. Used as cache location.')
    .option('--cwd [cwd]', 'Current working directory.')
    .option(
        '--key [keyFilename]',
        'Path to key file with service account for Google cloud storage.',
    )
    .option('--no-cache', 'Do not look in cache bucket. Still uploads archive to bucket')
    .option('--cmd [cmd]', 'Command to create node_modules folder.', 'npm ci')
    .action((cmdObj) => {
        installPackage({
            bucketName: cmdObj.bucket,
            cwd: cmdObj.cwd || process.cwd(),
            storageOptions: {
                keyFilename: cmdObj.key,
            },
            noCache: !cmdObj.cache,
        });
    });

program.parse(process.argv);
