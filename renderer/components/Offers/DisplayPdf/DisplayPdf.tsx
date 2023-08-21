import React, {FC, useEffect, useRef, useState} from "react"
import {Document, Page, pdfjs} from "react-pdf"
import "react-pdf/dist/esm/Page/AnnotationLayer.css"
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`
import "react-pdf/dist/esm/Page/TextLayer.css"
import {DisplayPdfTypes} from "./DisplayPdf.types"
import {GrFormClose} from "react-icons/gr"
import {axiosInstance} from "../../../axios"

export const DisplayPdf: FC <DisplayPdfTypes> = ({invoice, close}) => {
	const [file, setFile] = useState("")
	const [height, setHeight] = useState<number>(500)
	const [scale, setScale] = useState(1)
	const ref = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		(async () => {
			const resizeObserver = new ResizeObserver(() => {
				if(!ref.current)
					return
				setHeight(ref.current.clientHeight)
			})
			resizeObserver.observe(ref.current)
			try{
				const {data: invoiceFile} = await axiosInstance.get("/fakturownia/invoice/file", {params: {invoice: invoice}, responseType: "arraybuffer"})
				const b = new Blob([invoiceFile], {type: "application/pdf"})
				console.log(b, window.URL.createObjectURL(b))
				setFile(window.URL.createObjectURL(b))
			}
			catch (e) {
				alert(e.errorMessage)
				console.log(e.error)
			}
			return () => resizeObserver.disconnect()
		})()
	},[])

	return (
		<div className={"overflow-auto bg-gray-400 rounded flex items-center justify-center left-0 right-0 top-0 bottom-0 m-auto fixed p-6"} ref={ref}>
			<button className={"absolute top-2 right-2 text-3xl text-red-700"} onClick={close}> <GrFormClose/> </button>
			<div className={"h-fit relative"}>
				<Document file={file}>
					<Page pageNumber={1} height={height - 80} scale={scale} className={"overflow-auto"}/>
					<div className={"flex justify-center text-3xl fixed mx-auto left-0 right-0 bottom-2 z-10"}>
						<button className={"mr-3"} onClick={() => scale > 0 && setScale(scale - 0.1)}> - </button>
						<button onClick={() => scale < 3 && setScale(scale + 0.1)}> + </button>
					</div>
				</Document>
			</div>
		</div>
	)
}