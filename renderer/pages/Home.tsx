import React, {useContext, useEffect} from "react"
import {AccountSelect} from "./components/AccountSelect"
import {AuthContext} from "./_app"
import {useRouter} from "next/router"
import {LoginButton} from "./components/LoginButton"

const Home = () => {
	const router = useRouter()
	const {account, setAccount, setToken} = useContext(AuthContext)
	useEffect(() => {
		setToken("")
	}, [])

	return (
		<div className={"absolute left-0 right-0 top-0 bottom-0 m-auto h-fit w-4/5 max-w-2xl p-5 pb-10"}>
			<h1 className={"text-white text-3xl mx-auto text-center mb-5"}>Import faktur - Allegro</h1>
			<AccountSelect account={account} setAccount={setAccount}/>
			<div className={"flex mt-8 justify-center"}>
				<button className={"flex bg-white text-black h-fit w-fit py-2 px-10 rounded mx-2.5"}
					onClick={() => router.push("/AddAccount")}>
							Dodaj nowe konto
				</button>
				<button className={"flex bg-white text-black h-fit w-fit py-2 px-10 rounded mx-2.5"}
				        onClick={() => router.push("/DeleteAccount")}>
					Usuń konto
				</button>
				{account && <LoginButton/>}
			</div>
		</div>
	)
}

export default Home
