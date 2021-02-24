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
      this.$store.state.idx = (this.$store.state.idx + 1) % 4;
      console.log(this.$store.state.idx);
    }
  }
};
</script>
