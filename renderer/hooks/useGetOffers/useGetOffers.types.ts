import React, {SetStateAction} from "react"
import {Offer, SimplifiedOffer} from "../../../global-types"

export interface UseGetOffersTypes {
	setData: React.Dispatch<SetStateAction<SimplifiedOffer[]>>,
	setOffers: React.Dispatch<SetStateAction<Offer[]>>,
	page: number
	token: string
}