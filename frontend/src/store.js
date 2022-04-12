import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  productReducer,
  productDetailReducer,
  productCreateReviewReducer,
  productTopReducer,
} from './reducers/productReducers'

import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
} from './reducers/userReducers'
import { cartReducer } from './reducers/cartReducers'
import {
  myOrdersReducer,
  orderCreateReducer,
  orderDeliverReducer,
  orderDetailsReducer,
  orderPaymentReducer,
  ordersReducer,
} from './reducers/orderReducers'
import {
  idVerificationReducer,
  imageVerificationReducer,
} from './reducers/verificationReducers'

const reducer = combineReducers({
  productList: productReducer,
  productDetails: productDetailReducer,
  productTopRated: productTopReducer,
  productCreateReview: productCreateReviewReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPaymentReducer,
  orderDeliver: orderDeliverReducer,
  myOrders: myOrdersReducer,
  orders: ordersReducer,
  idVerification: idVerificationReducer,
  imageVerification: imageVerificationReducer,
})
const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const verificationCodeFromStorage = localStorage.getItem('verificationCode')
  ? JSON.parse(localStorage.getItem('verificationCode'))
  : null
const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []
const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {}
const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
  verificationCode: { verificationCode: verificationCodeFromStorage },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
