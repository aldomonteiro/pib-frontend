export const ADD_NOTIFICATION = 'ADD_NOTIFICATION';
export const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';
export const UPDATE_NOTIFICATIONS = 'UPDATE_NOTIFICATIONS';
export const SET_CONNECTED = 'SET_CONNECTED';

export const update_notifications = (notifications) => ({
    type: UPDATE_NOTIFICATIONS,
    payload: { notifications },
});

export const add_notification = (notification) => ({
    type: ADD_NOTIFICATION,
    payload: { notification },
});

export const remove_notification = (notification) => ({
    type: REMOVE_NOTIFICATION,
    payload: { notification },
});

export const set_connected = (connected) => ({
    type: SET_CONNECTED,
    payload: { connected },
});
