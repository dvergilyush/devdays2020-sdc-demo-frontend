import { axiosInstance, resetInstanceToken, setInstanceBaseURL } from 'aidbox-react/lib/services/instance';
import { withRootAccess } from 'aidbox-react/lib/utils/tests';

declare const process: any;

beforeAll(async () => {
    jest.useFakeTimers();

    if (process.env.CI) {
        setInstanceBaseURL('http://devbox:8080');
    } else {
        setInstanceBaseURL('http://localhost:8181');
    }
});

let txId: string;

beforeEach(async () => {
    await withRootAccess(async () => {
        const response = await axiosInstance({
            method: 'POST',
            url: '/$psql',
            data: { query: 'select id from transaction order by id desc limit 1;' },
        });
        txId = response.data[0].result[0].id;

        return response;
    });
});

afterEach(async () => {
    resetInstanceToken();
    await withRootAccess(async () => {
        await axiosInstance({
            method: 'POST',
            url: '/$psql',
            data: { query: `select drop_before_all(${txId});` },
        });
    });
});

afterAll(() => {
    jest.clearAllTimers();
});
