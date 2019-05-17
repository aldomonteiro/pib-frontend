import {
    ADD_LOG
} from '../actions/logsActions';
import moment from "moment";

const defaultState = [];

export default (previousState = defaultState, { type, payload }) => {
    if (type === ADD_LOG) {
        const newLog = {
            time: moment().format('HH:mm:ss').toLocaleString(),
            log: payload.log,
        }

        if (previousState.logs && previousState.logs.length > 0) {
            if (previousState.logs.length >= 20) {
                previousState.logs.pop();
            }
            return { ...previousState, logs: [newLog, ...previousState.logs] };
        }
        else
            return { ...previousState, logs: [newLog] };
    } else
        return previousState;
}