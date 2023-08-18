import React, {SetStateAction} from "react"
import {Offer} from "../../../types"

export interface GetOffersTypes{
	setData: React.Dispatch<SetStateAction<Offer[]>>,
	setOffers: React.Dispatch<SetStateAction<Offer[]>>,
	page: number
	token: string
}