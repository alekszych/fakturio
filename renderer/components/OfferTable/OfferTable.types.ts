import {Dispatch, SetStateAction} from "react"
import {InvoiceFile, Offer} from "../../../global-types"

export interface OfferTableTypes {
	data: Offer[],
	invoiceFiles: InvoiceFile[],
	checked: Offer[],
	setChecked: Dispatch<SetStateAction<Offer[]>>
}