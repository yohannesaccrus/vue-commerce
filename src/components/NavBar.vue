<template>
  <div class="navBar">
    <div class="navBar__menus">
      
      <a class="navBar__logo">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/1184px-Vue.js_Logo_2.svg.png"
          alt="vue"
        />
      </a>
      <router-link to="/" class="navBar__menu">Home</router-link>
      <router-link to="/about" class="navBar__menu">About</router-link>
      
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar"
};
</script>

<style scoped lang="scss">
</style>