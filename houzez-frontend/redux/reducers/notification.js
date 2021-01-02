import { NOTIFICATION_CREATE } from '../actions/notification';

const initialState = {
    open: false,
    status: '',
    message: ''
}

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case NOTIFICATION_CREATE:
            if (!action.payload.status || !action.payload.message) {
                return { ...state, open: false, status: '', message: '' }
            }
            return {
                ...state,
                open: true,
                status: action.payload.status,
                message: action.payload.message
            }
        default:
            return { ...state }
    }
};

export default notificationReducer;
