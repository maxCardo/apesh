import { ALERT_FAILURE, ALERT_SUCCESS, REMOVE_ALERT } from './type';

//@desc set alert from component
export const setAlert = (msg, location, type, heading = 'Server Error', timeout) => dispatch => {
    dispatch({
      type: type === 'success' ? ALERT_SUCCESS : ALERT_FAILURE,
      payload: {
          heading: heading,
          msg: msg,
          location: location
      }
    });

    if (timeout) {
      console.log('running time out')
        setTimeout(() => {
          console.log('running clear alerts')
          dispatch({type: REMOVE_ALERT});
      }, 2000)
    }
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



