<template>
  <div class="home">
    <Canvas msg="Message placeholder" />
  </div>
</template>

<script>
// @ is an alias to /src
import Canvas from "@/components/Canvas.vue";

export default {
  name: "Home",
  components: {
    Canvas
  }
};
</script>
