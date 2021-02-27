<template>
  <div class="background">
    <h1>{{ message }}</h1>
    <canvas
      id="canvasElement"
      width="600"
      height="600"
      style="border:1px solid #000000;"
    >
    </canvas>
  </div>
</template>

<script>
import * as d3 from "d3";
export default {
  name: "Canvas",
  data: function() {
    return {
      message: "Default",
      rectDict: {
        orangeRect: {
          name: "orange rectangle",
          type: "shape",
          x: 100,
          y: 100,
          xOld: 100,
          yOld: 100,
          xNew: 100,
          yNew: 100,
          w: 100,
          l: 175,
          isDragging: false
        },
        clown: {
          name: "clown",
          type: "img",
          x: 350,
          y: 100,
          xOld: 350,
          yOld: 100,
          xNew: 350,
          yNew: 100,
          w: 150,
          l: 150,
          isDragging: false,
          path: "assets/clown.jpg"
        },
        hand: {
          name: "hand",
          type: "img",
          x: 100,
          y: 350,
          xOld: 100,
          yOld: 350,
          xNew: 100,
          yNew: 350,
          w: 150,
          l: 150,
          isDragging: false,
          path: "assets/hand.jpg"
        }
      },
      circleDict: {
        circle: {
          name: "circle",
          x: 425,
          y: 425,
          xOld: 425,
          yOld: 425,
          xNew: 425,
          yNew: 425,
          radius: 50,
          isDragging: false
        }
      }
    };
  },
  mounted: function() {
    this.canvas = document.getElementById("canvasElement");
    this.ctx = this.canvas.getContext("2d");
    this.boundingRect = this.canvas.getBoundingClientRect();
    this.handImage = new Image();
    this.handImage.src = "assets/hand.jpg";
    this.handImage.onload = () => {
      this.ctx.drawImage(
        this.handImage,
        this.rectDict.hand.x,
        this.rectDict.hand.y,
        this.rectDict.hand.w,
        this.rectDict.hand.l
      );
    };
    this.clownImage = new Image();
    this.clownImage.src = "assets/clown.jpg";
    this.clownImage.onload = () => {
      this.ctx.drawImage(
        this.clownImage,
        this.rectDict.clown.x,
        this.rectDict.clown.y,
        this.rectDict.clown.w,
        this.rectDict.clown.l
      );
    };
    this.draw();

    this.canvas.addEventListener("mousemove", e => {
      const pos = {
        x: e.clientX - this.boundingRect.left,
        y: e.clientY - this.boundingRect.top
      };
      for (var ridx in this.rectDict) {
        const rectangle = this.rectDict[ridx];
        if (this.isIntersectRect(pos, rectangle)) {
          this.message = rectangle.name;
          if (rectangle.isDragging) {
            rectangle.x = pos.x - rectangle.w / 2 - this.dragDiffX;
            rectangle.y = pos.y - rectangle.l / 2 - this.dragDiffY;
            this.draw();
          }
        } else if (
          this.message == "Default" ||
          this.message == rectangle.name
        ) {
          this.message = "Default";
        }
      }
      for (var cidx in this.circleDict) {
        const circle = this.circleDict[cidx];
        if (this.isIntersectCircle(pos, circle)) {
          this.message = circle.name;
          if (circle.isDragging) {
            circle.x = pos.x - this.dragDiffX;
            circle.y = pos.y - this.dragDiffY;
            this.draw();
          }
        } else if (this.message == "Default" || this.message == circle.name) {
          this.message = "Default";
        }
      }
    });
    this.canvas.addEventListener("mousedown", e => {
      const pos = {
        x: e.clientX - this.boundingRect.left,
        y: e.clientY - this.boundingRect.top
      };
      for (var ridx in this.rectDict) {
        const rectangle = this.rectDict[ridx];
        if (this.isIntersectRect(pos, rectangle)) {
          rectangle.isDragging = true;
          this.dragDiffX = pos.x - rectangle.x - rectangle.w / 2;
          this.dragDiffY = pos.y - rectangle.y - rectangle.l / 2;
        }
      }
      for (var cidx in this.circleDict) {
        const circle = this.circleDict[cidx];
        if (this.isIntersectCircle(pos, circle)) {
          circle.isDragging = true;
          this.dragDiffX = pos.x - circle.x;
          this.dragDiffY = pos.y - circle.y;
        }
      }
    });
    this.canvas.addEventListener("mouseup", e => {
      const pos = {
        x: e.clientX - this.boundingRect.left,
        y: e.clientY - this.boundingRect.top
      };
      for (var ridx in this.rectDict) {
        const rectangle = this.rectDict[ridx];
        if (this.isIntersectRect(pos, rectangle)) {
          rectangle.isDragging = false;
        }
      }
      for (var cidx in this.circleDict) {
        const circle = this.circleDict[cidx];
        if (this.isIntersectCircle(pos, circle)) {
          circle.isDragging = false;
        }
      }
    });
  },
  computed: {
    updateStatus() {
      return this.$store.state.idx;
    }
  },
  watch: {
    updateStatus() {
      this.update();
      this.animate();
    }
  },
  methods: {
    animate: function() {
      const duration = 1500;
      const ease = d3.easeCubic;
      let timer;
      timer = d3.timer(elapsed => {
        const t = Math.min(1, ease(elapsed / duration));
        for (var ridx in this.rectDict) {
          const rectangle = this.rectDict[ridx];
          rectangle.x = rectangle.xOld * (1 - t) + rectangle.xNew * t;
          rectangle.y = rectangle.yOld * (1 - t) + rectangle.yNew * t;
        }
        for (var cidx in this.circleDict) {
          const circle = this.circleDict[cidx];
          circle.x = circle.xOld * (1 - t) + circle.xNew * t;
          circle.y = circle.yOld * (1 - t) + circle.yNew * t;
        }

        this.draw();

        if (t == 1) {
          timer.stop();
        }
      });
    },
    update: function() {
      const rotationAngle = Math.PI / 2;
      for (var ridx in this.rectDict) {
        const rectangle = this.rectDict[ridx];
        rectangle.xOld = rectangle.x;
        rectangle.yOld = rectangle.y;
        rectangle.xNew =
          225 +
          (rectangle.x - 225) * Math.cos(rotationAngle) -
          Math.sin(rotationAngle) * (rectangle.y - 225);
        rectangle.yNew =
          225 +
          (rectangle.x - 225) * Math.sin(rotationAngle) +
          Math.cos(rotationAngle) * (rectangle.y - 225);
      }

      for (var cidx in this.circleDict) {
        const circle = this.circleDict[cidx];
        circle.xOld = circle.x;
        circle.yOld = circle.y;
        circle.xNew =
          300 +
          (circle.x - 300) * Math.cos(rotationAngle) -
          Math.sin(rotationAngle) * (circle.y - 300);
        circle.yNew =
          300 +
          (circle.x - 300) * Math.sin(rotationAngle) +
          Math.cos(rotationAngle) * (circle.y - 300);
      }
    },
    draw: function() {
      this.ctx.clearRect(0, 0, 600, 600);
      for (var ridx in this.rectDict) {
        const rectangle = this.rectDict[ridx];
        if (rectangle.type == "shape") {
          this.ctx.fillStyle = "orange";
          this.ctx.fillRect(rectangle.x, rectangle.y, rectangle.w, rectangle.l);
        } else if (rectangle.type == "img") {
          if (rectangle.name == "hand") {
            this.ctx.drawImage(
              this.handImage,
              rectangle.x,
              rectangle.y,
              rectangle.w,
              rectangle.l
            );
          } else {
            this.ctx.drawImage(
              this.clownImage,
              rectangle.x,
              rectangle.y,
              rectangle.w,
              rectangle.l
            );
          }
        }
      }

      for (var cidx in this.circleDict) {
        const circle = this.circleDict[cidx];
        this.ctx.beginPath();
        this.ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI, false);
        this.ctx.fillStyle = "red";
        this.ctx.fill();
      }
    },
    isIntersectCircle: function(point, circle) {
      var dist = Math.sqrt(
        (point.x - circle.x) ** 2 + (point.y - circle.y) ** 2
      );
      if (dist < circle.radius) {
        return true;
      }
      return false;
    },
    isIntersectRect: function(point, rect) {
      if (
        point.x >= rect.x &&
        point.x <= rect.x + rect.w &&
        point.y >= rect.y &&
        point.y <= rect.y + rect.l
      ) {
        return true;
      }
      return false;
    }
  }
};
</script>
