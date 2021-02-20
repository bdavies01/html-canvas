<template>
  <div class="background">
    <h1>{{ message }}</h1>
    <canvas id="canvas_element" width="600" height="600"> </canvas>
  </div>
</template>

<script>
export default {
  name: "Canvas",
  data: function() {
    return {
      message: "Default",
      orangerect: {
        x: 50,
        y: 50,
        w: 100,
        l: 175
      },
      clown: {
        x: 300,
        y: 100,
        w: 150,
        l: 150,
        path: "assets/clown.jpg"
      },
      hand: {
        x: 100,
        y: 300,
        w: 150,
        l: 150,
        path: "assets/hand.jpg"
      },
      circle: {
        x: 400,
        y: 400,
        radius: 50
      }
    };
  },
  mounted: function() {
    const canvas = document.getElementById("canvas_element");
    const ctx = canvas.getContext("2d");

    draw_rectangle(ctx);
    draw_img(ctx, this.clown);
    draw_img(ctx, this.hand);
    draw_circle(ctx, this.circle);

    canvas.addEventListener("mousemove", e => {
      const rect = canvas.getBoundingClientRect();
      const pos = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
      if (isIntersectRect(pos, this.orangerect)) {
        this.message = "rectangle!";
      } else if (isIntersectRect(pos, this.clown)) {
        this.message = "clown!";
      } else if (isIntersectRect(pos, this.hand)) {
        this.message = "hand!";
      } else if (isIntersectCircle(pos, this.circle)) {
        this.message = "circle!";
      } else {
        this.message = "Default";
      }
    });
  }
};

function draw_rectangle(canv2d) {
  canv2d.fillStyle = "orange";
  canv2d.fillRect(50, 50, 100, 175);
}

function draw_img(canv2d, img) {
  const img_to_draw = new Image();
  img_to_draw.src = img.path;
  img_to_draw.onload = function() {
    canv2d.drawImage(img_to_draw, img.x, img.y, img.w, img.l);
  };
}

function draw_circle(canv2d, circle) {
  canv2d.beginPath();
  canv2d.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI, false);
  canv2d.fillStyle = "red";
  canv2d.fill();
}

function isIntersectCircle(point, circle) {
  var dist = Math.sqrt((point.x - circle.x) ** 2 + (point.y - circle.y) ** 2);
  return dist < circle.radius;
}

function isIntersectRect(point, rect) {
  return (
    point.x >= rect.x &&
    point.x <= rect.x + rect.w &&
    point.y >= rect.y &&
    point.y <= rect.y + rect.l
  );
}
</script>
