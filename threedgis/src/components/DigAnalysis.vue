<template>
  <div class="comment-container" id="Div_KW" v-show="props.dig">
    <div class="comment-title" id="kwtitle">
      <h4>开挖分析</h4>
      <i class="comment-close" @click="closeDig"></i>
    </div>
    <div class="setingBar">
      <div class="form-group" style="height: 30px; top: 20px">
        <input
          id="depth"
          v-model="depth"
          required="required"
          class="form-control"
          style="width: 80px"
        />
        <label class="form-label form_left">开挖深度 ：</label>
        <label class="form-label form_right">(m)</label>
      </div>
      <div class="form-group" style="height: 30px; top: 20px">
        <input
          id="depth2"
          v-model="depth2"
          required="required"
          class="form-control"
          style="width: 80px"
        />
        <label class="form-label form_left">上移高度 ：</label>
        <label class="form-label form_right">(m)</label>
      </div>
      <div class="form-group" style="height: 30px; top: 20px">
        <input
          id="label_kwmj"
          v-model="label_kwmj"
          required="required"
          class="form-control"
          readonly
          style="width: 80px; color: white"
        />
        <label class="form-label form_left">开挖面积 ：</label>
        <label class="form-label form_right">(m²)</label>
      </div>
      <div class="form-group" style="height: 30px; top: 20px">
        <input
          id="label_kwtf"
          v-model="label_kwtf"
          required="required"
          class="form-control"
          readonly
          style="width: 80px; color: white"
        />
        <label class="form-label form_left">开挖土方 ：</label>
        <label class="form-label form_right">(m³)</label>
      </div>
    </div>
    <div id="btnContainer">
      <button type="button" @click="startDig" class="toolbtn btn1">开挖</button>
      <button
        type="button"
        id="KW_clear"
        @click="clearDig"
        class="toolbtn btn2"
      >
        清除
      </button>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, watch } from 'vue'
