import { createReducer } from '@reduxjs/toolkit'

// export default function (state=0, action) {
//     switch (action.type) {
//         case 'GETUSER': return action.payload
//         case 'SETUSER': return action.payload
//         default: return state
//     }
// }

export default createReducer(0, {
    'SETUSER': (state, action) => action.payload,
})