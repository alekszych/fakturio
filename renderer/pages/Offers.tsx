import React, {FC, useContext, useEffect, useState} from "react"
import {AuthContext} from "./_app"
import {Offer, SimplifiedOffer} from "../../global-types"
import {useGetOffers} from "../hooks/useGetOffers"
import {useCreateInvoices} from "../hooks/useCreateInvoices"
import {OffersHeader} from "../components/Offers/OffersHeader"
import {OffersTable} from "../components/Offers/OffersTable"
import {OffersFooter} from "../components/Offers/OffersFooter"


const Offers: FC = () => {
	const {token, account} = useContext(AuthContext)
	const [data, setData] = useState<SimplifiedOffer[]>([])
	const [page, setPage] = useState(0)
	const [checked, setChecked] = useState<Offer[]>([])
	const [offers, setOffers] = useState<Offer[]>([])

	useEffect(() => {
		(async () => {
			if (!token)
				return
			await useGetOffers({setData: setData, setOffers: setOffers, page: page, token: token})
			setChecked([])
		})()
	}, [token, page])

	const handleCreateInvoices = async () => {
		setData([])
		await useCreateInvoices({checked: checked, account: account})
		await useGetOffers({setData: setData, setOffers: setOffers, page: page, token: token})
		setChecked([])
	}

	if (!data || data.length === 0) {
		return (
			<div className={"absolute left-5 right-5 top-5 bottom-5 flex m-auto w-fit h-fit flex-col items-center content-center text-white text-xl"}>
				Ładowanie
			</div>
		)
	}

	return (
		<>
			<OffersHeader handleCreateInvoices={handleCreateInvoices}/>
			<div className="rounded-lg border border-gray-200 shadow-md overflow-auto min-w-[800px] mr-4">
				<OffersTable checked={checked} setChecked={setChecked} data={data}/>
			</div>
			<OffersFooter page={page} setPage={setPage} offers={offers}/>
		</>
	)
}

export default Offers