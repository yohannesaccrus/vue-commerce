<template>
  <div class="home">
    <NavBar></NavBar>
    <homeHero></homeHero>
    <homeProducts></homeProducts>
    <Login></Login>
    <mini-cart></mini-cart>
  </div>
</template>

<script>
import homeHero from "@/sections/home/homeHero.vue";
import homeProducts from "@/sections/home/homeProducts.vue";
import Login from "@/components/Login.vue";
export default {
  name: "home",
  components: {
    homeHero,
    homeProducts,
    Login
  }
};
</script>
