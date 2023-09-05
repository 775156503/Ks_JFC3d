<template>
  <div class="comment-container" id="fly_div" v-show="props.fly">
    <div class="comment-title" id="flytitle">
      <h4>飞行预览</h4>
      <i class="comment-close" @click="closeFly"></i>
    </div>
    <div class="fly_box">
      <div class="sm-function-module-sub-section" style="margin: 0" v-stopdrag>
        <div class="sm-half-L">
          <label style="width: auto">
            <input
              type="radio"
              value="designatedRoute"
              v-model="state.routeType"
            />
            指定路线
          </label>
          <label style="width: auto">
            <input type="radio" value="customRoute" v-model="state.routeType" />
            自定义路线
          </label>
        </div>
      </div>
      <!-- 指定路线 -->
      <div v-show="state.routeType === 'designatedRoute'">
        <div class="sm-half-L">
          <label style="width: 31%">路线选择</label>
          <input
            type="text"
            class="sm-input"
            disabled
            style="width: 56%; position: relative; padding-right: 30px"
            v-model="fileSrc"
            placeholder="选择飞行线路文件"
          />
          <span
            class="iconfont iconwenjianjia fpfFile"
            @click="chooseFile"
          ></span>
          <input
            type="file"
            accept=".fpf"
            id="flyFile"
            style="display: none"
            ref="flyFile_dom"
          />
        </div>
      </div>
      <!-- 自定义路线 -->
      <div v-show="state.routeType === 'customRoute'">
        <div class="boxchild">
          <div class="sm-half-L">
            <label style="width: 35%">飞行速度</label>
            <input
              type="number"
              class="sm-input"
              style="width: 63%"
              v-model="state.routeSpeed"
            />
          </div>
        </div>
        <div class="sm-half-L" v-show="state.routeStops.length > 0">
          <label style="width: 35%">已添站点</label>
          <select
            class="sm-select"
            style="width: 63%"
            v-model="state.selectedAddedStopIndex"
          >
            <option
              :value="index"
              v-for="(stop, index) in state.routeStops"
              :key="index"
            >
              {{ stop.stopName }}
            </option>
          </select>
        </div>
        <div class="toolbtn_box">
          <button @click="addStop" class="toolbtn btn1">添加</button>
          <!-- <button @click="clearStop" class="tbtn tbtn-margin-left" type="button">
          删除
        </button>
        <button @click="restStops" class="tbtn tbtn-margin-left" type="button">
          重置
        </button> -->
          <button @click="saveStop" class="toolbtn btn1">保存</button>
          <button @click="downLoad" class="toolbtn">下载</button>
        </div>
      </div>
      <!-- 基础配置项 -->
      <div class="sm-half-L flex-between">
        <label style="width: auto">
          <input type="checkbox" v-model="state.showRoute" />
          显示路线
        </label>
        <label style="width: auto">
          <input type="checkbox" v-model="state.showStop" />
          显示站点
        </label>
      </div>
      <div class="sm-half-L flex-around">
        <div>
          <span
            class="iconfont iconbofang"
            style="font-size: 32px; color: var(--theme-bg-color)"
            @click="flyStart"
            :title="Resource.start"
          ></span>
        </div>
        <div>
          <span
            class="iconfont iconzanting"
            style="font-size: 32px; color: var(--theme-bg-color)"
            @click="flyPause"
            :title="Resource.pause"
          ></span>
        </div>
        <div>
          <span
            class="iconfont icontingzhi"
            style="font-size: 32px; color: var(--theme-bg-color)"
            @click="flyStop"
            :title="Resource.stop"
          ></span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import {
  ref,
  watch,
  onMounted,
  toRaw,
  reactive,
  defineProps,
  defineEmits,
} from 'vue'
import createFlyLine_xml from '../components/fly-route/fly-line-xml'
import { ElMessage } from 'element-plus'
import { ElNotification } from 'element-plus'
//控制显示隐藏
const props = defineProps({
  fly: Boolean,
})
const emit = defineEmits(['closeFly'])
const closeFly = () => {
  emit('closeFly', false)
}
onMounted(() => {
  fileChange()
})

