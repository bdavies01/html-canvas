import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
  mounted: function() {
    const canvas = document.getElementById("canvas_element");
    const ctx = canvas.getContext("2d");

    draw_rectangle(ctx);
    draw_img(ctx, "assets/clown.jpg", 300, 100);
    draw_img(ctx, "assets/hand.jpg", 100, 300);
    draw_circle(ctx);
  }
}).$mount("#app");

function draw_rectangle(canv2d) {
  canv2d.fillStyle = "orange";
  canv2d.fillRect(50, 50, 100, 175);
}

function draw_img(canv2d, imgsrc, x, y) {
  const img_to_draw = new Image();
  img_to_draw.src = imgsrc;
  img_to_draw.onload = function() {
    canv2d.drawImage(img_to_draw, x, y, 150, 150); 
  };
}

function draw_circle(canv2d) {
  const centerX = 400;
  const centerY = 400;
  const radius = 50;
  canv2d.beginPath();
  canv2d.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
  canv2d.fillStyle = "red";
  canv2d.fill();
}
