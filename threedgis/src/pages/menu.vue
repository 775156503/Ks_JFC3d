<template>
  <div>
    <div class="gncd" id="gncd_div" @click="showgncd" ref="bg_img"></div>
  </div>
  <div id="gn_div" v-show="openMenue">
    <div class="menu_list">
      <div class="popular_func">常用功能</div>
      <div style="width: 294px; min-height: 80px" id="tabs_cygn">
        <div class="img_div" id="fullpage" @click="changeScreen">
          <div class="checked_img" v-show="fullScreen">
            <img
              src="/images/input-checked.png"
              style="height: 14px; width: 14px"
            />
          </div>
          <div class="img_td">
            <img src="/images/全屏.png" width="60" height="54" />
          </div>
          <div class="theme_item_name">全屏</div>
        </div>

        <div class="img_div" @click="openMeasure">
          <div class="checked_img" v-show="measure">
            <img
              src="/images/input-checked.png"
              style="height: 14px; width: 14px"
            />
          </div>
          <div class="img_td">
            <img src="/images/量测.png" width="60" height="54" />
          </div>
          <div class="theme_item_name">量测</div>
        </div>
        <div class="img_div" @click="openFly">
          <div class="checked_img" v-show="fly">
            <img
              src="/images/input-checked.png"
              style="height: 14px; width: 14px"
            />
          </div>
          <div class="img_td">
            <img src="/images/飞行.png" width="60" height="54" />
          </div>
          <div class="theme_item_name">飞行</div>
        </div>

        <div class="img_div" id="div_bmms" @click="whiteModel">
          <div class="checked_img" v-show="white">
            <img
              src="/images/input-checked.png"
              style="height: 14px; width: 14px"
            />
          </div>
          <div class="img_td">
            <img src="/images/液位.png" width="60" height="54" />
          </div>
          <div class="theme_item_name">白模模式</div>
        </div>
        <div class="img_div" id="div_bmms" @click="drainHousehold">
          <div class="checked_img" v-show="Household">
            <img
              src="/images/input-checked.png"
              style="height: 14px; width: 14px"
            />
          </div>
          <div class="img_td">
            <img src="/images/液位.png" width="60" height="54" />
          </div>
          <div class="theme_item_name">排水户</div>
        </div>
        <div
          style="
            height: 25px;
            border-bottom: 2px solid #72ed5c;
            font-weight: 600;
            font-size: 15px;
            float: left;
            width: 280px;
          "
        >
          视角定位
        </div>
        <div class="img_div" id="back-position3" @click="positionChina">
          <div class="checked_img" v-show="fixedPosition == '全国'">
            <img
              src="/images/input-checked.png"
              style="height: 14px; width: 14px"
            />
          </div>
          <div class="img_td">
            <img src="/images/定位.png" width="60" height="54" />
          </div>
          <div class="theme_item_name">全国</div>
        </div>
        <div class="img_div" id="back-position2" @click="positionCounty">
          <div class="checked_img" v-show="fixedPosition == '遂昌县'">
            <img
              src="/images/input-checked.png"
              style="height: 14px; width: 14px"
            />
          </div>
          <div class="img_td">
            <img src="/images/定位.png" width="60" height="54" />
          </div>
          <div class="theme_item_name">遂昌县</div>
        </div>
        <div class="img_div" id="back-position" @click="positionSkyCity">
          <div class="checked_img" v-show="fixedPosition == '天工之城'">
            <img
              src="/images/input-checked.png"
              style="height: 14px; width: 14px"
            />
          </div>
          <div class="img_td">
            <img src="/images/定位.png" width="60" height="54" />
          </div>
          <div class="theme_item_name">天工之城</div>
        </div>
        <div class="img_div" id="back-position1" @click="positionVillage">
          <div class="checked_img" v-show="fixedPosition == '集镇'">
            <img
              src="/images/input-checked.png"
              style="height: 14px; width: 14px"
            />
          </div>
          <div class="img_td">
            <img src="/images/定位.png" width="60" height="54" />
          </div>
          <div class="theme_item_name">集镇</div>
        </div>
        <div
          style="
            height: 25px;
            border-bottom: 2px solid #72ed5c;
            font-weight: 600;
            font-size: 15px;
            float: left;
            width: 280px;
          "
        >
          三维分析
        </div>

        <div class="img_div" id="SunAnalysis" @click="sunAnalysis">
          <div class="checked_img" v-show="sunshine">
            <img
              src="/images/input-checked.png"
              style="height: 14px; width: 14px"
            />
          </div>
          <div class="img_td">
            <img src="/images/日照分析.png" width="60" height="54" />
          </div>
          <div class="theme_item_name">日照分析</div>
        </div>
        <div class="img_div" id="YMAnalysis" @click="floodAnalysis">
          <div class="checked_img" v-show="flood">
            <img
              src="/images/input-checked.png"
              style="height: 14px; width: 14px"
            />
          </div>
          <div class="img_td">
            <img src="/images/淹没分析.png" width="60" height="54" />
          </div>
          <div class="theme_item_name">模型淹没</div>
        </div>
        <div class="img_div" id="YMAnalysis" @click="floodAnalysis2">
          <div class="checked_img" v-show="flood2">
            <img
              src="/images/input-checked.png"
              style="height: 14px; width: 14px"
            />
          </div>
          <div class="img_td">
            <img src="/images/淹没分析.png" width="60" height="54" />
          </div>
          <div class="theme_item_name">框选淹没</div>
        </div>
        <div class="img_div" id="KWAnalysis" @click="digAnalysis">
          <div class="checked_img" v-show="dig">
            <img
              src="/images/input-checked.png"
              style="height: 14px; width: 14px"
            />
          </div>
          <div class="img_td">
            <img src="/images/开挖分析.png" width="60" height="54" />
          </div>
          <div class="theme_item_name">开挖分析</div>
        </div>
        <div class="img_div" id="div_tmd" @click="opacityChange">
          <div class="checked_img" v-show="opacity">
            <img
              src="/images/input-checked.png"
              style="height: 14px; width: 14px"
            />
          </div>
          <div class="img_td">
            <img src="/images/透明度.png" width="60" height="54" />
          </div>
          <div class="theme_item_name">透明度</div>
        </div>
        <div class="img_div" id="div_tmd" @click="opacityChange2">
          <div class="checked_img" v-show="opacity2">
            <img
              src="/images/input-checked.png"
              style="height: 14px; width: 14px"
            />
          </div>
          <div class="img_td">
            <img src="/images/透明度.png" width="60" height="54" />
          </div>
          <div class="theme_item_name">地下管线</div>
        </div>
        <div class="img_div" id="div_Rollershutter" @click="closeScroll">
          <div class="checked_img" v-show="scroll_Map">
            <img
              src="/images/input-checked.png"
              style="height: 14px; width: 14px"
            />
          </div>
          <div class="img_td">
            <img src="/images/管网卷帘.png" width="60" height="54" />
          </div>
          <div class="theme_item_name">管网卷帘</div>
        </div>
        <div class="img_div" id="div_yw" @click="moniorEquipment">
          <div class="checked_img" v-show="monior">
            <img
              src="/images/input-checked.png"
              style="height: 14px; width: 14px"
            />
          </div>
          <div class="img_td">
            <img src="/images/液位.png" width="60" height="54" />
          </div>
          <div class="theme_item_name">监测设备</div>
        </div>
      </div>
    </div>
  </div>
  <Measure :measure="measure" @closeMeasure="closeMeasure" />
  <Fly :fly="fly" @closeFly="closeFly"></Fly>
  <FixedPosition :fixedPosition="fixedPosition"></FixedPosition>
  <SunshineAnalysis
    :sunshine="sunshine"
    @closeSunshine="closeSunshine"
  ></SunshineAnalysis>
  <!-- 模型淹没 -->
  <FloodAnalysis :flood="flood" @closeFlood="closeFlood"></FloodAnalysis>
  <!-- 框选淹没 -->
  <FloodAnalysis2 :flood2="flood2" @closeFlood2="closeFlood2"></FloodAnalysis2>
  <DigAnalysis :dig="dig" @closeDig="closeDig"></DigAnalysis>
  <!-- 透明度变化 -->
  <OpacityChange
    :opacity="opacity"
    @closeOpacity="closeOpacity"
  ></OpacityChange>
  <!-- 水管抬升 -->
  <PipelineLift
    :opacity2="opacity2"
    @closeOpacity2="closeOpacity2"
  ></PipelineLift>
  <!-- 管网卷帘 -->
  <ScrollMap :scroll_Map="scroll_Map"></ScrollMap>
  <MoniorEquipment
    :monior="monior"
    @closeMonior="closeMonior"
  ></MoniorEquipment>
  <!-- 监测设备 -->
  <PipeNetworkMessage></PipeNetworkMessage>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import Measure from '../components/Measure.vue'
