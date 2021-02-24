<template>
  <div class="home">
    <Canvas></Canvas>
    <Rotate></Rotate>
  </div>
</template>

<script>
// @ is an alias to /src
import Canvas from "@/components/Canvas.vue";
import Rotate from "@/components/Rotate.vue";

export default {
  name: "Home",
  components: {
    Canvas,
    Rotate
  }
};
</script>
