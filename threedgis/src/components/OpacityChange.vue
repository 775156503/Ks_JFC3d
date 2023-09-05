<template>
  <div class="comment-container" id="toolbar" v-show="props.opacity">
    <div class="comment-title" id="titlemove">
      <h4>透明度预览</h4>
      <i class="comment-close" @click="closeOpacity"></i>
    </div>
    <div class="main_box">
      <label style="font-size: 13px">透明度：</label>
      <input
        id="tmdslide"
        type="range"
        style="cursor: pointer"
        min="0"
        max="1"
        step="0.02"
        title="调整地表透明度"
        data-bind="value: globeAlpha, valueUpdate: 'input'"
      />
      <div class="input_box">
        <label style="font-size: 13px">结果值(可输入)：</label>
        <input type="text" size="5" data-bind="value: globeAlpha" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted } from 'vue'
const props = defineProps({
  opacity: Boolean,
})

const emit = defineEmits(['closeOpacity'])
const closeOpacity = () => {
  emit('closeOpacity', false)
}
//监听滑动条变化，改变alpha的值，设置地表透明度
onMounted(() => {
  var sliderblock = document.getElementById('tmdslide')
  RangeSlider({ min: 0, max: 1, step: 0.02, callback: change }, sliderblock)
  //监听滑动条变化，改变alpha的值，设置地表透明度
  var viewModel = {
    globeAlpha: 1.0,
  }
  Cesium.knockout.track(viewModel)
  var toolbar = document.getElementById('toolbar')
  Cesium.knockout.applyBindings(viewModel, toolbar)
  Cesium.knockout
    .getObservable(viewModel, 'globeAlpha')
    .subscribe(function (newValue) {
      globe.globeAlpha = parseFloat(newValue) //设置地表透明度
      scene.layers.find('config').style3D.fillForeColor.alpha =
        parseFloat(newValue)
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
    console.log('透明度', this.value)
    var a = this.value * 100
    uu.style.backgroundSize = a + '% 100%'
    var value = this.value
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
</script>
<style scoped>
:deep(input[type='range']:focus) {
  background-color: transparent;
}
.main_box {
  position: relative;
  margin-top: 45px;
  margin-left: 20px;
}
.input_box {
  position: relative;
  margin-left: 10px;
  margin-bottom: 90px;
  top: 20px;
}
</style>
