import tar from 'tar';
import fs from 'fs';

export const createArchive = async ({
    archivePath,
    cwd,
}: {
    archivePath: string;
    cwd: string;
}): Promise<void> => {
    console.info('Creating node_modules archive...');
    await tar
        .create(
            {
                gzip: true,
                file: archivePath,
                cwd,
            },
            ['node_modules'],
        )
        .then(
            () => {
                console.info('Creating node_modules archive: OK');
            },
            (error) => {
                console.info('Creating node_modules archive: ERROR');
                throw error;
            },
        );
};

export const extractArchive = ({
    buffer,
    archivePath,
    cwd,
}: {
    buffer: Buffer;
    archivePath: string;
    cwd: string;
}): Promise<void> => {
    return new Promise((resolve, reject) => {
        const stream = fs.createWriteStream(archivePath);

        stream.on('close', async () => {
            console.info('Extracting node_modules archive...');
            await tar
                .extract({
                    file: archivePath,
                    cwd,
                })
                .then(
                    () => {
                        console.info('Extracting node_modules archive: OK');
                        resolve();
                    },
                    (error) => {
                        console.info('Extracting node_modules archive: ERROR');
                        reject(error);
                    },
                );
        });

        stream.on('error', (error) => reject(error));

        stream.once('open', function () {
            stream.write(buffer);
            stream.end();
        });
    });
};