import Fly from '../components/Fly.vue'
import FixedPosition from '../components/FixedPosition.vue'
import SunshineAnalysis from '../components/SunshineAnalysis.vue'
import FloodAnalysis from '../components/FloodAnalysis.vue'
import FloodAnalysis2 from '../components/FloodAnalysis2.vue'
import DigAnalysis from '../components/DigAnalysis.vue'
import OpacityChange from '../components/OpacityChange.vue'
import PipelineLift from '../components/PipelineLift.vue'
import ScrollMap from '../components/ScrollMap.vue'
import MoniorEquipment from '../components/MoniorEquipment.vue'
import PipeNetworkMessage from '../components/PipeNetworkMessage.vue'

const bg_img = ref(null)
//功能菜单
let flag = false
let fullScreen = false
let measure = ref(false)
let openMenue = ref(false)
let fly = ref(false)
let fly2 = ref(false)
let white = ref(false)
let Household = ref(false)
let sunshine = ref(false)
let flood = ref(false)
let flood2 = ref(false)
let dig = ref(false)
let opacity = ref(false)
let opacity2 = ref(false)
let scroll_Map = ref(false)
let monior = ref(false)
let element = document.documentElement
onMounted(() => {
  viewer.camera.flyTo({
    //将经度、纬度、高度的坐标转换为笛卡尔坐标
    destination: Cesium.Cartesian3.fromDegrees(119.005604, 28.579147, 215),
    orientation: {
      heading: Cesium.Math.toRadians(357.678885),
      pitch: -0.34229615865957967,
      roll: 3.2294167340296553e-12,
    },
  })
})
const showgncd = () => {
  if (!flag) {
    bg_img.value.style.background =
      'url(images/dsj_.png) 0px 0px / 100% 100% no-repeat'
  } else {
    openMenue.value = true
    bg_img.value.style.background =
      'url(images/gncd.png) 0px 0px / 100% 100% no-repeat'
  }
  flag = !flag
  openMenue.value = !openMenue.value
}
//切换功能菜单图片
//是否全屏
const changeScreen = () => {
  if (fullScreen) {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen()
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen()
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen()
    }
  } else {
    if (element.requestFullscreen) {
      element.requestFullscreen()
    } else if (element.webkitRequestFullScreen) {
      element.webkitRequestFullScreen()
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen()
    } else if (element.msRequestFullscreen) {
      // IE11
      element.msRequestFullscreen()
    }
  }
  fullScreen = !fullScreen
}
//测量
const openMeasure = () => {
  measure.value = !measure.value
  if (measure.value) {
    fly.value = false
    sunshine.value = false
    flood.value = false
    flood2.value = false
    dig.value = false
    opacity.value = false
    opacity2.value = false
    scroll_Map.value = false
    monior.value = false
  }
}
//关闭测量
const closeMeasure = (msg) => {
  measure.value = msg
}
//飞行
const openFly = () => {
  fly.value = !fly.value
  if (fly.value) {
    measure.value = false
    sunshine.value = false
    flood.value = false
    flood2.value = false
    dig.value = false
    opacity.value = false
    opacity2.value = false
    scroll_Map.value = false
    monior.value = false
  }
}
const closeFly = (msg) => {
  fly.value = msg
  viewer.entities.removeAll()
  // console.log('删除后页面实体', viewer.entities.values)
}

