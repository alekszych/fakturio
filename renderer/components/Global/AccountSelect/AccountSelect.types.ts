import {Account} from "../../../../global-types"
import {Dispatch, SetStateAction} from "react"

export interface AccountSelectTypes{
	account: Account,
	setAccount: Dispatch<SetStateAction<Account>>
}