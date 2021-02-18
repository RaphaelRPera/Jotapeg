export function setNickname (nickname) {
    // console.log('setNickname:', nickname)
    return {
        type: 'NICKNAME',
        payload: nickname
    }
}