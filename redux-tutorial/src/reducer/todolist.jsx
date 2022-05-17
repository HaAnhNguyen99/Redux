const initialState = {
	list: [],
	id: null
}

const TodoList = (state = initialState) => {
	switch (state.type) {
		case 'ADD':
			return state
		default:
			return state
	}
}
export default TodoList
