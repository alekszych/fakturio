import React, {FC} from "react"
import Image from "next/image"
import {FiLogOut} from "react-icons/fi"
import {AiOutlineOrderedList} from "react-icons/ai"
import {FaRegAddressCard} from "react-icons/fa"
import {LiaFileInvoiceSolid} from "react-icons/lia"
import {useRouter} from "next/router"
import {useGetItem} from "../../../hooks/useGetItem"

export const Nav: FC = () => {
	const router = useRouter()
	const account = useGetItem("account")
	const links = [
		{name: "Zamówienia", icon: <AiOutlineOrderedList className={"text-3xl text-blue-800"}/>, href: "/Offers"},
		{name: "Dane do faktur", icon: <FaRegAddressCard className={"text-2xl text-blue-800"}/>, href: "/AccountData"},
		{name: "Pola faktury", icon: <LiaFileInvoiceSolid className={"text-3xl text-blue-800"}/>,  href: "/Home"}
	]

	return (
		<div className={"h-[100vh] min-w-[230px] relative"}>
			<nav className={"h-[100vh] min-w-[230px] flex flex-col justify-between px-6 py-8 bg-white fixed border-r-2 border-gray-200 shadow-md"}>
				<div>
					<div className={"flex items-center"}>
						<Image src={"/images/logo.png"} alt={"logo"} width={30} height={42}/>
						<h3 className={"text-2xl font-semibold text-blue-800 ml-2"}> Fakturio </h3>
					</div>
					<p className={"font-semibold text-blue-800 mt-1.5"}> Witaj, {account ? account.name : "użytkowniku"} </p>
				</div>

				<ul>
					{links.map(link =>
						<li className={"my-12 flex items-center content-center p-2 rounded hover:bg-gray-200 hover:text-blue-800 hover:cursor-pointer"}
						    key={link.name}
						    onClick={() => router.push(link.href)}
						>
							<div className={"flex items-center justify-center bg-gray-200 rounded h-[40px] w-[40px]"}>
								{link.icon}
							</div>
							<p className={"ml-2 font-medium"}> {link.name} </p>
						</li>
					)}
				</ul>

				<div className={"flex items-center content-center p-2 rounded hover:bg-gray-200 hover:text-blue-800"} onClick={() => router.push("/Home")}>
					<div className={"flex items-center justify-center bg-gray-200 rounded h-[40px] w-[40px]"}>
						<FiLogOut className={"text-3xl text-blue-800"}/>
					</div>
					<p className={"ml-2 font-medium"}> Wyloguj </p>
				</div>
			</nav>
		</div>
	)
}