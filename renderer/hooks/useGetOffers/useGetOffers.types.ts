import React, {SetStateAction} from "react"
import {Offer} from "../../../global-types"

export interface UseGetOffersTypes {
	setData: React.Dispatch<SetStateAction<Offer[]>>,
	setOffers: React.Dispatch<SetStateAction<Offer[]>>,
	page: number
	token: string
}