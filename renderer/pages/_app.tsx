import React, {createContext, useState} from "react"
import "../styles/globals.css"
import {Nav} from "../components/Global/Nav"
import {useRouter} from "next/router"
export const AuthContext = createContext(null)

const MyApp = ({Component, pageProps}) => {
	const [token, setToken] = useState<String>("")
	const [account, setAccount] = useState<String>("")
	const router = useRouter()
	return (
		<AuthContext.Provider value={{
			token: token, setToken: setToken,
			account: account, setAccount: setAccount
		}}>
			<div className={"flex bg-gray-100"}>
				{router.route !== "/Home" && <Nav/>}
				<main className={"flex-col bg-gray-100 items-center min-h-screen w-full p-10 relative overflow-auto"}>
					<Component {...pageProps} />
				</main>
			</div>
		</AuthContext.Provider>
	)
}

export default MyApp
