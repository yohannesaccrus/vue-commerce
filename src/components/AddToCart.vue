<template>
  <div>
    <button @click="addToCart" class="vueBtn vueBtn--green">Add to Cart</button>
  </div>
</template>

<script>
export default {
  name: "add-to-cart",
  props: {
    name: String,
    price: String,
    image: String,
    pId: String
  },
  data() {
    return {
      item: {
        productName: this.name,
        productPrice: this.price,
        productImg: this.image,
        product_id: this.pId,
        productQuantity: 1
      }
    };
  },
  methods: {
    addToCart() {
      $("#modalCart").modal("show");
      this.$store.commit("addToCart", this.item);
    }
  }
};
</script>