import { UPDATE } from 'react-admin';

export const UPDATE_ACCOUNT = 'UPDATE_ACCOUNT';

export const update_account = (id, data, basePath) => ({
    type: UPDATE_ACCOUNT,
    payload: { id, data: { ...data } },
    meta: {
        fetch: UPDATE,
        resource: 'accounts',
        onSuccess: {
            notification: {
                body: 'pos.configuration.updateSuccess',
                level: 'info',
            },
            basePath,
        },
        onFailure: {
            notification: {
                body: 'pos.configuration.updateFailure',
                level: 'warning',
            },
        },
    }
});
