import {
  ID_VERIFY_FAIL,
  ID_VERIFY_REQUEST,
  ID_VERIFY_SUCCESS,
  IMAGE_VERIFY_FAIL,
  IMAGE_VERIFY_REQUEST,
  IMAGE_VERIFY_SUCCESS,
} from '../constants/verificationConstants'
import axios from 'axios'

export const verifyId = (id) => async (dispatch) => {
  try {
    dispatch({ type: ID_VERIFY_REQUEST })
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const { data } = await axios.post(`/api/checks/idVerification`, id, config)

    dispatch({
      type: ID_VERIFY_SUCCESS,
      payload: data,
      success: true,
    })
    localStorage.setItem(
      'verificationCode',
      JSON.stringify(data.verificationCode)
    )
  } catch (error) {
    dispatch({
      type: ID_VERIFY_FAIL,
      payload:
        error.response && error.response.data.messasge
          ? error.response.data.messasge
          : error.message,
    })
  }
}

export const verifyPerson = (personImage) => async (dispatch) => {
  try {
    dispatch({ type: IMAGE_VERIFY_REQUEST })
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const { data } = await axios.post(
      `/api/checks/idVerification`,
      personImage,
      config
    )

    dispatch({
      type: IMAGE_VERIFY_SUCCESS,
      payload: data,
      success: true,
    })
  } catch (error) {
    dispatch({
      type: IMAGE_VERIFY_FAIL,
      payload:
        error.response && error.response.data.messasge
          ? error.response.data.messasge
          : error.message,
    })
  }
}
