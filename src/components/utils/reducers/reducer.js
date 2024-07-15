export const reducer = (state, action) => {
    switch(action.type) {
        case 'SET_TOKEN': 
            return {...state, token: action.payload}
        case 'SET_USER_INFO': 
            return {...state, userData: action.payload}
        case 'SET_LIST_RECURSOS': 
            return {...state, recursosList: action.payload}
        case 'SET_LIST_OTROS_RECURSOS': 
            return {...state, otrosRecursosList: action.payload}
        case 'SET_LIST_UNIDADES': 
            return {...state, unidadesList: action.payload}
        case 'SET_LIST_RESERVAS':
            return {...state, reservasList: action.payload}
        case 'SET_LIST_USUARIOS':
            return {...state, usuariosList: action.payload}
        case 'ADD_FAV':
            return {...state, dentistaSelected: [...state.dentistaSelected, action.payload]}
        case 'DEL_FAV':
            return {...state, dentistaSelected: state.dentistaSelected.filter(dentista => dentista.id !== action.payload.id)}
        case 'CHANGE_THEME': 
            return {...state,theme:state.theme=='light'?'dark':'light'}
    }
}   