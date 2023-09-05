<template>
  <div class="comment-container" id="measure-container" v-show="props.measure">
    <div class="comment-title" id="meatitle">
      <h4>量测</h4>
      <i class="comment-close" @click="closeMeasure"></i>
    </div>
    <div class="comment-body">
      <p style="color: cornflowerblue; height: 5px">&nbsp</p>
      <div class="measure">
        <div class="measureItem distance" @click="MeasureDistance">
          <i class="distance"></i>
          <span>空间距离测量</span>
        </div>
        <div class="measureItem area" @click="MeasureArea">
          <i class="area"></i>
          <span>空间面积测量</span>
        </div>
        <div class="measureItem" @click="MeasureTriangle">
          <i class="triangle"></i>
          <span>三角测量</span>
        </div>
        <!-- <div class="measureItem " id="MeasureCoordinate">
                    <i class="coordinate"></i><span>坐标测量</span>
                </div>-->
      </div>
      <div
        style="
          float: right;
          margin-top: -138px;
          margin-right: 5px;
          width: 165px;
          height: 138px;
          font-size: 12px;
        "
      >
        <p style="margin-left: -10px">&nbsp</p>
        <p id="showdistance" style="font-size: 12px; margin-top: -13px"></p>
      </div>
      <button class="comment-btn" @click="cleanMeasure">清除测量</button>
    </div>
  </div>
