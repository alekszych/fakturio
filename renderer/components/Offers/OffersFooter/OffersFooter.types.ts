import {Dispatch, SetStateAction} from "react"
import {Offer} from "../../../../global-types"

export interface OffersFooterTypes {
	page: number,
	setPage: Dispatch<SetStateAction<number>>,
	offers: Offer[]
}