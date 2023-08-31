import React, {useState} from "react"
import {axiosInstance} from "../axios"
import {useRouter} from "next/router"
import {useErrorHandler} from "../hooks/useErrorHandler"
import {Account} from "../../global-types"
import {AccountSelect} from "../components/Global/AccountSelect"
import {Button} from "../components/Global/Button"
import {useGetItem} from "../hooks/useGetItem"
import {useSaveItem} from "../hooks/useSaveItem"

const DeleteAccount = () => {
	const [account, setAccount] = useState<Account>(useGetItem("account"))
	const router = useRouter()
	const handleAccountDelete = async () => {
		const {data: responseData} = await axiosInstance.delete("/account", {params: {account: account}})
		await useErrorHandler(responseData, async () => {
			await router.push("/Home")
			useSaveItem("account", "")
			alert("Konto zostało usunięte")
		})
	}
	return (
		<div className={"absolute left-0 right-0 top-0 bottom-0 m-auto h-fit w-4/5 max-w-2xl p-5 pb-10"}>
			<h1 className={"text-3xl mx-auto text-center mb-5"}>Wybierz konto do usunięcia</h1>
			<AccountSelect account={account} setAccount={setAccount}/>
			<div className={"flex mt-8 justify-center"}>
				<Button className={"mx-1.5"} onClick={() => router.push("/Home")}> Anuluj </Button>
				<Button className={"mx-1.5"} onClick={handleAccountDelete}> Usuń konto </Button>
			</div>
		</div>
	)
}

export default DeleteAccount