</template>
<script setup>
//import {ref, defineProps,defineEmits} from 'vue'
let resu
const props = defineProps({
  measure: Boolean,
})
const emit = defineEmits(['closeMeasure'])
const closeMeasure = () => {
  emit('closeMeasure', false)
}
//测量
//创建描述位置的对话框
const createDescription = (Cesium, properties) => {
  var simpleStyleIdentifiers = ['空间距离', '垂直高度', '水平距离']
  if (properties.length == 1) {
    simpleStyleIdentifiers = ['结果数据']
  }
  //var html = '';
  document.getElementById('showdistance').innerHTML = ''
  if (properties.length == 1) {
    for (let i = 0; i < properties.length; i++) {
      if (properties.hasOwnProperty(i)) {
        if (simpleStyleIdentifiers.indexOf(i) !== -1) {
          continue
        }
        var value = properties[i]

        if (Cesium.defined(value) && value !== '') {
          document.getElementById('showdistance').innerHTML +=
            '' + simpleStyleIdentifiers[i] + ':<br/>' + value + '<br/>'
        }
      }
    }
  } else if (properties.length != 1) {
    for (let i = 0; i < properties.length; i++) {
      if (properties.hasOwnProperty(i)) {
        if (simpleStyleIdentifiers.indexOf(i) !== -1) {
          continue
        }
        var value = properties[i]

        if (Cesium.defined(value) && value !== '') {
          document.getElementById('showdistance').innerHTML +=
            '' + simpleStyleIdentifiers[i] + ':' + value + '<br/><br/>'
        }
      }
    }
  }
}
//初始化测量距离
const handlerDis = new Cesium.MeasureHandler(
  viewer,
  Cesium.MeasureMode.Distance,
  0
)
//注册测距功能事件
handlerDis.measureEvt.addEventListener(function (result) {
  console.log(result, 'result')
  resu = result
  var distance =
    result.distance > 1000
      ? (result.distance / 1000).toFixed(4) + 'km'
      : result.distance + 'm'
  handlerDis.disLabel.text = '距离:' + distance
  handlerDis.disLabel.outlineColor = new Cesium.Color(0, 0, 1)
  handlerDis.disLabel.font = '100 20px sans-serif'
  handlerDis.disLabel.outlineWidth = 1
  var entity = new Cesium.Entity({
    name: '测量距离',
    description: createDescription(Cesium, [distance]),
  })
  viewer.selectedEntity = entity
})
handlerDis.activeEvt.addEventListener(function (isActive) {
  if (isActive == true) {
    viewer.enableCursorStyle = false
    viewer._element.style.cursor = ''
    document.querySelector('body').classList.remove('measureCur')
    document.querySelector('body').classList.add('measureCur')
    //$('body').removeClass('measureCur').addClass('measureCur');
  } else {
    viewer.enableCursorStyle = true
    document.querySelector('body').classList.remove('measureCur')
    // document.querySelector('body').classList.add('measureCur')
    //$('body').removeClass('measureCur');
  }
})
//初始化测量面积
const handlerArea = new Cesium.MeasureHandler(
  viewer,
  Cesium.MeasureMode.Area,
  0
)
handlerArea.measureEvt.addEventListener(function (result) {
  resu = result
  var area =
    result.area > 1000000
      ? (result.area / 1000000).toFixed(6) + 'km²'
      : result.area + '㎡'
  handlerArea.areaLabel.text = '面积:' + area
  handlerArea.areaLabel.outlineColor = new Cesium.Color(0, 0, 1)
  handlerArea.areaLabel.font = '100 20px sans-serif'
  handlerArea.areaLabel.outlineWidth = 1.0
  //创建弹出框信息
  var entity = new Cesium.Entity({
    name: '测量面积',
    description: createDescription(Cesium, [area]),
  })
  viewer.selectedEntity = entity
})
handlerArea.activeEvt.addEventListener(function (isActive) {
  if (isActive == true) {
    viewer.enableCursorStyle = false
    viewer._element.style.cursor = ''
    document.querySelector('body').classList.remove('measureCur')
    document.querySelector('body').classList.add('measureCur')
    //$('body').removeClass('measureCur').addClass('measureCur');
  } else {
    viewer.enableCursorStyle = true
    document.querySelector('body').classList.remove('measureCur')
    //$('body').removeClass('measureCur');
  }
})
//初始化测量高度
const handlerHeight = new Cesium.MeasureHandler(viewer, Cesium.MeasureMode.DVH)
handlerHeight.measureEvt.addEventListener(function (result) {
  resu = result
  console.log(result.distance, 'distance')
  var distance =
    result.distance > 1000
      ? (result.distance / 1000).toFixed(2) + 'km'
      : Number(result.distance).toFixed(4) + 'm'
  var vHeight =
    result.verticalHeight > 1000
      ? (result.verticalHeight / 1000).toFixed(2) + 'km'
      : Number(result.verticalHeight).toFixed(4) + 'm'
  var hDistance =
    result.horizontalDistance > 1000
      ? (result.horizontalDistance / 1000).toFixed(2) + 'km'
      : Number(result.horizontalDistance).toFixed(4) + 'm'
  handlerHeight.disLabel.text = '空间距离:' + distance
  handlerHeight.disLabel.outlineColor = new Cesium.Color(0, 0, 1)
  handlerHeight.disLabel.font = '20px 宋体'
  handlerHeight.disLabel.outlineWidth = 1.0
  handlerHeight.vLabel.text = '垂直高度:' + vHeight
  handlerHeight.vLabel.outlineColor = new Cesium.Color(0, 0, 1)
  handlerHeight.vLabel.font = '20px 宋体'
  handlerHeight.vLabel.outlineWidth = 1.0
  handlerHeight.hLabel.text = '水平距离:' + hDistance
  handlerHeight.hLabel.outlineColor = new Cesium.Color(0, 0, 1)
  handlerHeight.hLabel.font = '20px 宋体'
  handlerHeight.hLabel.outlineWidth = 1.0
  handlerHeight.hLabel
  var entity = new Cesium.Entity({
    name: '测量高度',
    description: createDescription(Cesium, [distance, vHeight, hDistance]),
  })
  viewer.selectedEntity = entity
})
handlerHeight.activeEvt.addEventListener(function (isActive) {
  if (isActive == true) {
    viewer.enableCursorStyle = false
    viewer._element.style.cursor = ''
    //document.querySelector('body').classList.remove('drawCur')
    document.querySelector('body').classList.remove('measureCur')
    document.querySelector('body').classList.add('measureCur')
    // $('body').removeClass('measureCur').addClass('measureCur');
  } else {
    viewer.enableCursorStyle = true
    document.querySelector('body').classList.remove('measureCur')
    //$('body').removeClass('measureCur');
  }
})

const deactiveAll = () => {
  handlerDis && handlerDis.deactivate()
  handlerArea && handlerArea.deactivate()
  handlerHeight && handlerHeight.deactivate()
  // handlerPolygon && handlerPolygon.deactivate();
}
//点击选择测量
const MeasureDistance = () => {
  deactiveAll()
  handlerDis && handlerDis.activate()
}
const MeasureArea = () => {
  deactiveAll()
  handlerArea && handlerArea.activate()
}
const MeasureTriangle = () => {
  deactiveAll()
  handlerHeight && handlerHeight.activate()
}
//清除测量
const clearAll = () => {
  handlerDis && handlerDis.clear()
  handlerArea && handlerArea.clear()
  handlerHeight && handlerHeight.clear()
  //handlerPolygon && handlerPolygon.clear();
}
const cleanMeasure = () => {
  clearAll()
  document.getElementById('showdistance').innerHTML = ''
}
</script>
<style>
.comment-btn {
  float: right;
  margin-right: 7px;
}
</style>
