import {SimpleAccount} from "../../../../global-types"
import {Dispatch, SetStateAction} from "react"

export interface AccountSelectTypes{
	account: SimpleAccount,
	setAccount: Dispatch<SetStateAction<SimpleAccount>>
}