import {axiosInstance} from "../../axios"
import {useErrorHandler} from "../useErrorHandler"
import {GetOffersTypes} from "./getOffers.types"

export const getOffers = async ({setData, setOffers, page, token}: GetOffersTypes) => {
	const {data: responseData} = await axiosInstance.get("/allegro/offer", {params: {token: token}})
	useErrorHandler({responseData: responseData, success: async () => {
		setData([])
		const {checkoutForms: fetchedOffers} = responseData
		setOffers(fetchedOffers)
		fetchedOffers.filter((item, i) =>
			(i >= page * 25) &&
				(i < Math.min(((page + 1) * 25), (fetchedOffers.length - 1)))
		).forEach(item => {
			let obj = {
				id: item.id,
				client: item.buyer.login,
				products: item.lineItems,
				deliveryCost: item.delivery.cost.amount,
				currency: item.summary.totalToPay.currency,
				invoice: null
			}
			if (item.invoice.required === true)
				obj.invoice = item.invoice.address
			else
				obj.invoice = item.delivery.address
			setData(data => data.concat(obj))
		})
	}})
}