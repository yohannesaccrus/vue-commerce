<template>
  <div class="vueAdmin">
    <div class="adminHero">
      <div class="adminHero__texts">
        <h2>Products Area</h2>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor ullam deleniti, dolorum quas architecto distinctio aspernatur temporibus est! Dolore perspiciatis ipsam reiciendis harum facere quod labore impedit ea quas ab.</p>
      </div>
      <div class="adminHero__visual">
        <img :src="heroImage" alt="heroImg" />
      </div>
    </div>
    <hr />
  </div>
</template>

<script>
export default {
  name: "products",
  data() {
    return {
      heroImage: require("../assets/img/products.svg")
    };
  }
};
</script>