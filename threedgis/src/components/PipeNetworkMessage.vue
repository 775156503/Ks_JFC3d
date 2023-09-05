<template>
  <div class="comment-container pipe_box" id="Div_info" v-show="showPipe">
    <div class="comment-title" id="c_info">
      <h4>管网信息</h4>
      <i class="comment-close" @click="closeTable"></i>
    </div>
    <div
      id="show_gwxx_div"
      style="
        height: 278px;
        color: #80eeff;
        width: 298px;
        overflow-y: auto;
        overflow-x: hidden;
      "
    >
      <table
        border="0"
        id="table2"
        cellspacing="0"
        cellpadding="3"
        style="
          margin-top: 2px;
          margin: 5px;
          font-size: 12px;
          width: 290px;
          border-right: 1px solid #80eeff;
          border-bottom: 1px solid #80eeff;
          color: white;
        "
        class="table"
      >
        <thead>
          <tr style="height: 35px">
            <th
              style="
                width: 70px;
                text-align: center;
                border-left: 1px solid #80eeff;
                border-top: 1px solid #80eeff;
              "
            >
              名称
            </th>
            <th
              style="
                width: 70px;
                text-align: center;
                border-left: 1px solid #80eeff;
                border-top: 1px solid #80eeff;
              "
            >
              值
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            style="height: 30px"
            v-for="(key, value) in dataFeature"
            :key="key"
          >
            <td
              style="
                width: 70px;
                text-align: center;
                border-left: 1px solid #80eeff;
                border-top: 1px solid #80eeff;
              "
            >
              {{ value }}
            </td>
            <td
              style="
                text-align: left;
                font-size: 12px;
                border-left: 1px solid #80eeff;
                border-top: 1px solid #80eeff;
                padding-right: 3px;
              "
              id="td_YSGW_SZ"
            >
              {{ key }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script setup>
//编-NEWFIELD_2  管径-NEWFIELD_3 材质-NEWFIELD_4
import { ref, watch, reactive, onMounted } from 'vue'
let dataFeature = ref({})
let showPipe = ref(false)
watch(dataFeature.value, (n, o) => {
  n ? (showPipe.value = true) : (showPipe.value = false)
})
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
var colorFlag2 = true
let setTime2
Cesium.when(promise6, function (layer) {
  layer.setQueryParameter({
    url: 'http://153.101.160.58:8090/iserver/services/data-SCGW/rest/data',
    dataSourceName: '1',
    dataSetName: 'GWBN',
    keyWord: 'SmID',
  })
  setHypsometric(layer)
  layer.selectColorType = 1.0
  //  点击外轮廓线高亮闪烁
  layer.selectColorType = Cesium.SelectColorType.SILHOUETTE_EDGE
  layer.selectedLineColor = Cesium.Color.AQUA
  function colorSpark() {
    if (colorFlag2) {
      layer.selectedLineColor = Cesium.Color.AQUA
      colorFlag2 = false
    } else {
      layer.selectedLineColor = Cesium.Color.FORESTGREEN
      colorFlag2 = true
    }
    if (showPipe.value == false) {
      clearInterval(setTime2)
    }
  }
  viewer.pickEvent.addEventListener(function (feature) {
    setTime2 = setInterval(() => {
      colorSpark()
    }, 1000)
    // for (let attr in feature) {
    //   attr == 'NEWFIELD_2' ? (dataFeature.value['编号'] = feature[attr]) : ''
    //   attr == 'NEWFIELD_3' ? (dataFeature.value['管径'] = feature[attr]) : ''
    //   attr == 'NEWFIELD_4' ? (dataFeature.value['材质'] = feature[attr]) : ''
    // }
  })
})

Cesium.when(promise8, function (layer) {
  layer.setQueryParameter({
    url: 'http://153.101.160.58:8090/iserver/services/data-SCGW/rest/data',
    dataSourceName: '1',
    dataSetName: 'JS',
    keyWord: 'SmID',
  })
  layer.selectColorType = 1.0
  layer.selectedColor = Cesium.Color.WHITE
  layer.selectColorType = Cesium.SelectColorType.SILHOUETTE_EDGE
  layer.selectedLineColor = Cesium.Color.AQUA
  viewer.pickEvent.addEventListener(function (feature) {
    console.log('所在图层', feature.模型名称)
    if (feature.模型名称.indexOf('井') != -1) {
      viewer.scene.scanEffect.centerPostion = po.value
    }

    for (let attr in feature) {
      attr == 'NEWFIELD_2' ? (dataFeature.value['编号'] = feature[attr]) : ''
      attr == 'NEWFIELD_3' ? (dataFeature.value['管径'] = feature[attr]) : ''
      attr == 'NEWFIELD_4' ? (dataFeature.value['材质'] = feature[attr]) : ''
    }
  })
})
var colorFlag = true
let setTime
Cesium.when(promise7, function (layer) {
  setHypsometric_(layer)
  layer.setQueryParameter({
    url: 'http://153.101.160.58:8090/iserver/services/data-SCGW/rest/data',
    dataSourceName: '1',
    dataSetName: 'GWNB',
    keyWord: 'SmID',
  })
  layer.selectColorType = 1.0
  //  点击外轮廓线高亮闪烁
  layer.selectColorType = Cesium.SelectColorType.SILHOUETTE_EDGE
  layer.selectedLineColor = Cesium.Color.AQUA
  function colorSpark() {
    if (colorFlag) {
      layer.selectedLineColor = Cesium.Color.AQUA
      colorFlag = false
    } else {
      layer.selectedLineColor = Cesium.Color.FORESTGREEN
      colorFlag = true
    }
    if (showPipe.value == false) {
      clearInterval(setTime)
    }
  }
  viewer.pickEvent.addEventListener(function (feature) {
    setTime = setInterval(() => {
      colorSpark()
    }, 1000)
    // for (let attr in feature) {
    //   attr == 'NEWFIELD_2' ? (dataFeature.value['编号'] = feature[attr]) : ''
    //   attr == 'NEWFIELD_3' ? (dataFeature.value['管径'] = feature[attr]) : ''
    //   attr == 'NEWFIELD_4' ? (dataFeature.value['材质'] = feature[attr]) : ''
    // }
  })
})

const closeTable = () => {
  showPipe.value = false
  clear() //清除环状扫描线
}
// 环状扫描线测试
let circleScanTextures = [
  {
    name: '环状纹理1',
    type: 'ring',
    url: '../../public/images/radar/ring-1.jpg',
  },
]
let state = reactive({
  scanMode: 'lineMode',
  scanColor: '#0F7AF4',
  scanTextures: circleScanTextures,
  selectedTextureIndex: 0,
  bloomShow: false, //开启反光
  openHDR: false, //开启HDR
  threshold: 0.01, //亮度阈值
  intensity: 0.5, //泛光强度
  lineWidth: 1, //获取或设置线状扫描线的宽度，单位：米。
  period: 3.0, //获取或设置扫描线的运行周期，单位：秒。
  speed: 1.5, //获取或设置扫描线的运行速度，单位：米/秒。//period*speed=半径
  addTextures: [
    {
      name: '环状纹理1',
      type: 'ring',
      url: '../../public/images/radar/ring-1.jpg',
    },
  ], //[{name:纹理1,type:'line / ring',url:xxx}]
  scanShow: true,
})

let handler
const po = ref(null)
onMounted(() => {
  initCircle()
  handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas)
  handler.setInputAction(function (movement) {
    // viewer.scene.scanEffect.centerPostion = Cesium.Cartesian3.fromDegrees(
    //   longitude,
    //   latitude,
    //   height
    // )
    po.value = viewer.scene.pickPosition(movement.position)
    viewer.scene.scanEffect.centerPostion = new Cesium.Cartesian3.fromDegrees(
      0,
      0,
      0
    )
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
})

const initCircle = () => {
  viewer.scene.pickTranslucentDepth = true //避免选择半透明的实体
  scene.scanEffect.show = true //开启场景扫描
  viewer.scene.scanEffect.mode = Cesium.ScanEffectMode.CIRCLE
  viewer.scene.scanEffect.color = Cesium.Color.fromCssColorString(
    state.scanColor
  )
  viewer.scene.scanEffect.textureUrl = state.scanTextures[0].url
  viewer.scene.scanEffect.lineWidth = Number(state.lineWidth)
  viewer.scene.scanEffect.period = Number(state.period)
  viewer.scene.scanEffect.speed = Number(state.speed)
  viewer.scene.scanEffect.centerPostion = new Cesium.Cartesian3.fromDegrees(
    0,
    0,
    0
  )
}
function addCircleScans(cartesian, e) {
  //viewer.enableCursorStyle = true //鼠标绘制时十字光标

  viewer.scene.scanEffect.centerPostion = viewer.scene.pickPosition(e)
  state.scanShow = true
}
function clear() {
  state.scanShow = false
  let index = viewer.scene.scanEffect.count
  for (let i = 1; i < index; i++) {
    viewer.scene.scanEffect.remove(i)
  }

  viewer.scene.scanEffect.centerPostion = new Cesium.Cartesian3.fromDegrees(
    0,
    0,
    0
  )
  handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK) //移除事件
}
</script>
<style>
.pipe_box {
  top: auto;
  background: #0a163cc9;
  color: #fff;
  font-family: 'Microsoft YaHei';
  box-shadow: 3px 3px 10px 0px #1c9678;
  border-radius: 6px;
  position: absolute;
  bottom: 10px;
  left: 5px;
  height: 315px;
  width: 300px;
  z-index: 10000;
}
</style>