const props = defineProps({
  dig: Boolean,
  default: false,
})
const emit = defineEmits(['closeDig'])
const closeDig = () => {
  emit('closeDig', false)
}
const tooltip = createTooltip(viewer._element)
const handlerPolygon = new Cesium.DrawHandler(
  viewer,
  Cesium.DrawMode.Polygon,
  0
)
let depth = ref(10)
let depth2 = ref(20)
let label_kwmj = ref()
let label_kwtf = ref()
watch(props, (n, o) => {
  console.log(n.dig)
  if (n.dig) {
    tooltip.setVisible(true)
    handlerPolygon.activate()
  }
  if (!n.dig) {
    // handlerPolygon.polygon.show = false;
    // handlerPolygon.polyline.show = false;
    handlerPolygon.deactivate()
    tooltip.setVisible(false)
    console.log('状态')
    clearDig()
  }
})
onMounted(() => {
  handlerPolygon.activeEvt.addEventListener(function (isActive) {
    if (isActive == true) {
      viewer.enableCursorStyle = false
      viewer._element.style.cursor = ''
      //setAttribute("class", "类名")
      //removeAttribute("class", "类名")
      // classList.remove("active")
      document.querySelector('body').classList.remove('drawCur')
      document.querySelector('body').classList.add('drawCur')
      //$('body').removeClass('drawCur').addClass('drawCur');
    } else {
      viewer.enableCursorStyle = true
      document.querySelector('body').classList.remove('drawCur')
      //$('body').removeClass('drawCur');
    }
  })
  handlerPolygon.movingEvt.addEventListener(function (windowPosition) {
    if (windowPosition.x < 200 && windowPosition.y < 150) {
      tooltip.setVisible(false)
      return
    }
    if (handlerPolygon.isDrawing) {
      tooltip.showAt(
        windowPosition,
        '<p>点击确定开挖区域中间点</p><p>右键单击结束绘制,进行开挖</p>'
      )
    } else {
      tooltip.showAt(windowPosition, '<p>点击绘制开挖区域第一个点</p>')
    }
  })
  handlerPolygon.drawEvt.addEventListener(function (result) {
    if (!result.object.positions) {
      tooltip.showAt(result, '<p>请绘制正确的多边形</p>')
      handlerPolygon.polygon.show = false
      handlerPolygon.polyline.show = false
      handlerPolygon.deactivate()
      handlerPolygon.activate()
      return
    }
    var array = [].concat(result.object.positions)
    tooltip.setVisible(false)
    var positions = []
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
    var dep = parseInt(depth.value)
    var dep2 = parseInt(depth2.value)
    // 挖取后地面下的体积
    // viewer.scene.globe.removeAllExcavationRegion()
    // viewer.scene.globe.addExcavationRegion({
    //   name: 'SubsurfaceVolume',
    //   position: positions,
    //   height: dep,
    //   transparent: false,
    // })
    viewer.scene.globe.removeAllExtractRegion()
    viewer.scene.globe.addExtractRegion({
      name: 'extract', //名称
      position: positions, //区域
      height: dep, //开挖深度
      transparent: false, //封边是否透明
      extractHeight: dep2, //抽出高度
      granularity: 1, //精度
    })
    var kwmj = calcClampValue(result.object.positions)
    label_kwtf.value = (kwmj * dep).toFixed(2)
    label_kwmj.value = kwmj.toFixed(2)
    scene.layers.find('config').shadowType = 0
    var overGroundLayer = scene.layers.find('config')
    // overGroundLayer.removeAllExtractRegion()
    // overGroundLayer.addExtractRegion({
    //   //设置倾斜开挖参数
    //   position: positions,
    //   name: 'Extract_' + Math.random(),
    // })
    handlerPolygon.polygon.show = false
    handlerPolygon.polyline.show = false
    handlerPolygon.deactivate()
  })
})
const startDig = () => {
  handlerPolygon.activate()
}
const clearDig = () => {
  viewer.scene.globe.removeAllExtractRegion()
  //var overGroundLayer = scene.layers.find("YH0");
  //overGroundLayer.removeAllExcavationRegion();
  // tooltip.setVisible(false);
  handlerPolygon.deactivate()
  handlerPolygon.clear()
  // scene.layers.find('config').removeAllExtractRegion()
  if (handlerPolygon.polygon) {
    handlerPolygon.polygon.show = false
  }
  if (handlerPolygon.polyline) {
    handlerPolygon.polyline.show = false
  }
  label_kwtf.value = ''
  label_kwmj.value = ''
}
//椭球贴地面积
function calcClampValue(positions) {
  var lonlat = []
  var value = 0
  for (var i = 0; i < positions.length; i++) {
    var cartographic = Cesium.Cartographic.fromCartesian(positions[i])
    var lon = Cesium.Math.toDegrees(cartographic.longitude)

    var lat = Cesium.Math.toDegrees(cartographic.latitude)
    lonlat.push(lon, lat)
  }

  var gemetry = new Cesium.PolygonGeometry.fromPositions({
    positions: Cesium.Cartesian3.fromDegreesArray(lonlat),
  })

  //var selOptV = $("#selOpt").val();
  //if (selOptV == 3) {
  value = scene.globe.computeSurfaceArea(gemetry, Cesium.Ellipsoid.CGCS2000)

  //} else if (selOptV == 4) {
  //    value = scene.globe.computeSurfaceArea(gemetry, Cesium.Ellipsoid.XIAN80);
  //}
  return value
}
</script>
<style>
.form_left {
  left: 20px;
}
.form_right {
  margin-left: 195px;
}
.comment-container {
  height: 265px;
}

.comment-container .setingBar {
  width: 150px;
  height: 150px;
  border-radius: 4px;
  margin-left: 35px;
}
/* 开挖按钮 */
#btnContainer {
  display: flex;
  justify-content: center;
}
.toolbtn {
  box-sizing: border-box;
  border: none;
  font-size: 12px;
  border-radius: 3px;
  color: #fff;
  background: #528cc9;
  cursor: pointer;
  width: 92px;
  height: 30px;
  margin-top: 31px;
}
.btn1 {
  margin-right: 35px;
}
.btn2 {
  margin-right: 13px;
}
.toolbtn:hover {
  background: #5e9ada;
}
.toolbtn:focus {
  color: #fff;
}
</style>
