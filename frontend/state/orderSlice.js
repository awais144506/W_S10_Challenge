import { createSlice } from "@reduxjs/toolkit";


export const OrderSlice = createSlice({
    name: "order",
    initialState: {
        fullName: "",
        size: "",
        '1': false,
        '2': false,
        '3': false,
        '4': false,
        '5': false,
    },
reducers:{
  createNewOrder:{
    prepare({fullName,size}){
        return{
            payload:{fullName,size}
        }
    }
  }
}
})



export default OrderSlice.reducer

export const {
    createNewOrder
} = OrderSlice.actions