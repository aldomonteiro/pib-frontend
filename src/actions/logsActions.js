export const ADD_LOG = 'ADD_LOG';

export const add_log = (log) => ({
    type: ADD_LOG,
    payload: { log },
});
