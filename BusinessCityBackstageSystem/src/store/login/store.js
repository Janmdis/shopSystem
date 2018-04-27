

const state = {
    isLogin: 0
}

const mutations = {
    changeLogin(state,status){
        state.isLogin = status;
    }
}

const actions = {
    loginAction({commit}){
        commit('changeLogin', 1);
    }
}

export default {
    state,
    actions,
    mutations
}