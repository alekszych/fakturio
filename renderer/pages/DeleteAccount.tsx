import React, {useState} from "react"
import {AccountSelect} from "./components/AccountSelect"
import {axiosInstance} from "../axios"
import {useRouter} from "next/router"
import {useErrorHandler} from "../hooks/useErrorHandler"
import {Account} from "../../types"
import {Button} from "./components/Button"

const DeleteAccount = () => {
	const [account, setAccount] = useState<Account>(null)
	const router = useRouter()
	const handleAccountDelete = async () => {
		const {data: responseData} = await axiosInstance.delete("/account", {params: {account: account}})
		useErrorHandler({responseData: responseData, success: async () => {
			await router.push("/Home")
			alert("Konto zostało usunięte")
		}})
	}
	return (
		<div className={"absolute left-0 right-0 top-0 bottom-0 m-auto h-fit w-4/5 max-w-2xl p-5 pb-10"}>
			<h1 className={"text-white text-3xl mx-auto text-center mb-5"}>Wybierz konto do usunięcia</h1>
			<AccountSelect account={account} setAccount={setAccount}/>
			<div className={"flex mt-8 justify-center"}>
				<Button onClick={() => router.push("/Home")}> Anuluj </Button>
				<Button onClick={handleAccountDelete}> Usuń konto </Button>
			</div>
		</div>
	)
}

export default DeleteAccount