import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../utils/store'
import { ProductWithRetailModel } from '../type/product'
import { copyCart, updateCartList } from '../type/cart'
import { toast } from 'react-toastify'
import { KEY_COOKIE } from '../layouts/types'

interface CartState {
  cartLst: ProductWithRetailModel[]
}

export interface UpdateCartRetailQuantity {
  productIndex: number
  retailIndex: number
  quantity: number
}
export interface DeleteCartRetail {
  productIndex: number
  retailIndex: number
}
export interface DeleteProduct {
  productIndex: number
}

const initialState: CartState = {
  cartLst: [],
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    updateRetailQuantity: (state, action: PayloadAction<UpdateCartRetailQuantity>) => {
      const newCartLst = copyCart(state.cartLst)
      const newCart = newCartLst[action.payload.productIndex]
      if (newCart) {
        newCart.retail[action.payload.retailIndex].quantity = action.payload.quantity
      }

      updateCartList(newCartLst)
      state.cartLst = newCartLst
    },
    deleteRetial: (state, action: PayloadAction<DeleteCartRetail>) => {
      const newCartLst = copyCart(state.cartLst)
      const newCart = newCartLst[action.payload.productIndex]
      if (newCart) {
        newCart.retail.splice(action.payload.retailIndex, 1)
      }

      updateCartList(newCartLst)
      state.cartLst = newCartLst
    },
    deleteProduct: (state, action: PayloadAction<DeleteProduct>) => {
      const newCartLst = copyCart(state.cartLst)
      newCartLst.splice(action.payload.productIndex, 1)

      updateCartList(newCartLst)
      state.cartLst = newCartLst
    },
    update: (state, action: PayloadAction<ProductWithRetailModel[]>) => {
      console.log(1, action.payload)

      updateCartList(action.payload)
      toast.success('Thêm vào giỏ hàng thành công.')

      state.cartLst = action.payload
    },
    getAllCart: (state) => {
      const data = localStorage.getItem(KEY_COOKIE.CART)

      const list = data ? (JSON.parse(data) as ProductWithRetailModel[]) : []
      state.cartLst = list
    },
    deleteCart: (state) => {
      updateCartList([])

      state.cartLst = []
    },
  },
})

export const { updateRetailQuantity, deleteRetial, deleteProduct, update, getAllCart, deleteCart } = cartSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const getCart = (state: RootState) => state?.cart.cartLst

export const cartReducer = cartSlice.reducer
export default cartSlice.reducer
