/**
 * ACTIONS Types
 */
export const NOTIFICATION_CREATE = "NOTIFICATION_CREATE"

/**
 * ACTIONs
 */
export const notificationCreate = (data) => {
    return {
        type: NOTIFICATION_CREATE,
        payload: data
    }
};