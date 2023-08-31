import {axiosInstance} from "../../axios"
import {useErrorHandler} from "../useErrorHandler"
import {UseGetOffersTypes} from "./useGetOffers.types"
import {SimplifiedOffer} from "../../../global-types"

export const useGetOffers = async ({setData, setOffers, page, token}: UseGetOffersTypes) => {
	const {data: fetchedOffers} = await axiosInstance.get("/allegro/offer", {params: {token: token}})
	const {data: invoiceData} = await axiosInstance.get("/fakturownia/invoice")
	let newData = []
	useErrorHandler({responseData: fetchedOffers, success: async () => {
		setOffers(fetchedOffers)
		fetchedOffers.filter((item, i) =>
			(i >= page * 25) &&
				(i < Math.min(((page + 1) * 25), (fetchedOffers.length - 1)))
		).forEach(item => {
			let obj: SimplifiedOffer = {
				id: item.id,
				client: item.buyer.login,
				products: item.lineItems,
				deliveryCost: item.delivery.cost.amount,
				currency: item.summary.totalToPay.currency,
				address: null,
				invoiceFile: null,
				invoiceStatus: item.status,
				paymentType: item.payment.type
			}
			if (item.invoice.required === true)
				obj.address = item.invoice.address
			else
				obj.address = item.delivery.address
			useErrorHandler({responseData: invoiceData, success: async () => {
				const foundFile = invoiceData.find(invoice => invoice === item.id)
				if(foundFile){
					obj.invoiceFile = foundFile
				}
			}})
			newData.push(obj)
		})
		setData(newData)
	}})
}