<template>
  <div class="vueCont vueCont--products">
    <div class="homeProducts">
      <h1>Our Products</h1>
      <div class="products">
        <div class="product">
          <div class="product__visual">
            <img :src="image1" alt />
          </div>
          <div class="product__texts">
            <p class="name">Surface</p>
            <p
              class="desc"
            >Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil fuga perferendis, reiciendis fugiat temporibus quasi iste esse. Perspiciatis, consectetur autem esse ipsam temporibus iusto consequatur nisi enim voluptatum vero tempora.</p>
            <button class="vueBtn vueBtn--green">Add to Cart</button>
          </div>
        </div>
         <div class="product">
          <div class="product__visual">
            <img :src="image2" alt />
          </div>
          <div class="product__texts">
            <p class="name">Surface</p>
            <p
              class="desc"
            >Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil fuga perferendis, reiciendis fugiat temporibus quasi iste esse. Perspiciatis, consectetur autem esse ipsam temporibus iusto consequatur nisi enim voluptatum vero tempora.</p>
            <button class="vueBtn vueBtn--green">Add to Cart</button>
          </div>
        </div>
         <div class="product">
          <div class="product__visual">
            <img :src="image3" alt />
          </div>
          <div class="product__texts">
            <p class="name">Surface</p>
            <p
              class="desc"
            >Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil fuga perferendis, reiciendis fugiat temporibus quasi iste esse. Perspiciatis, consectetur autem esse ipsam temporibus iusto consequatur nisi enim voluptatum vero tempora.</p>
            <button class="vueBtn vueBtn--green">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "homeProducts",
  data() {
    return {
      image1: "http://bit.ly/37NMuHM",
      image2: "http://bit.ly/33uh1Hr",
      image3: "http://bit.ly/2L661JM"
    };
  }
};
</script>