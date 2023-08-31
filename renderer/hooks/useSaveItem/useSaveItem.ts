export const useSaveItem = (name: string, value: string) => {
	if(typeof window !== "undefined") {
		localStorage.setItem(name, JSON.stringify(value))
	}
}