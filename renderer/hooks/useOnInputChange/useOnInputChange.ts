import {Dispatch, SetStateAction} from "react"
import {Account} from "../../../global-types"

export const useOnInputChange = (
	setState: Dispatch<SetStateAction<Account>>,
	event: {target: {name: string, value: string}}
) => {
	const {value, name} = event.target
	setState(state => ({...state, [name]: value}))
}