//白模型
const whiteModel = () => {
  white.value = !white.value
  let layer = scene.layers.find('BM')

  if (!white.value) {
    layer.visible = false
    scene.layers.find('SM').visible = true
    globe.globeAlpha = 1 //设置地表透明度
    scene.layers.find('config').style3D.fillForeColor.alpha = 1
    viewer.scene.hdrEnabled = false
    //viewer.scene.scanEffect.show = true;
    scene.layers.find('DD').visible = true
  } else {
    layer.visible = true
    scene.layers.find('SM').visible = false
    globe.globeAlpha = 0 //设置地表透明度
    scene.layers.find('config').style3D.fillForeColor.alpha = 0
    viewer.scene.hdrEnabled = true
    viewer.scene.scanEffect.show = false
    scene.layers.find('DD').visible = false
  }
}
// 排水户气泡标签
const drainHousehold = () => {
  Household.value = !Household.value
  if (Household.value) {
    fly.value = false
    measure.value = false
    sunshine.value = false
    flood.value = false
    flood2.value = false
    dig.value = false
    opacity.value = false
    opacity2.value = false
    scroll_Map.value = false
    monior.value = false
  }
}
//定位
let fixedPosition = ref('集镇')
const positionChina = () => {
  fixedPosition.value = '全国'
}
const positionCounty = () => {
  fixedPosition.value = '遂昌县'
}
const positionSkyCity = () => {
  fixedPosition.value = '天工之城'
}
const positionVillage = () => {
  fixedPosition.value = '集镇'
}
//日照分析
const sunAnalysis = () => {
  sunshine.value = !sunshine.value
  if (sunshine.value) {
    fly.value = false
    measure.value = false
    flood.value = false
    flood2.value = false
    dig.value = false
    opacity.value = false
    opacity2.value = false
    scroll_Map.value = false
    monior.value = false
  }
}
const closeSunshine = (msg) => {
  sunshine.value = msg
}
//模型淹没
const floodAnalysis = () => {
  flood.value = !flood.value
  if (flood.value) {
    fly.value = false
    measure.value = false
    sunshine.value = false
    dig.value = false
    flood2.value = false
    opacity.value = false
    opacity2.value = false
    scroll_Map.value = false
    monior.value = false
  }
}
//框选淹没
const floodAnalysis2 = () => {
  flood2.value = !flood2.value
  if (flood.value) {
    flood.value = false
    fly.value = false
    measure.value = false
    sunshine.value = false
    dig.value = false
    opacity.value = false
    opacity2.value = false
    scroll_Map.value = false
    monior.value = false
  }
}
const closeFlood = (msg) => {
  flood.value = msg
}
const closeFlood2 = (msg) => {
  flood2.value = msg
}
//开挖分析
const digAnalysis = () => {
  dig.value = !dig.value
  if (dig.value) {
    fly.value = false
    measure.value = false
    sunshine.value = false
    flood.value = false
    flood2.value = false
    opacity.value = false
    opacity2.value = false
    scroll_Map.value = false
    monior.value = false
  }
}
const closeDig = (msg) => {
  dig.value = msg
}
//透明度
const opacityChange = () => {
  opacity.value = !opacity.value
  if (opacity.value) {
    fly.value = false
    measure.value = false
    sunshine.value = false
    flood.value = false
    flood2.value = false
    opacity2.value = false
    dig.value = false
    scroll_Map.value = false
    monior.value = false
  }

  // 开启地下相机模式
  // viewer.scene.undergroundMode = true
  // scene.globe.globeAlpha = 0.5
  // let handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas)
  // handler.setInputAction(function (event) {
  //   let ray = viewer.camera.getPickRay(event.position)
  //   let cartesian = viewer.scene.globe.pick(ray, viewer.scene)
  //   let cartographic = Cesium.Cartographic.fromCartesian(cartesian)
  //   let lng = Cesium.Math.toDegrees(cartographic.longitude) // 经度
  //   let lat = Cesium.Math.toDegrees(cartographic.latitude) // 纬度
  //   let alt = cartographic.height // 高度
  //   let coordinate = {
  //     longitude: Number(lng.toFixed(6)),
  //     latitude: Number(lat.toFixed(6)),
  //     altitude: Number(alt.toFixed(2)),
  //   }
  //   console.log('相机经纬度', coordinate)
  // }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
  // viewer.scene.screenSpaceCameraController.enableCollisionDetection = false
  // viewer.camera.position = new Cesium.Cartesian3.fromDegrees(
  //   119.005803,
  //   28.582532,
  //   -50
  // )
  // console.log('开启地下相机模式')
}
const opacityChange2 = () => {
  opacity2.value = !opacity2.value
  if (opacity2.value) {
    fly.value = false
    measure.value = false
    sunshine.value = false
    opacity.value = false
    flood.value = false
    flood2.value = false
    opacity.value = false
    dig.value = false
    scroll_Map.value = false
    monior.value = false
  }
}
const closeOpacity = (msg) => {
  opacity.value = msg
}
const closeOpacity2 = (msg) => {
  opacity2.value = msg
}
//管网卷帘
const closeScroll = () => {
  scroll_Map.value = !scroll_Map.value
  if (scroll_Map.value) {
    fly.value = false
    measure.value = false
    sunshine.value = false
    flood.value = false
    flood2.value = false
    opacity.value = false
    opacity2.value = false
    dig.value = false
    monior.value = false
  }
}
//监测设备
const moniorEquipment = () => {
  monior.value = !monior.value
  if (monior.value) {
    fly.value = false
    measure.value = false
    sunshine.value = false
    flood.value = false
    flood2.value = false
    opacity.value = false
    opacity2.value = false
    scroll_Map.value = false
    dig.value = false
  }
}
const closeMonior = (msg) => {
  monior.value = msg
}
</script>
<style scoped>
::-webkit-scrollbar {
  width: 5px; /*滚动条宽度*/
}
::-webkit-scrollbar-thumb {
  border-radius: 10px; /*滚动条的圆角*/
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #ccc; /*滚动条的背景颜色*/
}
.gncd {
  position: absolute;
  float: right;
  height: 38px;
  width: 130px;
  cursor: pointer;
  background: white;
  font-size: 14px;
  text-align: end;
  line-height: 34px;
  padding-right: 10px;
  background: url(../images/gncd.png) 0px 0px / 100% 100% no-repeat;
  right: 10px;
  top: 10px;
  z-index: 1001;
}
.dsj {
  position: absolute;
  float: right;
  height: 38px;
  width: 130px;
  cursor: pointer;
  background: white;
  font-size: 14px;
  text-align: end;
  line-height: 34px;
  padding-right: 10px;
  background: url(../images/dsj_.png) 0px 0px / 100% 100% no-repeat;
  right: 150px;
  top: 10px;
  z-index: 1001;
  display: none;
}
#gn_div {
  width: 296px;
  float: right;
  top: 53px;
  right: 20px;
  padding: 5px;
  position: absolute;
  z-index: 100009;
  background: url(../images/k.png) 0px 0px / 100% 100% no-repeat;
}
.menu_list {
  width: 280px;
  padding: 6px;
  z-index: 9;
  background-color: #0a163cc9;
  border: 2px solid #80eeff;
  color: #80eeff;
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 510px;
}
.popular_func {
  height: 25px;
  border-bottom: 2px solid #72ed5c;
  font-weight: 600;
  font-size: 15px;
  float: left;
  width: 280px;
}
.theme_item_name {
  font-size: 13px;
  height: 20px;
  font-weight: 300;
  margin-top: 3px;
  text-align: center;
  margin-left: -5px;
}
.img_div {
  width: 60px;
  margin-top: 6px;
  margin-right: 10px;
  float: left;
  cursor: pointer;
  position: relative;
}

.img_td {
  position: relative;
  height: 56px;
  width: 62px;
  border: 1px solid #80eeff;
  /* border-radius: 3px; */
  cursor: pointer;
}
.checked_img {
  position: absolute;
  width: 64px;
  height: 16px;
  background: #07f75d;
  bottom: 24px;
  opacity: 0.85;
  text-align: center;
  display: block;
}
</style>
