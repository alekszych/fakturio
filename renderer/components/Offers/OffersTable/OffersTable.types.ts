import {Dispatch, SetStateAction} from "react"
import {Offer, SimplifiedOffer} from "../../../../global-types"

export interface OffersTableTypes {
	invoiceFiles: string[]
	data: SimplifiedOffer[],
	checked: Offer[],
	setChecked: Dispatch<SetStateAction<Offer[]>>
}