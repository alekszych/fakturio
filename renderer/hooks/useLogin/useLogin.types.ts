import {Account} from "../../../types"
import {Dispatch, SetStateAction} from "react"

export interface UseLoginTypes{
	account: Account,
	setToken: Dispatch<SetStateAction<string>>
}