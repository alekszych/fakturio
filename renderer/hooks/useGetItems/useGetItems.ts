import {UseGetItemsTypes} from "./useGetItems.types"

export const useGetItems = async ({names}: UseGetItemsTypes) => {
	let data: Object = {}
	names.forEach(name => {
		data[name] = localStorage.getItem(name)
	})
	return data
}