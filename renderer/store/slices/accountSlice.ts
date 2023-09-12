import {createSlice} from "@reduxjs/toolkit"
import {SimpleAccount} from "../../../global-types"

export const accountSlice = createSlice({
	name: "account",
	initialState: {
		id: "",
		name: "",
	},
	reducers: {
		handleSetAccount: (state, action: {payload: SimpleAccount}) => {
			state.id = action.payload.id
			state.name = action.payload.name
		},
	},
})

export const {handleSetAccount} = accountSlice.actions