const SEND_MESSAGE = "SEND_MESSAGE"

let initialState = {
	dialogs: [
		{id: 1, name: "Vlad"},
		{id: 2, name: "Dmitry"},
		{id: 3, name: "Alexandr"},
		{id: 4, name: "Danil"},
		{id: 5, name: "Bakhyt"},
		{id: 6, name: "Talgat"}
	],

	messages: [
		{id: 1, message: "Hi"},
		{id: 2, message: "How are you doing ?"},
		{id: 3, message: "Who are you ?"},
		{id: 4, message: "Yo"},
		{id: 5, message: "Yo"}
	],
}

export const messagesReducer = (state = initialState, action) => {
	
	switch(action.type) {
		case SEND_MESSAGE:
			return {
				...state,
				messages: [...state.messages, {id: 6, message: action.data}]
			}
		default: 
			return state	
	}	
}

export const sendMessageCreator = (data) => ({ type: SEND_MESSAGE, data })

export default messagesReducer