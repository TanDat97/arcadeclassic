import { DIALOG_CREATE } from '../actions/dialog';

const initialState = {
    open: false,
    title: '',
    content: '',
    callBack: () => { }
}

const dialogReducer = (state = initialState, action) => {
    switch (action.type) {
        case DIALOG_CREATE:
            if (!action.payload.title || !action.payload.content) {
                return { ...state, open: false }
            }
            return {
                ...state,
                open: true,
                title: action.payload.title,
                content: action.payload.content,
                callBack: action.payload.callBack || function () { }
            }
        default:
            return { ...state }
    }
};

export default dialogReducer;
