<template>
  <div class="vueCont">
    <div class="homeHero">
      <div class="homeHero__texts">
        <h1>Vue Shop</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem similique odio ipsum in quas, nemo inventore labore dignissimos, necessitatibus modi a libero cumque sint rerum dolores possimus ut impedit. Consectetur.</p>
        <div class="buttons">
          <button class="vueBtn vueBtn--green explore">Explore</button>
          <button class="vueBtn products">Products</button>
        </div>
      </div>
      <div class="homeHero__visual">
          
        <img :src="hero1Img" alt="img" />
        <img :src="hero2Img" alt="img" />
        <img :src="hero3Img" alt="img" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "homeHero",
  data() {
    return {
      hero1Img: require("../../assets/img/hero1.svg"),
      hero2Img: require("../../assets/img/hero2.svg"),
      hero3Img: require("../../assets/img/hero3.svg"),
    };
  }
};
</script>