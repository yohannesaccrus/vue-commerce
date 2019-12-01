<template>
  <div class="modal fade" id="modalCart" tabindex="-1">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal__cart">
          <h4>Cart</h4>
          <hr/>
          <div class="items">
            <div class="item" v-for="item in this.$store.state.cart">
              <div class="item__visual">
                <img :src="item.productImg" alt="dwa" />
              </div>
              <div class="item__texts">
                <p class="name">{{item.productName}}</p>
                <p class="price">{{ item.productPrice | currency }}</p>
                <p>Amount : {{ item.productQuantity }}</p>
               
              </div>
               <button @click="$store.commit('removeFromCart', item)" class="vueBtn btn-danger vueBtn--remove"><i class="fas fa-times"></i></button>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="vueBtn btn-secondary" data-dismiss="modal">Continue Shopping</button>
          <router-link to="/checkout">
            <button type="button" class="vueBtn btn-success" @click="checkOut">Checkout</button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "mini-cart",
  methods: {
    checkOut() {
      $('#modalCart').modal('hide')
    }
  }
};
</script>