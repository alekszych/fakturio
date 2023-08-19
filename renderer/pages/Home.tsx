import React, {useContext} from "react"
import {AuthContext} from "./_app"
import {useRouter} from "next/router"
import {useLogin} from "../hooks/useLogin"
import {BsPersonFillAdd, BsPersonFillDash} from "react-icons/bs"
import {FiLogIn} from "react-icons/fi"
import {AccountSelect} from "../components/AccountSelect"
import {Button} from "../components/Button"

const Home = () => {
	const router = useRouter()
	const {account, setAccount, setToken} = useContext(AuthContext)

	const handleLogin = async () => {
		await useLogin({account: account, setToken: setToken})
		await router.push("/Offers")
	}

	return (
		<div className={"absolute left-2 right-2 top-2 bottom-2 m-auto h-fit w-4/5 max-w-2xl p-5 pb-10"}>
			<h1 className={"text-3xl mx-auto text-center mb-5"}>Import faktur - Allegro</h1>
			<AccountSelect account={account} setAccount={setAccount}/>
			<div className={"flex mt-8 justify-center flex-wrap"}>
				<Button className={"mx-2 mb-4"} onClick={() => router.push("/AddAccount")}> <BsPersonFillAdd className={"mr-2 text-xl"}/> <p className={"text-sm py-1"}> Dodaj nowe konto </p> </Button>
				<Button className={"mx-2 mb-4"} onClick={() => router.push("/DeleteAccount")}> <BsPersonFillDash className={"mr-2 text-xl"}/> <p className={"text-sm py-1"}> Usuń konto </p> </Button>
				{account && <Button className={"mx-2"} onClick={handleLogin}> <FiLogIn className={"mr-2 text-xl"}/> <p className={"text-sm py-1"}> Zaloguj się </p> </Button>}
			</div>
		</div>
	)
}

export default Home
