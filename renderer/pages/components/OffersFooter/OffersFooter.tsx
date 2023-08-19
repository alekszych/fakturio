import React, {FC} from "react"
import {Button} from "../Button"
import {OffersFooterTypes} from "./OffersFooter.types"
import {HiChevronLeft, HiChevronRight} from "react-icons/hi"

export const OffersFooter: FC <OffersFooterTypes> = ({page, setPage, offers}) => {
	return (
		<footer className={"flex items-start mt-6"}>
			{page > 0 && <Button className={"mr-4"} onClick={() => setPage(page - 1)}><HiChevronLeft className={"text-2xl"}/></Button>}
			<Button> <p> {page + 1} </p> </Button>
			{(page + 1) * 25 < offers.length - 1 && <Button className={"ml-4"} onClick={() => setPage(page + 1)}><HiChevronRight className={"text-2xl"}/></Button>}
		</footer>
	)
}
