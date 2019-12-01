import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

let cart = window.localStorage.getItem('cart')

export default new Vuex.Store({
    state: {
        cart: cart ? JSON.parse(cart) : [],
    },
    mutations: {
        addToCart(state, item) {
            let foundSameProduct = state.cart.find(product => product.product_id == item.product_id);
            if (foundSameProduct) {
                foundSameProduct.productQuantity++;
            } else {
                state.cart.push(item);
            }

            this.commit('saveData')
        },
        saveData(state) {
            window.localStorage.setItem('cart', JSON.stringify(state.cart));
        },
        removeFromCart(state, item) {
            let index = state.cart.indexOf(item);
            state.cart.splice(index, 1);
            
            this.commit('saveData')
        }
    }
})