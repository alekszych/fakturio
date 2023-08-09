import React, {createContext, useState} from "react"
import "../styles/globals.css"
export const AuthContext = createContext(null)

function MyApp({ Component, pageProps }) {
	const [token, setToken] = useState("")
	const [account, setAccount] = useState("")
	return (
		<AuthContext.Provider value={{
			token: token, setToken: setToken,
			account: account, setAccount: setAccount
		}}>
			<main className={"flex-col items-center min-h-screen min-w-full bg-[#2d2b2f] p-10"}>
				<Component {...pageProps} />
			</main>
		</AuthContext.Provider>
	)
}

export default MyApp
