<template>
    <div class="checkout">
        <NavBar></NavBar>
        <div class="container mt-5 pt-5">
            <div class="row">
                <div class="col-md-9">
                    <h3 class="by-4 mb-4">Checkout Page</h3>
                    <ul>
                        <li v-for="item in this.$store.state.cart" class="media mb-2">
                            <img :src="item.productImg" width="80px" class="align-self-center mr-3" alt="...">
                            <div class="media-body">
                                <h5 class="mt-0">{{item.productName}}</h5>
                                <p class="mt0">{{ item.productPrice | currency }}</p>
                                <p class="mt0">Amount : {{ item.productQuantity }}</p>
                            </div>
                               <button @click="$store.commit('removeFromCart', item)" class="vueBtn btn-danger"><i class="fas fa-times"></i></button>
                        </li>
                    </ul>
                </div>
                <div class="col-md-3">
                    Total Price: Price
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "checkout"
}
</script>