import React, {useContext, useEffect, useState} from "react"
import CreateInvoicesButton from "./components/createInvoicesButton"
import {AuthContext} from "./_app"
import {useRouter} from "next/router"
import {axiosInstance} from "../axios"
import useErrorHandler from "./hooks/useErrorHandler"


const Offers = () => {
	const {token} = useContext(AuthContext)
	const router = useRouter()
	const [data, setData] = useState([])
	const [page, setPage] = useState(0)
	const [checked, setChecked] = useState([])
	const [invoices, setInvoices] = useState([])
	const [offers, setOffers] = useState([])
	const getOffers = async () => {
		const {data: responseData} = await axiosInstance.get("/allegro/offer", {params: {token: token}})
		useErrorHandler(responseData, () => {
			setData([])
			const {checkoutForms: fetchedOffers} = responseData
			setOffers(fetchedOffers)
			fetchedOffers.splice(page * 25, page * 25 + 25).forEach(item => {
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
			setChecked([])
		})
	}

	const handleCheckboxChange = (item) => {
		const foundItem = checked.find(e => e.id === item.id)
		if (foundItem !== undefined){
			setChecked(checked => checked.filter(e => e.id !== item.id))
		} else {
			setChecked(checked.concat(item))
		}
	}

	useEffect(() => {
		if (token)
			getOffers().then(() => {})
	}, [token, page])

	if (data.length === 0) {
		return (
			<div className={"absolute left-5 right-5 top-5 bottom-5 flex m-auto w-fit h-fit flex-col items-center content-center text-white text-xl"}>
				Ładowanie
			</div>
		)
	}

	return (
		<>
			<h1 className={"text-3xl text-white mb-3"}>Zamówienia allegro</h1>
			<div>
				<button className={"bg-white text-black h-fit py-3 px-5 rounded m-auto my-5 mr-3"} onClick={getOffers}> Odśwież zamówienia </button>
				<CreateInvoicesButton setInvoices={setInvoices} checked={checked} setChecked={setChecked}/>
				<button className={"bg-white text-black h-fit py-3 px-8 rounded m-auto my-5 mr-3"} onClick={() => router.push("/home")}> Zmień konto </button>
				<button className={"bg-white text-black h-fit py-3 px-8 rounded m-auto my-5 mr-3"} onClick={() => router.push("/userData")}> Zmień dane konta </button>
			</div>
			<div className="overflow-hidden rounded-lg border border-gray-200 shadow-md">
				<table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
					<thead className="bg-gray-50">
						<tr>
							<th scope="col" className="px-6 py-4 font-medium text-gray-900"/>
							<th scope="col" className="px-6 py-4 font-medium text-gray-900">Użytkownik</th>
							<th scope="col" className="px-6 py-4 font-medium text-gray-900">Produkty</th>
							<th scope="col" className="px-6 py-4 font-medium text-gray-900">Dane do faktury</th>
							<th scope="col" className="px-6 py-4 font-medium text-gray-900">Pobierz fakturę</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-100 border-t border-gray-100">
						{data.length > 0 && data.map(item =>
							<tr className="hover:bg-gray-50" key={item.id}>

								<td className="px-6 py-4">
									{!(invoices && invoices.find(i => i.id === item.id)) &&
											<div className="flex justify-center gap-4">
												<input type={"checkbox"} onChange={() => handleCheckboxChange(item)}/>
											</div>
									}
								</td>

								<td className="px-6 py-4">{item.client}</td>

								<th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
									{item.products.map(lineItem => <div className="text-sm" key={lineItem.id}>
										<div className="font-medium text-gray-700">{lineItem.offer.name}</div>
										<div className="text-gray-400">{lineItem.price.amount}</div>
									</div>)}

								</th>

								{item.invoice && 	<td className="px-6 py-4">
									{"firstName" in item.invoice
										? item.invoice.firstName + " " + item.invoice.lastName
										: item.invoice.company.name + " " + item.invoice.company.taxId}
									<br/>
									{item.invoice && item.invoice.street} <br/>
									{item.invoice.zipCode} {item.invoice.city} {item.invoice.countryCode}
								</td>}

								<td className={"flex align-middle"}>
									{invoices && invoices.find(i => i.id === item.id)  &&
											<a href={invoices.find(i => i.id === item.id).file}> <button className={"px-6 py-4"}> Pobierz </button></a>
									}
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
			{page > 0 && <button className={"bg-white text-black h-fit py-3 px-10 rounded m-auto my-5 mr-3"} onClick={() => setPage(page - 1)}>Poprzednia strona</button>}
			<button className={"bg-white text-black h-fit py-3 px-5 rounded m-auto my-5 mr-3"}> {page + 1} </button>
			{page * 25 < offers.length && <button className={"bg-white text-black h-fit py-3 px-10 rounded m-auto my-5 mr-3"} onClick={() => setPage(page + 1)}>Następna strona</button>}
		</>
	)
}

export default Offers