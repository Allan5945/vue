import * as types from './types'


export const mutations = {
    [types.CHANGENAME](state,newName) {
        state.name = newName;
    }
}