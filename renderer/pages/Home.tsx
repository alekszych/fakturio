"use client"
import React, {FC, useState} from "react"
import {useRouter} from "next/router"
import {useLogin} from "../hooks/useLogin"
import {BsPersonFillAdd, BsPersonFillDash} from "react-icons/bs"
import {FiLogIn} from "react-icons/fi"
import {AccountSelect} from "../components/Global/AccountSelect"
import {Button} from "../components/Global/Button"
import {useDispatch, useSelector} from "react-redux"
import {handleSetAccount} from "../store/slices/accountSlice"
import {SimpleAccount} from "../../global-types"

const Home: FC = () => {
	const dispatch = useDispatch()
	const router = useRouter()
	const [account, setAccount] = useState<SimpleAccount>(useSelector((state: any) => state.account))
	const handleLogin = async () => {
		dispatch(handleSetAccount(account))
		await useLogin(account, router, dispatch)
	}

	return (
		<div className={"absolute left-2 right-2 top-2 bottom-2 m-auto h-fit w-[560px] p-5 pb-10 max-w-full"}>
			<div className={"mx-auto flex items-center w-full mb-3"}>
				<img src={"/images/logo.png"} width={100} alt={""} className={"mr-2"}/>
				<div>
					<h1 className={"text-3xl font-semibold mb-2"}>
						<span className={"text-blue-800"}>Hej, </span>
						jestem
						<span className={"text-blue-800"}> fakturio</span>
						.
					</h1>
					<h2 className={"text-xl font-medium"}> Jestem twoim pomocnikiem do faktur Allegro.</h2>
				</div>
			</div>
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
