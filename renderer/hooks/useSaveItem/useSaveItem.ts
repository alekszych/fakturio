import {UseSaveItemTypes} from "./useSaveItemTypes"

export const useSaveItem = async ({name, value}: UseSaveItemTypes) => {
	localStorage.setItem(name, value)
}