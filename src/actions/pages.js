import { UPDATE } from 'react-admin';

export const UPDATE_PAGE = 'UPDATE_PAGE';
export const LOAD_PAGES = 'LOAD_PAGES';

export const updatePage = (id, data, basePath) => ({
    type: UPDATE_PAGE,
    payload: { id, data: { ...data } },
    meta: {
        fetch: UPDATE,
        resource: 'pages',
        onSuccess: {
            notification: {
                // body: 'resources.comments.notification.approved_success',
                body: 'Successfull page update',
                level: 'info',
            },
            redirectTo: '/',
            basePath,
        },
        onFailure: {
            notification: {
                // body: 'resources.comments.notification.approved_failure',
                body: 'Error while updating page',
                level: 'warning',
            },
        },
    }
});


export const loadPages = (data) => ({
    type: LOAD_PAGES,
    payload: { data }
});

