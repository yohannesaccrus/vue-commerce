<template>
  <div class="vueCont vueCont--products">
    <div class="homeProducts">
      <h1>Our Products</h1>
      <div class="products">
        <div class="product" v-for="product in products">
          <div class="product__visual">
            <carousel :perPage="1">
              <slide v-for="(image, index) in product.images" :key="index">
                <img :src="image" alt="..." />
              </slide>
            </carousel>
          </div>
          <div class="product__texts">
            <p class="name">{{ product.name }}</p>
            <p class="price">{{ product.price | currency }}</p>
            <p class="desc" v-html="product.desc"></p>
            <add-to-cart
              :p-id="product.id"
              :image="getImage(product.images)"
              :name="product.name"
              :price="product.price"
            ></add-to-cart>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "../../firebase";
export default {
  name: "homeProducts",
  data() {
    return {
      // image1: "http://bit.ly/37NMuHM",
      // image2: "http://bit.ly/33uh1Hr",
      // image3: "http://bit.ly/2L661JM"
      products: []
    };
  },
  methods: {
    getImage(images) {
      return images[0];
    }
  },
  firestore() {
    return {
      products: db.collection("products")
    };
  }
};
</script>