import { Bucket } from '@google-cloud/storage';

export const uploadArchive = async ({
    archivePath,
    bucket,
}: {
    archivePath: string;
    bucket: Bucket;
}): Promise<void> => {
    console.info('Uploading node_modules archive to bucket...');
    await bucket.upload(archivePath).then(
        () => {
            console.info('Uploading node_modules archive to bucket: OK');
        },
        (error) => {
            console.info('Uploading node_modules archive to bucket: ERROR');
            throw error;
        },
    );
};
