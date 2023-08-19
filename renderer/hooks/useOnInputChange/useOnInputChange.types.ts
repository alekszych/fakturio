import {Dispatch, SetStateAction} from "react"
import {Account} from "../../../types"

export interface UseOnInputChangeTypes{
	setState: Dispatch<SetStateAction<Account>>,
	event: {target: {name: string, value: string}}
}