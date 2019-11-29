<template>
  <div class="home">
    <NavBar></NavBar>
    <homeHero></homeHero>
    <homeProducts></homeProducts>
  </div>
</template>

<script>
import homeHero from "@/sections/home/homeHero.vue";
import homeProducts from "@/sections/home/homeProducts.vue";
export default {
  name: "home",
  components: {
    homeHero, 
    homeProducts
  }
};
</script>
