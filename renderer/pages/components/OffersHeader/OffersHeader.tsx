import React, {FC} from "react"
import {Button} from "../Button"
import {LiaFileInvoiceDollarSolid} from "react-icons/lia"
import {BsPersonGear} from "react-icons/bs"
import {PiNoteDuotone} from "react-icons/pi"
import {useRouter} from "next/router"
import {OffersHeaderTypes} from "./OffersHeader.types"

export const OffersHeader: FC <OffersHeaderTypes> = ({handleCreateInvoices}) => {
	const router = useRouter()
	return (
		<header>
			<h1 className={"text-3xl"}>Zamówienia allegro</h1>
			<nav className={"flex items-start"}>
				<Button onClick={() => handleCreateInvoices()}> <LiaFileInvoiceDollarSolid className={"mr-2 text-xl"}/> <p className={"text-sm py-1"}> Utwórz faktury </p> </Button>
				<Button onClick={() => router.push("/Home")}> <BsPersonGear className={"mr-2 text-xl"}/> <p className={"text-sm py-1"}> Zmień konto </p> </Button>
				<Button onClick={() => router.push("/AccountData")}> <PiNoteDuotone className={"mr-2 text-xl"}/> <p className={"text-sm py-1"}> Zmień dane konta </p> </Button>
			</nav>
		</header>
	)
}
