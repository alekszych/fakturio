import {Account} from "../../../global-types"
import {Dispatch, SetStateAction} from "react"
import {NextRouter} from "next/router"

export interface UseLoginTypes{
	account: Account,
	setToken: Dispatch<SetStateAction<string>>,
	router: NextRouter
}