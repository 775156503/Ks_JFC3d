<template>
  <div class="comment-container" id="Div_YM" v-show="props.flood">
    <div class="comment-title" id="ymtitle">
      <h4>模型淹没</h4>
      <i class="comment-close" @click="closeFlood"></i>
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
      <div class="form-group" style="height: 30px; display: none">
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
      <button type="button" id="YM_pause" class="toolbtn" @click="floodPause">
        暂停
      </button>
      <button
        type="button"
        id="YM_begin"
        class="toolbtn"
        @click="floodBegin"
        ref="beginRef"
      >
        {{ begin }}
      </button>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'

const props = defineProps({
  flood: Boolean,
})
const emit = defineEmits(['closeFlood'])
const closeFlood = () => {
  emit('closeFlood', false)
}

let isym = true
const hyp = new Cesium.HypsometricSetting()
hyp.MaxVisibleValue = 0
//最大高度
let maxHeight = ref(60)
//最小高度 图层最先加载的高度
let minHeight = ref(-13)
//淹没速度
let speed = ref(0.1)
//推演时间
let Text_sj = ref(0)
//
let begin = ref('开始')
//
let beginRef = ref(null)
let currentHeight = 0
let int = 0
let maxValue = 0
let minValue = 0
let stopheight = 0
const floodBegin = () => {
  if (isym) {
    currentHeight = parseInt(minHeight.value)
  } else {
    currentHeight = stopheight
  }
  int = setInterval(() => {
    floodMap()
  }, 100)
  maxValue = parseInt(maxHeight.value)
  minValue = parseInt(minHeight.value) - 207
  isym = false
  beginRef.value.disabled = true
}
let sj_ym = 0
const floodMap = () => {
  if (currentHeight > maxValue) {
    clearInterval(int)
    sj_ym = 0
    return
  }
  var hyp = new Cesium.HypsometricSetting()
  //创建分层设色对象   设置最大/最小可见高度   颜色表  显示模式   透明度及线宽
  var colorTable = new Cesium.ColorTable()
  hyp.MaxVisibleValue = currentHeight
  hyp.MinVisibleValue = minValue
  setColorTable(colorTable, '1')
  hyp.ColorTable = colorTable
  hyp.DisplayMode = Cesium.HypsometricSettingEnum.DisplayMode.FACE
  hyp.Opacity = 0.5
  hyp.LineInterval = 10.0
  //设置图层分层设色属性
  console.log(hyp, 'hyp')
  scene.layers.find('config').hypsometricSetting = {
    hypsometricSetting: hyp,
    analysisMode: Cesium.HypsometricSettingEnum.AnalysisRegionMode.ARM_ALL,
  }
  //scene.layers.find("config").refresh();
  sj_ym = sj_ym + 0.1
  Text_sj.value = sj_ym.toFixed(1)
  currentHeight = currentHeight + parseFloat(speed.value)
  stopheight = currentHeight
}
const floodPause = () => {
  begin.value = '继续'
  beginRef.value.disabled = false
  //document.getElementById("YM_begin").disabled = false;
  currentHeight = stopheight
  clearInterval(int)
  return
}
const floodClear = () => {
  begin.value = '开始'
  beginRef.value.disabled = false
  isym = true
  clearInterval(int)
  //var layer = scene.layers.find("YH0");
  let hyp = new Cesium.HypsometricSetting()
  //恢复 等于最小高度
  hyp.MaxVisibleValue = -13

  //layer.hypsometricSetting = {
  //    hypsometricSetting: hyp,
  //    analysisMode: Cesium.HypsometricSettingEnum.AnalysisRegionMode.ARM_ALL
  //}
  sj_ym = 0
  Text_sj.value = sj_ym
  scene.layers.find('config').hypsometricSetting = {
    hypsometricSetting: hyp,
    analysisMode: Cesium.HypsometricSettingEnum.AnalysisRegionMode.ARM_ALL,
  }
}
function setColorTable(colorTable, key) {
  switch (key) {
    case '1':
      colorTable.insert(71, new Cesium.Color(0, 39 / 255, 148 / 255))
      colorTable.insert(0, new Cesium.Color(149 / 255, 232 / 255, 249 / 255))
      break
    case '2':
      colorTable.insert(71, new Cesium.Color(162 / 255, 251 / 255, 194 / 255))
      colorTable.insert(0, new Cesium.Color(1, 103 / 255, 103 / 255))
      break
    case '3':
      colorTable.insert(71, new Cesium.Color(230 / 255, 198 / 255, 1))
      colorTable.insert(0, new Cesium.Color(157 / 255, 0, 1))
      break
    case '4':
      colorTable.insert(71, new Cesium.Color(210 / 255, 15 / 255, 15 / 255))
      colorTable.insert(54, new Cesium.Color(221 / 255, 224 / 255, 7 / 255))
      colorTable.insert(36, new Cesium.Color(20 / 255, 187 / 255, 18 / 255))
      colorTable.insert(18, new Cesium.Color(0, 161 / 255, 1))
      colorTable.insert(0, new Cesium.Color(9 / 255, 9 / 255, 212 / 255))
      break
    case '5':
      colorTable.insert(71, new Cesium.Color(186 / 255, 1, 229 / 255))
      colorTable.insert(0, new Cesium.Color(26 / 255, 185 / 255, 156 / 255))
      break
    default:
      break
  }
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
