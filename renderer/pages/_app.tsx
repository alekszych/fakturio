import React, {createContext, useState} from "react"
import "../styles/globals.css"
export const AuthContext = createContext(null)

function MyApp({Component, pageProps}) {
	const [token, setToken] = useState<String>("")
	const [account, setAccount] = useState<String>("")
	return (
		<AuthContext.Provider value={{
			token: token, setToken: setToken,
			account: account, setAccount: setAccount
		}}>
			<main className={"flex-col items-center min-h-screen min-w-full bg-white p-10 relative overflow-auto"}>
				<Component {...pageProps} />
			</main>
		</AuthContext.Provider>
	)
}

export default MyApp
