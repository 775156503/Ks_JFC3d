<template>
  <div class="comment-container" id="Div_YM" v-show="props.flood2">
    <div class="comment-title" id="ymtitle">
      <h4>框选淹没</h4>
      <i class="comment-close" @click="closeFlood2"></i>
    </div>
    <p class="slogen">淹没参数设置：</p>
    <div class="setingBar">
      <div class="form-group" style="height: 30px">
        <input
          id="maxHeight"
          v-model="maxHeight"
          required="required"
          class="form-control"
        />
        <label class="form-label form_left">最大高度：</label>
        <label class="form-label form_right">(m)</label>
      </div>
      <div class="form-group" style="height: 30px">
        <input
          id="minHeight"
          v-model="minHeight"
          required="required"
          class="form-control"
        />
        <label class="form-label form_left">最小高度：</label>
        <label class="form-label form_right">(m)</label>
      </div>
      <div class="form-group" style="height: 30px">
        <input
          id="speed"
          v-model="speed"
          required="required"
          class="form-control"
        />
        <label class="form-label form_left">淹没速度：</label>
        <label class="form-label form_right">(m/h)</label>
      </div>
      <div class="form-group" style="height: 30px">
        <input
          id="Text_sj"
          v-model="Text_sj"
          required="required"
          class="form-control"
        />
        <label class="form-label form_left">推演时间：</label>
        <label class="form-label form_right">(h)</label>
      </div>
    </div>
    <div>
      <button type="button" id="YM_clear" class="toolbtn" @click="floodClear">
        清除
      </button>
      <button
        type="button"
        id="YM_pause"
        class="toolbtn"
        @click="floodPause"
        ref="pauseRef"
      >
        {{ pauseBtn }}
      </button>
      <button type="button" id="YM_begin" class="toolbtn" @click="floodBegin">
        开始
      </button>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, watch } from 'vue'

const props = defineProps({
  flood2: Boolean,
})
watch(props, () => {
  if (props.flood2 == true) {
    viewer.camera.flyTo({
      //四川地形--示例
      destination: new Cesium.Cartesian3(
        -1206939.1925299785,
        5337998.241228442,
        3286279.2424502545
      ),
      orientation: {
        heading: 1.4059101895600987,
        pitch: -0.20917672793046682,
        roll: 2.708944180085382e-13,
      },
    })
  }
})
const emit = defineEmits(['closeFlood2'])
const closeFlood2 = () => {
  emit('closeFlood2', false)
}

//最大高度
let maxHeight = ref(6000)
//最小高度 图层最先加载的高度
let minHeight = ref(1000)
//淹没速度
let speed = ref(50)
//推演时间
let Text_sj = ref(0)
//开始按钮
let beginRef = ref(null)
// 注册颜色表单
let hypFlood
const init = () => {
  hypFlood = new Cesium.HypsometricSetting()
  let floodColorTable = new Cesium.ColorTable()
  colorTableInit(floodColorTable)
  hypFlood.DisplayMode = Cesium.HypsometricSettingEnum.DisplayMode.FACE
  hypFlood._lineColor = new Cesium.Color(1.0, 0.0, 0.0, 1.0)
  hypFlood.MinVisibleValue = 0
  hypFlood.MaxVisibleValue = 0
  hypFlood.ColorTableMinKey = 1
  hypFlood.ColorTableMaxKey = 9000
  hypFlood.ColorTable = floodColorTable
  hypFlood.Opacity = 0.8
  hypFlood.LineInterval = 200.0
}
// 默认设置淹没分析颜色
function colorTableInit(floodColorTable) {
  floodColorTable.insert(4000, new Cesium.Color(210 / 255, 15 / 255, 15 / 255))
  floodColorTable.insert(3000, new Cesium.Color(221 / 255, 224 / 255, 7 / 255))
  floodColorTable.insert(2000, new Cesium.Color(20 / 255, 187 / 255, 18 / 255))
  floodColorTable.insert(1000, new Cesium.Color(0, 161 / 255, 1))
  floodColorTable.insert(0, new Cesium.Color(9 / 255, 9 / 255, 212 / 255))
}
//绘制多边形
const tooltip = createTooltip(viewer._element)
const polygonHandler = new Cesium.DrawHandler(viewer, Cesium.DrawMode.Polygon)

