import del from 'del';

export const deleteArchive = async ({ archivePath }: { archivePath: string }): Promise<void> => {
    console.info('Deleting node_modules archive...');
    try {
        await del(archivePath);
    } catch (error) {
        console.info('Deleting node_modules archive: ERROR');
        throw error;
    }
    console.info('Deleting node_modules archive: OK');
};
