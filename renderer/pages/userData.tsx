import React, {useContext, useEffect, useRef, useState} from "react"
import {AuthContext} from "./_app"
import {useRouter} from "next/router"
import {axiosInstance} from "../axios"
import useErrorHandler from "../hooks/useErrorHandler"
import {AccountData} from "../../types"

const UserData = () => {
	const {account} = useContext(AuthContext)
	const router = useRouter()
	const [userData, setUserData] = useState({name: "", taxNo: "", street: "", postCode: "", city: "", country: "", lumpSumTax: "", vat: "", exemptTaxKind: ""})
	const name = useRef<HTMLInputElement>()
	const taxNo = useRef<HTMLInputElement>()
	const street = useRef<HTMLInputElement>()
	const postCode = useRef<HTMLInputElement>()
	const city = useRef<HTMLInputElement>()
	const country = useRef<HTMLInputElement>()
	const lumpSumTax = useRef<HTMLInputElement>()
	const vat = useRef<HTMLInputElement>()
	const exemptTaxKind = useRef<HTMLInputElement>()

	useEffect(() => {
		(async function() {
			const {data: responseData} = await axiosInstance.get("/account/data", {params: {account: account}})
			useErrorHandler(responseData, async () => setUserData(responseData[0]))
		})()
	}, [])


	const handleSubmit = async () => {
		if(
			name.current.value === "" ||
			taxNo.current.value === "" || taxNo.current.value.length !== 10 ||
			street.current.value === "" ||
			postCode.current.value === "" ||
			city.current.value === "" ||
			country.current.value === "" ||
			lumpSumTax.current.value === "" ||
			!(["2", "3", "5.5", "8.5", "10", "12", "12.5", "14", "15", "17"].includes(lumpSumTax.current.value)) ||
			vat.current.value === "" ||
			!(["zw", "np", "0", "5", "7", "8", "23"].includes(vat.current.value))
		){
			alert("Wpisz poprawne wartości do formularza")
			return
		}
		const data: AccountData = {
			accountId: account.id,
			name: name.current.value,
			taxNo: taxNo.current.value,
			street: street.current.value,
			postCode: postCode.current.value,
			city: city.current.value,
			country: country.current.value,
			lumpSumTax: lumpSumTax.current.value,
			vat: vat.current.value,
			exemptTaxKind: exemptTaxKind.current.value
		}
		const {data: responseData} = await axiosInstance.post("/account/data", data)
		useErrorHandler(responseData, async ()  =>  {
			alert("Dane konta zostały zmienione")
			await router.push("/offers")
		})
	}

	return (
		<div className={"flex flex-col w-4/5 h-fit absolute left-5 right-5 top-5 bottom-5 m-auto pb-5 max-w-2xl"}>
			<h1 className={"text-white text-3xl mx-auto text-center mb-5"}>Edytuj dane do faktury</h1>

			<label className={"mb-2"}>
				<p className={"text-white mb-1"}> Nazwa firmy </p>
				<input className={"w-full h-8 rounded focus:outline-blue-300 px-2"} ref={name} defaultValue={userData && "name" in userData && userData.name}/>
			</label>

			<label className={"mb-2"}>
				<p className={"text-white mb-1"}> Nip </p>
				<input className={"w-full h-8 rounded focus:outline-blue-300 px-2"} ref={taxNo} defaultValue={userData && "taxNo" in userData && userData.taxNo}/>
			</label>

			<label className={"mb-2"}>
				<p className={"text-white mb-1"}> Adres </p>
				<input className={"w-full h-8 rounded focus:outline-blue-300 px-2"} ref={street} defaultValue={userData && "street" in userData && userData.street}/>
			</label>

			<label className={"mb-2"}>
				<p className={"text-white mb-1"}> Kod pocztowy </p>
				<input className={"w-full h-8 rounded focus:outline-blue-300 px-2"} ref={postCode} defaultValue={userData && "postCode" in userData && userData.postCode}/>
			</label>

			<label className={"mb-2"}>
				<p className={"text-white mb-1"}> Miasto </p>
				<input className={"w-full h-8 rounded focus:outline-blue-300 px-2"} ref={city} defaultValue={userData && "city" in userData && userData.city}/>
			</label>

			<label className={"mb-2"}>
				<p className={"text-white mb-1"}> Państwo </p>
				<input className={"w-full h-8 rounded focus:outline-blue-300 px-2"} ref={country} defaultValue={userData && "country" in userData && userData.country}/>
			</label>

			<label className={"mb-2"}>
				<p className={"text-white mb-1"}> Stawka ryczałtu (2, 3, 5.5, 8.5, 10, 12, 12.5, 14, 15, 17) </p>
				<input className={"w-full h-8 rounded focus:outline-blue-300 px-2"} ref={lumpSumTax} defaultValue={userData && "lumpSumTax" in userData && userData.lumpSumTax}/>
			</label>

			<label className={"mb-2"}>
				<p className={"text-white mb-1"}> Stawka VAT (zw, np, 0, 5, 7, 8, 23) </p>
				<input className={"w-full h-8 rounded focus:outline-blue-300 px-2"} ref={vat} defaultValue={userData && "vat" in userData && userData.vat}/>
			</label>

			<label className={"mb-2"}>
				<p className={"text-white mb-1"}> Podstawa zwolnienia z vat (opcjonalnie) </p>
				<input className={"w-full h-8 rounded focus:outline-blue-300 px-2"} ref={exemptTaxKind} defaultValue={userData && "exemptTaxKind" in userData && userData.exemptTaxKind}/>
			</label>

			<div className={"flex justify-center"}>
				<button className={"bg-white text-black h-fit w-fit py-2 px-20 rounded mt-5 max-w-full mr-10"}
					        onClick={() => router.push("/offers")}>
						Anuluj
				</button>
				<button className={"bg-white text-black h-fit w-fit py-2 px-20 rounded mt-5 max-w-full"}
					        onClick={handleSubmit}>
						Zatwierdź dane
				</button>
			</div>

		</div>
	)
}

export default UserData