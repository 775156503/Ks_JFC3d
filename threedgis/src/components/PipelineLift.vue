<template>
  <div class="comment-container" id="toolbar2" v-show="props.opacity2">
    <div class="comment-title" id="titlemove2">
      <h4>地下管线</h4>
      <i class="comment-close" @click="closeOpacity2"></i>
    </div>
    <div class="label_box">管线抬高</div>
    <div class="main_box">
      <div class="ipt_box">
        <input
          id="tmdslide2"
          type="range"
          style="cursor: pointer"
          min="0"
          max="50"
          step="0.1"
          title="调整地表透明度"
          data-bind="value: globeAlpha2, valueUpdate: 'input'"
        />
      </div>

      <div class="input_box">
        <div class="label_box2">结果值可输入：</div>
        <input
          id="ipt2"
          class="ipt_box2"
          type="text"
          size="5"
          data-bind="value: globeAlpha2"
        />
        <!-- <div class="reset" @click="reset">恢复</div> -->
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, watch } from 'vue'
const props = defineProps({
  opacity2: Boolean,
})

const emit = defineEmits(['closeOpacity2'])
const closeOpacity2 = () => {
  emit('closeOpacity2', false)
}
//监听滑动条变化，改变alpha的值，设置管线底部高程值
let gwnbLayer
let gwbnLayer
let jsLayer
// 解决获取不到图层的bug
Cesium.when.all([promise6, promise7, promise8], function (layers) {
  gwnbLayer = viewer.scene.layers.find('GWNB')
  gwbnLayer = viewer.scene.layers.find('GWBN')
  jsLayer = viewer.scene.layers.find('js')
})
let style3D = new Cesium.Style3D()
let sliderblock
let viewModel
let toolbar
onMounted(() => {
  sliderblock = document.getElementById('tmdslide2')
  sliderblock.style.backgroundSize = '0% 100%' //设置滑动条初始值
  RangeSlider({ min: 0, max: 50, step: 0.1, callback: change }, sliderblock)
  //监听滑动条变化，改变alpha的值，设置管线底部高程值
  viewModel = {
    globeAlpha2: 0.0,
  }
  Cesium.knockout.track(viewModel)
  toolbar = document.getElementById('toolbar2')
  Cesium.knockout.applyBindings(viewModel, toolbar)
  Cesium.knockout
    .getObservable(viewModel, 'globeAlpha2')
    .subscribe(function (newValue) {
      style3D.bottomAltitude = Number(newValue) //底部高程
      gwnbLayer.style3D = style3D
      gwnbLayer.refresh()
      gwbnLayer.style3D = style3D
      gwbnLayer.refresh()
      jsLayer.style3D = style3D
      jsLayer.refresh()
      const b = (document.getElementById('ipt2').value * 100) / 50
      sliderblock.style.backgroundSize = b + '% 100%'
    })
})
const change = () => {}
const RangeSlider = function (cfg, uu) {
  uu.sliderCfg = {
    min: cfg && !isNaN(parseFloat(cfg.min)) ? Number(cfg.min) : null,
    max: cfg && !isNaN(parseFloat(cfg.max)) ? Number(cfg.max) : null,
    step: cfg && Number(cfg.step) ? cfg.step : 1,
    callback: cfg && cfg.callback ? cfg.callback : null,
  }
  var min = uu.sliderCfg.min
  var max = uu.sliderCfg.max
  var step = uu.sliderCfg.step
  var callback = uu.sliderCfg.callback

  uu.setAttribute('min', min)
  uu.setAttribute('max', max)
  uu.setAttribute('step', step)

  uu.oninput = function (e) {
    uu.setAttribute('value', this.value)
    // var a = ((this.value - 20) * 100) / 30
    var a = (this.value * 100) / 50
    uu.style.backgroundSize = a + '% 100%'
    var value = this.value
    // console.log('uu.style.backgroundSize', uu.style.backgroundSize)
    //for (var i = 0; i < aspan.length; i++) {
    //    (function (index) {
    //        if (index < value) {
    //            aspan[index].style.backgroundColor = "#059CFA";
    //        } else {
    //            aspan[index].style.backgroundColor = "#CCCCCC";
    //        }
    //    })(i)
    //};
    if (typeof callback == 'function') {
      callback(this)
    }
  }
}
//恢复默认设置
const reset = () => {
  sliderblock.style.backgroundSize = '0% 100%' //设置滑动条初始值
  style3D.bottomAltitude = 0 //底部高程
  gwnbLayer.style3D = style3D
  gwnbLayer.refresh()
  gwbnLayer.style3D = style3D
  gwbnLayer.refresh()
}
</script>
<style scoped>
.comment-container {
  position: absolute;
  top: 64.5vh;
  left: 5px;
  height: 336px;
  width: 213px;
  background: #0a163cc9;
  color: #fff;
  font-family: 'Microsoft YaHei';
  box-shadow: 3px 3px 10px 0px #1c9678;
  border-radius: 6px;
  z-index: 1004;
}
@media screen and (max-width: 1900px) {
  .comment-container {
    top: 54.1vh;
  }
}
.main_box {
  position: relative;
  margin-top: 45px;
  margin-left: 20px;
}
.input_box input {
  color: black;
}
.ipt_box {
  transform: rotate(-90deg);
  position: absolute;
  top: 83px;
  right: -52px;
}
.ipt_box2 {
  display: block;
  text-align: center;
  transform: translateX(5px);
}
:deep(input[type='range']:focus) {
  background-color: transparent;
}
.input_box {
  position: absolute;
  top: 51px;
  left: 12px;
}
.reset {
  box-sizing: border-box;
  height: 23px;
  line-height: 23px;
  width: 42px;
  border: none;
  font-size: 12px;
  border-radius: 3px;
  color: #fff;
  background: #528cc9;
  cursor: pointer;
  text-align: center;
  float: right;
  margin-right: 20px;
}
.reset:hover {
  background: #5e9ada;
}
.label_box {
  font-size: 13px;
  background: #40a6e1;
  border-radius: 5px;
  height: 20px;
  line-height: 20px;
  width: 62px;
  text-align: center;
  position: absolute;
  bottom: 25px;
  right: 25px;
}
.label_box2 {
  font-size: 13px;
  margin-bottom: 12px;
}
</style>