//选择框数据--静态
// const flyValue = [
//   { name: '线路1', value: '/data/LX1.fpf' },
// ]
let routes = new Cesium.RouteCollection()
let flyManager = new Cesium.FlyManager({
  scene: scene,
  routes: routes,
})
// 选择离线文件--分割线
// 点击选择文件函数
let flyFile_dom = ref(null)
const fileSrc = ref('')
function chooseFile() {
  flyFile_dom.value.click()
}
//文件夹改变文件触发
let routeCollection //创建飞行路线集合对象类
let reader = new FileReader()
function fileChange() {
  flyFile_dom.value.addEventListener('change', (evt) => {
    flyManager.stop()
    let route = flyManager.currentRoute
    if (route) route.clear() //清除之前的
    routeCollection = new Cesium.RouteCollection(viewer.entities) //飞行路线底层默认第一条路线，所以重新new
    let file = evt.target.files[0]
    if (!file) return
    fileSrc.value = flyFile_dom.value.value
    reader.onload = function (e) {
      // 读取操作完成时出发
      let XMLContent = e.target.result
      routeCollection.fromXML(XMLContent)
    }
    reader.readAsBinaryString(file)
    readyPromise()
  })
}
// 异步飞行管理准备就绪函数
function readyPromise() {
  routeCollection.readyPromise.then(() => {
    flyManager.routes = routeCollection
    let route = flyManager.currentRoute
    route.isLineVisible = state.showRoute
    route.isStopVisible = state.showStop
    // updateCurrentStops()//更新当前路线站点
  })
}
function flyStart() {
  flyManager.readyPromise.then(() => {
    flyManager.play()
  })
}
function flyPause() {
  flyManager && flyManager.pause()
}
function flyStop() {
  flyManager && flyManager.stop()
}
// 轨迹回放--分割线
let state = reactive({
  routeType: 'designatedRoute', //指定路线还是自定义路线类型
  routeStops: [], //自定义当前路线的站点集合
  selectedAddedStopIndex: null, //自定义已加站点选中索引
  setStopName: 'Stop-1', //设置当前站点名称
  routeSpeed: 200, //飞行路线速度
  setStopSpeed: 0, // 设置当前站点速度
  customRouteNames: [], //保存自定义路线名称
  customRouteSelectedIndex: null, //自定义选中路线索引
  showRoute: false, //显示路线
  showStop: false, //显示站点
  waitTime: 0, //停留时间
  surroundDuration: 1, //环绕模式时间
  stopPlayMode: 'StopPause', //设置站点模式:默认停留
})
watch(
  () => state.showRoute,
  (val) => {
    let route = flyManager.currentRoute
    if (route) route.isLineVisible = val
    console.log(state.showRoute)
  }
)
watch(
  () => state.showStop,
  (val) => {
    let route = flyManager.currentRoute
    if (route) route.isStopVisible = val
    // console.log('页面实体', viewer.entities.values)
  }
)
watch(
  () => state.routeType,
  (val) => {
    if (val === 'customRoute') {
      ElNotification({
        title: '调整当前相机位置和视角',
        dangerouslyUseHTMLString: true, //以HTML 字符串来作为正文内容
        message: '<p>以当前相机位置和视角设置站点</p><p>点击添加保存此站点</p>',
        position: 'top-left',
        offset: 300,
      })
    }
  }
)
//笛卡尔转经纬度(每个点是独立的对象)
const CartesiantoDegrees = (Cartesians) => {
  let array = [].concat(Cartesians)
  let positions = []
  for (let i = 0, len = array.length; i < len; i++) {
    let cartographic = Cesium.Cartographic.fromCartesian(array[i])
    let longitude = Cesium.Math.toDegrees(cartographic.longitude)
    let latitude = Cesium.Math.toDegrees(cartographic.latitude)
    let h = cartographic.height
    if (
      positions.indexOf(longitude) == -1 &&
      positions.indexOf(latitude) == -1
    ) {
      positions.push(longitude)
      positions.push(latitude)
      positions.push(h)
    }
  }
  return positions
}
// 添加站点
const addStop = () => {
  flyManager.stop()
  let point = viewer.camera.position
  let position = CartesiantoDegrees(point)
  let stop = {
    stopName: state.setStopName,
    point: position,
    heading: viewer.camera.heading,
    tilt: viewer.camera.pitch,
    speed: state.setStopSpeed,
    stopPlayMode: 'StopPause',
    surroundDuration: 1,
    waitTime: 0,
  }
  state.routeStops.push(stop)
  if (state.routeStops.length > 0) {
    let len = state.routeStops.length
    let lastStopName = state.routeStops[len - 1].stopName
    let index = lastStopName.split('-')[1] || 1
    let name = 'Stop-' + (Number(index) + 1)
    state.setStopName = name
  }
  state.selectedAddedStopIndex = state.routeStops.length - 1
}
// 清除站点
const clearStop = () => {
  state.routeStops.splice(state.selectedAddedStopIndex, 1)
  if (state.routeStops.length > 0) {
    state.selectedAddedStopIndex = state.routeStops.length - 1
    return
  }
  state.selectedAddedStopIndex = null
  state.setStopName = 'Stop-1'
}
// 重置站点
const restStops = () => {
  state.routeStops.length = 0
  state.setStopName = 'Stop-1'
  state.setStopSpeed = 0
  state.stopPlayMode = 'StopPause'
  state.waitTime = 0
  state.surroundDuration = 1
}
let createXml = new createFlyLine_xml()
let flyLineXmls = [] //创建和保存xml飞行路线文件
// 保存站点
const saveStop = () => {
  if (state.routeStops.length < 2) {
    console.log('节点小于2')
    return
  }
  // 飞行路线配置
  let index = flyLineXmls.length + 1
  let route = {
    routeName: '飞行路线_' + index,
    speed: state.routeSpeed,
    isAlongLine: 'False',
    routeStops: state.routeStops,
  }
  let xml = createXml.createXMLflyLine(route)
  flyLineXmls.push(xml)
  state.customRouteNames.push(route.routeName)
  // restStops();
  if (state.customRouteSelectedIndex === null)
    state.customRouteSelectedIndex = 0
  console.log('flyLineXmls', flyLineXmls)
}
// 浏览器下载站点
const downLoad = () => {
  let data = flyLineXmls[state.customRouteSelectedIndex]
  if (!data) {
    ElMessage({
      message: '请先保存站点',
      type: 'warning',
    })
    return
  }
  let blob = new Blob([data]) //将返回的数据包装成blob（方法的具体使用参考mdn）
  let alink = document.createElement('a')
  alink.download = 'fly-route.fpf' //文件名,大部分浏览器兼容,IE10及以下不兼容
  alink.href = URL.createObjectURL(blob) //根据blob 创建 url
  alink.click() //自动点击
}
</script>
<style scoped>
.toolbtn_box {
  display: flex;
  justify-content: center;
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
  margin-top: 0px;
}
.btn1 {
  margin-right: 47px;
}
:deep(.slogen) {
  padding: 0 20px;
  line-height: 18px;
  text-align: justify;
  margin: 5px 0 0 0;
  /*color: cornflowerblue;*/
  font-size: 13px;
  margin-top: 15px;
}
:deep(.fly_select) {
  width: 160px;
  height: 28px;
  margin-top: 18px;
  margin-left: 40px;
}
/* 飞行盒子 */
.fly_box {
  padding: 15px 20px 0 20px;
}
.sm-half-L {
  margin-bottom: 10px;
}
.boxchild {
  padding: 0;
}
.sm-half,
.sm-half-L,
.sm-half-M,
.sm-half-S {
  padding: 0;
}
</style>
