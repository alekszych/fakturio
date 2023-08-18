import React, {FC} from "react"
import {Button} from "../Button"
import {OffersFooterTypes} from "./OffersFooter.types"
import {HiChevronLeft, HiChevronRight} from "react-icons/hi"

export const OffersFooter: FC <OffersFooterTypes> = ({page, setPage, offers}) => {
	return (
		<footer className={"flex items-start"}>
			{page > 0 && <Button onClick={() => setPage(page - 1)}><HiChevronLeft className={"text-2xl"}/></Button>}
			<Button> <p> {page + 1} </p> </Button>
			{(page + 1) * 25 < offers.length - 1 && <Button onClick={() => setPage(page + 1)}><HiChevronRight className={"text-2xl"}/></Button>}
		</footer>
	)
}
