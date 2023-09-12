import {createSlice} from "@reduxjs/toolkit"

export const tokenSlice = createSlice({
	name: "token",
	initialState: {
		value: "",
	},

	reducers: {
		handleSetToken: (state, action: {payload: string}) => {
			state.value = action.payload
		},
	},
})

export const {handleSetToken} = tokenSlice.actions