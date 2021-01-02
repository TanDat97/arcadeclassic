/**
 * ACTIONS Types
 */
export const DIALOG_CREATE = "DIALOG_CREATE"

/**
 * ACTIONs
 */
export const dialogCreate = (data) => {
    return {
        type: DIALOG_CREATE,
        payload: data
    }
};