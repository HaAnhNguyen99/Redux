const { createStore } = window.Redux
// state
// reducer
// store

const initialState = JSON.parse(localStorage.getItem('hobbyList')) || []

const hobbyReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'ADD_HOBBY':
			{
				const newList = [...state]
				newList.push(action.payload)
				return newList
			}
			break
		default:
			return state
	}

	return state
	
}

let store = createStore(hobbyReducer)

// ----------------------------------------------------

// RENDER HOBBY LIST

const renderHobbyList = (hobbyList) => {
	if (!Array.isArray(hobbyList) || hobbyList.length === 0) return

	const ulElement = document.querySelector('#hobbyListId')

	if (!ulElement) return

	//reset previous content of ul

	ulElement.innerHTML = ''

	for (const hobby of hobbyList) {
		const liElement = document.createElement('li')
		liElement.textContent = hobby

		ulElement.appendChild(liElement)
	}
}

// Initial Store

const initialHobbyList = store.getState()
console.log(initialHobbyList)
renderHobbyList(initialHobbyList)

//Handle form submit

const hobbyFormElment = document.querySelector('#hobbyFormId')

if (hobbyFormElment) {
	const handleFormsubbmit = (e) => {
		e.preventDefault()

		const hobbyTextElement = hobbyFormElment.querySelector('#hobbyTextId')
		if (!hobbyTextElement) return

		console.log('submit', hobbyTextElement.value)

		const action = {
			type: 'ADD_HOBBY',
			payload: hobbyTextElement.value
		}

		store.dispatch(action)

		//reset form

		hobbyFormElment.reset()
	}

	hobbyFormElment.addEventListener('submit', handleFormsubbmit)
}

store.subscribe(() => {
	console.log('STATE HAVE BEEN UPDATE', store.getState())
	renderHobbyList(store.getState())
	localStorage.setItem('hobbyList', JSON.stringify(store.getState()))
})