/* 分割线,以下为测试 */
onMounted(() => {
  init()
  polygonHandler.activeEvt.addEventListener(function (isActive) {
    if (isActive == true) {
      viewer.enableCursorStyle = false
      viewer._element.style.cursor = ''
      document.querySelector('body').classList.remove('drawCur2')
      document.querySelector('body').classList.add('drawCur2')
    } else {
      viewer.enableCursorStyle = true
      document.querySelector('body').classList.remove('drawCur2')
    }
  })
  polygonHandler.movingEvt.addEventListener(function (windowPosition) {
    if (windowPosition.x < 200 && windowPosition.y < 150) {
      tooltip.setVisible(false)
      return
    }
    tooltip.showAt(windowPosition, '<p>开始绘制分析区域，右键结束绘制</p>')
  })
  polygonHandler.drawEvt.addEventListener(function (polygon) {
    polygonHandler.polygon.show = false
    polygonHandler.polyline.show = false
    tooltip.setVisible(false)
    var array = [].concat(polygon.object.positions)
    let positions = []
    for (var i = 0, len = array.length; i < len; i++) {
      var cartographic = Cesium.Cartographic.fromCartesian(array[i])
      var longitude = Cesium.Math.toDegrees(cartographic.longitude)
      var latitude = Cesium.Math.toDegrees(cartographic.latitude)
      var h = cartographic.height
      if (
        positions.indexOf(longitude) == -1 &&
        positions.indexOf(latitude) == -1
      ) {
        positions.push(longitude)
        positions.push(latitude)
        positions.push(h)
      }
    }
    currentPositions.value = positions
    floodUpdate(positions)
    polygonHandler.deactivate()
  })
})
// 更新淹没分析
let maxValue = 0
let minValue = 0
var interval = null
let sj_ym = 0
let isym = true //淹没状态
let currentHeight = 0 //当前高度
let stopheight = 0 //停止的高度
let currentPositions = ref(null) //当前淹没的位置
function floodUpdate(positions) {
  if (isym) {
    currentHeight = parseInt(minHeight.value)
  } else {
    currentHeight = stopheight
  }
  hypFlood.CoverageArea = positions
  maxValue = parseInt(maxHeight.value)
  minValue = parseInt(minHeight.value)
  // let currentHeight = minValue
  hypFlood.MinVisibleValue = minValue
  interval = self.setInterval('flood()', 100)
  isym = false
  window.flood = () => {
    if (currentHeight > maxValue) {
      self.clearInterval(interval)
      sj_ym = 0
      return
    }
    hypFlood.MaxVisibleValue = currentHeight
    hypFlood.MinVisibleValue = minValue
    viewer.scene.globe.HypsometricSetting = {
      hypsometricSetting: hypFlood,
      analysisMode: Cesium.HypsometricSettingEnum.AnalysisRegionMode.ARM_REGION,
    }
    sj_ym = sj_ym + 0.1
    Text_sj.value = sj_ym.toFixed(1)
    currentHeight = currentHeight + parseInt(parseFloat(speed.value))
    stopheight = currentHeight
    console.log('hypFlood', hypFlood)
  }
}
//激活绘制
const floodBegin = () => {
  polygonHandler.activate()
}
// 暂停功能
const pauseRef = ref(null)
const pauseBtn = ref('暂停')
const pauseStatus = ref(false)
const floodPause = () => {
  pauseStatus.value = !pauseStatus.value
  if (pauseStatus.value == true) {
    pauseBtn.value = '继续'
    currentHeight = stopheight
    self.clearInterval(interval)
  } else {
    pauseBtn.value = '暂停'
    floodUpdate(currentPositions.value)
  }
}
// 清除
const floodClear = () => {
  clear()
  pauseBtn.value = '暂停'
  pauseStatus.value = false
  sj_ym = 0
  Text_sj.value = sj_ym
  isym = true
}
function clear() {
  self.clearInterval(interval)
  polygonHandler.deactivate()
  polygonHandler.clear()
  tooltip.setVisible(false)
  viewer.scene.globe.HypsometricSetting = undefined
}
</script>
<style scoped>
.form_left {
  left: 20px;
}
.form_right {
  margin-left: 160px;
}
:deep(.slogen) {
  margin: 0;
  padding: 0 20px;
  line-height: 18px;
  text-align: justify;
  margin: 5px 0 0 0;
  /*color: cornflowerblue;*/
  font-size: 13px;
}
:deep(.setingBar) {
  width: 150px;
  height: 110px;
  margin: 5px;
  border-radius: 4px;
  margin-left: 35px;
  /*color: cornflowerblue;*/
}
.form-group::before {
  content: attr(data-foo);
  color: black;
}
:deep(.toolbtn) {
  box-sizing: border-box;
  height: 30px;
  width: 55px;
  border: none;
  font-size: 12px;
  border-radius: 3px;
  color: #fff;
  background: #528cc9;
  cursor: pointer;
  float: right;
  margin-right: 30px;
  margin-top: 0px;
}
</style>
