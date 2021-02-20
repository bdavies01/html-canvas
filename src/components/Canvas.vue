<template>
  <div class="background">
    <h1>{{ msg }}</h1>
    <canvas id="canvas_element" width="600" height="600"> </canvas>
  </div>
</template>

<script>
export default {
  name: "Canvas",
  props: {
    msg: String
  }
};
</script>
