<template>
  <div class="background">
    <button id="rotateButton" v-on:click="incrementState">Rotate</button>
  </div>
</template>

<script>
export default {
  name: "Rotate",
  methods: {
    incrementState: function() {
      console.log("epic!");
    }
  }
};
</script>
