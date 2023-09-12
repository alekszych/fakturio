import {configureStore} from "@reduxjs/toolkit"
import {tokenSlice} from "./slices/tokenSlice"
import {accountSlice} from "./slices/accountSlice"

export const store = configureStore({
	reducer: {
		[tokenSlice.name]: tokenSlice.reducer,
		[accountSlice.name]: accountSlice.reducer,
	}
})