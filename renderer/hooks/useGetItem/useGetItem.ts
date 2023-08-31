export const useGetItem = (name: string) => {
	if(typeof window !== "undefined") {
		return JSON.parse(localStorage.getItem(name))
	} else {
		return ""
	}
}