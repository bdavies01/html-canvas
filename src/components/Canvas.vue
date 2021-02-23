<template>
  <div class="background">
    <h1>{{ message }}</h1>
    <canvas id="canvasElement" width="600" height="600"> </canvas>
  </div>
</template>

<script>
export default {
  name: "Canvas",
  data: function() {
    return {
      message: "Default",
      rectDict: {
        orangeRect: {
          name: "orange rectangle",
          type: "shape",
          x: 50,
          y: 50,
          w: 100,
          l: 175
        },
        clown: {
          name: "clown",
          type: "img",
          x: 300,
          y: 100,
          w: 150,
          l: 150,
          path: "assets/clown.jpg"
        },
        hand: {
          name: "hand",
          type: "img",
          x: 100,
          y: 300,
          w: 150,
          l: 150,
          path: "assets/hand.jpg"
        }
      },
      circleDict: {
        circle: {
          name: "circle",
          x: 400,
          y: 400,
          radius: 50
        }
      }
    };
  },
  mounted: function() {
    const canvas = document.getElementById("canvasElement");
    const ctx = canvas.getContext("2d");

    for (var ridx in this.rectDict) {
      const rectangle = this.rectDict[ridx];
      if (rectangle.type == "shape") {
        ctx.fillStyle = "orange";
        ctx.fillRect(rectangle.x, rectangle.y, rectangle.w, rectangle.l);
      } else if (rectangle.type == "img") {
        const imgToDraw = new Image();
        imgToDraw.src = rectangle.path;
        imgToDraw.onload = function() {
          ctx.drawImage(
            imgToDraw,
            rectangle.x,
            rectangle.y,
            rectangle.w,
            rectangle.l
          ); //prettier wants this formatting
        };
      }
    }

    for (var cidx in this.circleDict) {
      const circle = this.circleDict[cidx];
      ctx.beginPath();
      ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI, false);
      ctx.fillStyle = "red";
      ctx.fill();
    }

    canvas.addEventListener("mousemove", e => {
      const rect = canvas.getBoundingClientRect();
      const pos = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
      for (var ridx in this.rectDict) {
        const rectangle = this.rectDict[ridx];
        isIntersectRect(this, pos, rectangle);
      }
      for (var cidx in this.circleDict) {
        const circle = this.circleDict[cidx];
        isIntersectCircle(this, pos, circle);
      }
    });
  }
};

function isIntersectCircle(obj, point, circle) {
  var dist = Math.sqrt((point.x - circle.x) ** 2 + (point.y - circle.y) ** 2);
  if (dist < circle.radius) {
    obj.message = circle.name;
  } else if (obj.message == "Default" || obj.message == circle.name) {
    obj.message = "Default";
  }
}

function isIntersectRect(obj, point, rect) {
  if (
    point.x >= rect.x &&
    point.x <= rect.x + rect.w &&
    point.y >= rect.y &&
    point.y <= rect.y + rect.l
  ) {
    obj.message = rect.name;
  } else if (obj.message == "Default" || obj.message == rect.name) {
    obj.message = "Default";
  }
}
</script>
