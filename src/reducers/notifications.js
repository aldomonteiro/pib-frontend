import { ADD_NOTIFICATION, REMOVE_NOTIFICATION, UPDATE_NOTIFICATIONS, SET_CONNECTED } from '../actions/notificationsActions';

const defaultState = [];

export default (previousState = defaultState, { type, payload }) => {
    if (type === ADD_NOTIFICATION)
        if (previousState.notifications && previousState.notifications.length > 0) {
            if (previousState.notifications.length >= 20) {
                previousState.notifications.pop();
            }
            return { ...previousState, notifications: [payload.notification, ...previousState.notifications] };
        }
        else
            return { ...previousState, notifications: [payload.notification] };
    else if (type === REMOVE_NOTIFICATION)
        if (previousState.notifications && previousState.notifications.length > 0)
            return { ...previousState, notifications: previousState.notifications.filter(el => el.id !== payload.notification.id) };
        else
            return previousState;
    else if (type === UPDATE_NOTIFICATIONS)
        return { ...previousState, notifications: payload.notifications };
    else if (type === SET_CONNECTED)
        return { ...previousState, isConnected: payload.connected };
    else
        return previousState;
}