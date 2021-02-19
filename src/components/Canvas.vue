<template>
  <div class="background">
    <h1>{{ msg }}</h1>
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
