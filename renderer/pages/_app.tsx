import React from "react"
import "../styles/globals.css"
import {Nav} from "../components/Global/Nav"
import {useRouter} from "next/router"
import {store} from "../store/store"
import {Provider} from "react-redux"
const pagesWithoutNav = ["/Home", "/AddAccount", "/DeleteAccount"]


const MyApp = ({Component, pageProps}) => {
	const router = useRouter()
	return (
		<Provider store={store}>
			<div className={"flex bg-gray-100"}>
				{!pagesWithoutNav.includes(router.pathname) && <Nav/>}
				<main className={"flex-col bg-gray-100 items-center min-h-screen w-full p-10 relative overflow-auto"}>
					<Component {...pageProps} />
				</main>
			</div>
		</Provider>
	)
}

export default MyApp
