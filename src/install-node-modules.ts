import { execSync } from 'child_process';

export const installNodeModules = ({
    cwd,
    cmd = 'npm ci',
}: {
    cwd: string;
    cmd?: string;
}): void => {
    console.info('Installing...');
    try {
        execSync(cmd, {
            stdio: 'inherit',
            cwd,
        });
    } catch (error) {
        console.info('Installing: ERROR');
        throw error;
    }

    console.info('Installing: OK');
};
