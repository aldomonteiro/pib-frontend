import { UPDATE, DELETE } from 'react-admin';

export const UPDATE_PAGE = 'UPDATE_PAGE';
export const DELETE_PAGE = 'DELETE_PAGE';
export const DELETE_PAGE_LOADING = 'DELETE_PAGE_LOADING';
export const LOAD_PAGES = 'LOAD_PAGES';

export const updatePage = (operation, id, data, basePath) => ({
    type: UPDATE_PAGE,
    payload: { id, data: { ...data, operation: operation } },
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

export const deletePage = (id, data, basePath) => ({
    type: DELETE_PAGE,
    payload: { id, data: { ...data }, basePath },
    meta: {
        fetch: DELETE,
        resource: 'pages',
        onSuccess: {
            notification: {
                // body: 'resources.comments.notification.approved_success',
                body: 'Successfull page delete',
                level: 'info',
            },
            redirectTo: '/',
            callback: ({ payload, requestPayload }) => {
                localStorage.removeItem('activePage');
            },
            basePath,
        },
        onFailure: {
            notification: {
                // body: 'resources.comments.notification.approved_failure',
                body: 'Error while deleting page',
                level: 'warning',
            },
        },
    }
});

export const loadPages = (data) => ({
    type: LOAD_PAGES,
    payload: { data }
});

