import React, {FC, useEffect, useState} from "react"
import {FormTypes} from "./Form.types"
import {useRouter} from "next/router"
import {Button} from "../Button"
import {Select} from "../Select"
import {Input} from "../Input"
import {useOnInputChange} from "../../hooks/useOnInputChange"

export const Form: FC<FormTypes> = ({title, fields, defaultValues, onSubmit}) => {
	const router = useRouter()
	const [formData, setFormData] = useState<Object>({})
	const handleInputChange = event => {
		useOnInputChange({setState: setFormData, event: event})
	}

	useEffect(() => {
		if(!defaultValues) 
			return
		Object.entries(defaultValues).forEach(([key, value]) => {
			setFormData(formData => ({...formData, [key]: value}))
		})
	}, [defaultValues])

	return (
		<form className={"flex flex-col pl-[20px] pr-[28.75px] h-fit min-h-fit pb-5 max-w-full w-[730px] absolute left-0 right-0 top-0 bottom-0 mx-auto my-20"}>
			<h1 className={"text-3xl mb-5 text-blue-800 mx-[8.75px]"}>{title}</h1>

			<div className={"flex flex-wrap max-w-full"}>
				{fields.map(field =>
					<label className={"mb-4 mx-[8.75px] max-w-full"} key={field.devName}>
						<p className={"mb-1.5"}> {field.clientName} </p>
						{"options" in field ?
							<Select formData={formData} field={field} onChange={handleInputChange}/>
							:
							<Input field={field} onChange={handleInputChange} defaultValues={defaultValues}/>
						}
					</label>
				)}
			</div>

			{/*TODO: fix "Anuluj" button*/}
			<div className={"flex justify-end flex-wrap"}>
				<Button className={"mx-2 mb-4"} onClick={() => router.push("/Home")} variant={"outline"}> Anuluj </Button>
				<Button className={"mx-2"} onClick={(e) => onSubmit(e, formData)}> Zatwierdź </Button>
			</div>

		</form>
	)
}