export const useOnInputChange = ({setState, event}) => {
	const {value, name} = event.target
	setState(state => ({...state, [name]: value}))
}