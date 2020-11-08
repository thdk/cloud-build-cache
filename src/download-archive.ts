import { Bucket } from '@google-cloud/storage';
export const downloadArchive = async ({
    file,
    bucket,
}: {
    file: string;
    bucket: Bucket;
    archivePath: string;
    cwd: string;
}): Promise<Buffer> => {
    console.info('Downloading node_modules archive from bucket...');

    const [archive] = await bucket
        .file(file)
        .download()
        .then(
            (response) => {
                console.info('Downloading node_modules archive from bucket: OK');
                return response;
            },
            (error) => {
                console.info('Downloading node_modules archive from bucket: ERROR');
                throw error;
            },
        );

    return archive;
};
