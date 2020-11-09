import { isPackageChanged } from 'package-changed';
import { Storage, StorageOptions } from '@google-cloud/storage';

import path from 'path';

import { installNodeModules } from './install-node-modules';
import { createArchive, extractArchive } from './archive-node-modules';
import { uploadArchive } from './upload-archive';
import { downloadArchive } from './download-archive';
import { deleteArchive } from './delete-archive';

const NODE_MODULES_TIMER = 'node_modules available after';

export const installPackage = async ({
    bucketName,
    cwd,
    noCache = false,
    storageOptions,
    installCmd,
}: {
    bucketName: string;
    cwd: string;
    noCache?: boolean;
    installCmd?: string;
    storageOptions: Omit<StorageOptions, 'keyFile'>; // keyFile seems to be replaced with keyFileName
}): Promise<void> => {
    console.time(NODE_MODULES_TIMER);

    const gcsClient = new Storage(storageOptions);
    const bucket = gcsClient.bucket(bucketName);

    // get hash for dependencies and devDependencies in package.json
    await isPackageChanged(
        {
            cwd,
        },
        async ({ hash, isChanged }) => {
            if (!isChanged) {
                return false;
            }

            const [cacheExists] = await bucket.file(`${hash}.tgz`).exists();
            const archivePath = path.resolve(cwd, `${hash}.tgz`);

            if (cacheExists && !noCache) {
                console.info('Archive found in cache bucket.');

                const archive = await downloadArchive({
                    file: `${hash}.tgz`,
                    archivePath,
                    cwd,
                    bucket,
                });

                await extractArchive({
                    buffer: archive,
                    cwd,
                    archivePath,
                });

                console.timeEnd(NODE_MODULES_TIMER);
            } else {
                console.info('Nothing found in cache bucket.');

                installNodeModules({
                    cwd,
                    cmd: installCmd,
                });

                console.timeEnd(NODE_MODULES_TIMER);

                if (noCache) {
                    return;
                }

                // create node_modules archive on disk
                await createArchive({
                    archivePath,
                    cwd,
                });

                // upload node_modules archive from disk to cache bucket
                await uploadArchive({
                    archivePath,
                    bucket,
                });
            }

            // always cleanup archive (either created or downloaded)
            await deleteArchive({
                archivePath,
            });
        },
    );
};
