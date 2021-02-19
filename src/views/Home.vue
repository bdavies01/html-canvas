<template>
  <div class="home">
    <Canvas msg="Message placeholder" />
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from "@/components/HelloWorld.vue";
import Canvas from "@/components/Canvas.vue";

export default {
  name: "Home",
  components: {
    Canvas
  }
};
</script>
