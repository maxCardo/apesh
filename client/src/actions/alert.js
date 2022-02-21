import { ALERT_FAILURE, ALERT_SUCCESS, REMOVE_ALERT } from './type';

export const setAlert = (msg, location) => dispatch => {
   // const id = uuid.v4();
    dispatch({
      type: ALERT_FAILURE,
      payload: {
          heading: "Server Error",
          msg: msg,
          location: location
      }
    });
}

export const clearAlerts = () => (dispatch) => {
    dispatch({type: REMOVE_ALERT});
};

export const createErrorAlert = (message, location)  => {
  return {
    type: ALERT_FAILURE,
    payload: {
      heading: 'Error',
      msg: message,
      location: location
    }
  }
}

export const createSuccessAlert = (message, location) => {
  return {
    type: ALERT_SUCCESS,
    payload: {
      heading: 'Updated',
      msg: message,
      location: location
    }
  }
}



