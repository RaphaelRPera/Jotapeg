export default function nicknameReducer(state = 0, action) {
    switch (action.type) {
        case 'NICKNAME': return action.payload
        default: return state
    }
}