import {InvoiceFile, Offer} from "../../../../types"
import {Dispatch, SetStateAction} from "react"

export interface OfferTableTypes {
	data: Offer[],
	invoiceFiles: InvoiceFile[],
	checked: Offer[],
	setChecked: Dispatch<SetStateAction<Offer[]>>
}