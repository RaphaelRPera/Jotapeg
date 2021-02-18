export default function searchBarReducer(state = '', action) {
    switch (action.type) {
        case 'SEARCHBAR': return action.payload
        default: return state
    }
}