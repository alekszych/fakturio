import React, {FC, useEffect, useState} from "react"
import {useOnInputChange} from "../../../hooks/useOnInputChange"
import {FormTypes} from "./Form.types"
import {useRouter} from "next/router"
import {Button} from "../Button"

export const Form: FC<FormTypes> = ({title, fields, defaultValues, onSubmit}) => {
	const router = useRouter()
	const [formData, setFormData] = useState<Object>()
	const handleInputChange = e => {
		useOnInputChange({setState: setFormData, event: e})
	}

	useEffect(() => {
		if(!defaultValues) 
			return
		Object.entries(defaultValues).forEach(([key, value]) => {
			setFormData(formData => ({...formData, [key]: value}))
		})
	}, [defaultValues])


	return (
		<form className={"flex flex-col h-fit pb-5"}>
			<h1 className={"text-3xl mb-5 text-blue-800"}>{title}</h1>

			{fields.map(field =>
				<label className={"mb-4"} key={field.devName}>
					<p className={"mb-1.5"}> {field.clientName} </p>
					<input className={"bg-[#eff1fa] w-full h-fit rounded-xl px-4 py-2 focus:outline-blue-300"} name={field.devName} onChange={handleInputChange} defaultValue={defaultValues && field.devName in defaultValues && defaultValues[field.devName]}/>
				</label>
			)}

			<div className={"flex justify-end"}>
				<Button onClick={() => router.back()} variant={"outline"}> Anuluj </Button>
				<Button onClick={(e) => onSubmit(e, formData)}> Zatwierdź </Button>
			</div>

		</form>
	)
}