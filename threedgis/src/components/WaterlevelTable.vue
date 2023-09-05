<template>
  <div class="main_box">
    <div class="main_title" id="div_ywname">
      {{ props.dataDetail_yw.equipmentName }}
    </div>
    <div class="water_bg">
      <div class="water_box">
        <div class="canvas_box">
          <canvas ref="myCanvas" id="myCanvas"></canvas>
          <div ref="waterltxt" class="waterltxt">
            {{ Number(props.dataDetail_yw.waterLeve).toFixed(2) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
//yw
// address: "1"
// elevation: 5
// emptyHeight: 6
// equipmentID: "12"
// equipmentName: "观湖小区雨水井1号"
// equipmentType: "液位计"
// lat: 28.57951036
// lon: 119.0115099
// nodeDepth: 1.5
// placeAddress: null
// sampleTime: "2022-06-27 15:44:21"
// status: 0
// voltage: 3618
// warnValue: 1.28
// waterLeve: 0.34
import { defineProps, watch, ref, onMounted } from 'vue'
const props = defineProps({
  dataDetail_yw: {
    type: Object,
    default: null,
  },
})

const myCanvas = ref(null)
const waterltxt = ref(null)

watch(
  props,
  (n, o) => {
    waterltxt.value.style.display = 'none'
    var waterL = props.dataDetail_yw.waterLeve
    var Welldepth = props.dataDetail_yw.nodeDepth
    var name = props.dataDetail_yw.equipmentName
    var proportion = parseFloat(waterL) / parseFloat(Welldepth)
    myCanvas.value.style.height = 122 * proportion + 'px'
    waterltxt.value.style.bottom = 112 * proportion + 'px'
    var waveWidth = 1000
    var offset = 0
    var waveHeight = 8
    var waveCount = 5
    var startX = -100
    var startY = 210
    var progress = 0
    var progressStep = 0.5
    var d2 = waveWidth / waveCount
    var d = d2 / 2
    var hd = d / 2
    var c = document.getElementById('myCanvas')
    var ctx = c.getContext('2d')
    tick()
    var style = ctx.createLinearGradient(0, 0, 100, 0) //根据参数创建线性渐变对象
    style.addColorStop(0, 'red') //设置渐变范围和渐变的颜色，当然中间我们还可以设置许多的颜色
    style.addColorStop(1, 'white')
    var linearGradient = ctx.createLinearGradient(50, 0, 50, 100)
    linearGradient.addColorStop(0, '#9FD7F6')
    linearGradient.addColorStop(1, '#3DACE8')
    ctx.fillStyle = linearGradient
    function tick() {
      offset -= 2
      progress = 199
      if (progress < 199) {
      } else {
        waterltxt.value.style.display = 'block'
      }
      if (-1 * offset === d2) offset = 0

      ctx.clearRect(0, 0, c.width, c.height)
      ctx.beginPath()
      var offsetY = startY - progress
      ctx.moveTo(startX - offset, offsetY)

      for (var i = 0; i < waveCount; i++) {
        var dx = i * d2
        var offsetX = dx + startX - offset
        //console.log(offsetY);
        ctx.quadraticCurveTo(
          offsetX + hd,
          offsetY + waveHeight,
          offsetX + d,
          offsetY
        )
        ctx.quadraticCurveTo(
          offsetX + hd + d,
          offsetY - waveHeight,
          offsetX + d2,
          offsetY
        )
      }
      ctx.lineTo(startX + waveWidth, 200)
      ctx.lineTo(startX, 200)
      ctx.fill()

      requestAnimationFrame(tick)
    }
  },
  { deep: true }
)
</script>
<style scoped>
.main_box {
  height: 187px;
  width: 100%;
  overflow: hidden;
}
.main_title {
  height: 30px;
  width: 100%;
  position: absolute;
  text-align: center;
  z-index: 999;
  color: white;
}
body {
  margin: 0px;
}
@keyframes anim {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.waterltxt {
  animation: anim 1s;
}
.waterltxt {
  transform: translate(all, 3s);
}
.water_bg {
  height: 100%;
  width: 100%;
  background-image: url(/images/waterL.png);
  background-size: 100% 100%;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.water_box {
  position: absolute;
  top: 21.5%;
  width: 52px;
  height: 122px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
.canvas_box {
  width: 100%;
  height: 122px;
  position: absolute;
  bottom: -12px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  overflow: hidden;
}
#myCanvas {
  width: 600%;
  height: 13px;
  position: absolute;
  bottom: 0px;
  left: -498%;
}
.waterltxt {
  position: absolute;
  bottom: 20%;
  color: #fff;
  font-size: 13px;
  width: 100%;
  text-align: center;
}
</style>
