import {
  ID_VERIFY_FAIL,
  ID_VERIFY_REQUEST,
  ID_VERIFY_SUCCESS,
  IMAGE_VERIFY_FAIL,
  IMAGE_VERIFY_REQUEST,
  IMAGE_VERIFY_SUCCESS,
} from '../constants/verificationConstants'
export const idVerificationReducer = (state = {}, action) => {
  switch (action.type) {
    case ID_VERIFY_REQUEST:
      return { loading: true }
    case ID_VERIFY_SUCCESS:
      return {
        loading: false,
        success: true,
        payload: action.payload,
      }
    case ID_VERIFY_FAIL:
      return { loading: false, success: false, error: action.payload }
    default:
      return state
  }
}

export const imageVerificationReducer = (state = {}, action) => {
  switch (action.type) {
    case IMAGE_VERIFY_REQUEST:
      return { loading: true }
    case IMAGE_VERIFY_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case IMAGE_VERIFY_FAIL:
      return { loading: false, success: false, error: action.payload }
    default:
      return state
  }
}
