<template>
  <div
    class="comment-container"
    id="Div_YW"
    style="height: 650px; z-index: 10000"
    v-show="props.monior"
  >
    <div class="comment-title" id="ywtitle">
      <h4>监测设备</h4>
      <i class="comment-close" @click="closeMonior"></i>
    </div>
    <div id="show_yw_div" class="table_box">
      <table
        border="0"
        id="table_yw"
        cellspacing="0"
        cellpadding="3"
        class="table"
      >
        <thead>
          <tr class="table_thead_tr">
            <th class="table_th1">名称</th>
            <th class="table_th2">类型</th>
            <th class="table_th3">操作</th>
            <th class="table_th4">曲线</th>
          </tr>
        </thead>
        <tbody>
          <!-- 液位 -->
          <!-- <tr
            class="table_tr"
            v-for="item in liquidLevelMeter.data"
            :key="item.equipmentID"
          >
            <td class="table_td1">{{ item.equipmentName }}</td>
            <td class="table_td2">{{ item.equipmentType }}</td>
            <td class="table_td3">
              <a @click="changePosition(item, e)">定位</a>
            </td>
            <td class="table_td4"><a @click="lookDetail(item, e)">查看</a></td> -->
          <!-- </tr> -->
          <!-- 流量 -->
          <!-- <tr
            class="table_tr"
            v-for="item in flowMeter.data"
            :key="item.equipmentID"
          >
            <td class="table_td1">{{ item.equipmentName }}</td>
            <td class="table_td2">流量计</td>
            <td class="table_td3">
              <a @click="changePosition(item, e)">定位</a>
            </td>
            <td class="table_td4"><a @click="lookDetail(item, e)">查看</a></td>
          </tr> -->
          <!-- 水质 -->
          <!-- <tr
            class="table_tr"
            v-for="item in waterQualityMeter.data"
            :key="item.deviceID"
          >
            <td class="table_td1">{{ item.deviceName }}</td>
            <td class="table_td2">{{ item.deviceType }}</td>
            <td class="table_td3">
              <a @click="changePosition(item, e)">定位</a>
            </td>
            <td class="table_td4"><a @click="lookDetail(item, e)">查看</a></td>
          </tr> -->
          <!-- 雨量 -->
          <!-- <tr
            class="table_tr"
            v-for="item in rainfallMeter.data"
            :key="item.equipmentID"
          >
            <td class="table_td1">{{ item.equipmentName }}</td>
            <td class="table_td2">{{ item.equipmentType }}</td>
            <td class="table_td3">
              <a @click="changePosition(item, e)">定位</a>
            </td>
            <td class="table_td4"><a @click="lookDetail(item, e)">查看</a></td>
          </tr> -->
        </tbody>
      </table>
    </div>
    <div id="show_ywinfo_div" class="water_level">
      <WaterlevelTable :dataDetail_yw="dataDetail_yw"></WaterlevelTable>
      <!-- <iframe src="WaterlevelTable.html" style="height: 200px; border: none;"></iframe> -->
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, defineEmits, defineProps } from 'vue'
import {
  getLiquidLevelMeter,
  getFlowMeter,
  getWaterQualityMeter,
  getRainfallMeter,
  getLiquidLevelMeterDetail,
} from '@/api/api.js'
import WaterlevelTable from './WaterlevelTable.vue'
const props = defineProps({
  monior: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits(['closeMonior'])
const closeMonior = () => {
  emit('closeMonior', false)
}
let dataAll = reactive([])
//液位计
let dataDetail_yw = ref({})
let liquidLevelMeter = reactive({ data: [] })
// getLiquidLevelMeter().then((res)=>{

//   liquidLevelMeter.data = res.data.data
//   dataDetail_yw.value = res.data.data[0]
//     console.log(liquidLevelMeter,'liquidLevelMeter')
// })
//流量计
// let flowMeter = reactive({data:[]})
// getFlowMeter().then(res=>{

//     flowMeter.data=res.data.data
//   })
//水质仪
// let waterQualityMeter = reactive({data:[]})
// getWaterQualityMeter().then(res=>{

//     waterQualityMeter.data = res.data.data
// })
//雨量计
// let rainfallMeter = reactive({data:[]})
// getRainfallMeter().then(res=>{

//     rainfallMeter.data = res.data.data
// })
//获取液位详情
const changePosition = (item, e) => {
  if (item.equipmentType && item.equipmentType == '液位计') {
    dataDetail_yw.value = item
  }
  viewer.camera.flyTo({
    //将经度、纬度、高度的坐标转换为笛卡尔坐标
    destination: Cesium.Cartesian3.fromDegrees(
      parseFloat(item.lon) - 0.00497,
      parseFloat(item.lat) + 0.00117,
      171.071643
    ),
    pitchAdjustHeight: -90,
    duration: 8,
    orientation: {
      heading: Cesium.Math.toRadians(357.678885),
      pitch: -0.57229615865957967,
      roll: 3.2294167340296553e-12,
    },
    //orientation: {
    //    heading: Cesium.Math.toRadians(61.547814),
    //    pitch: -0.34229615865957967,
    //    roll: 3.2294167340296553e-12
    //}
  })
  viewer.entities.removeAll()
  viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(
      parseFloat(item.lon) - 0.00497,
      parseFloat(item.lat) + 0.00317,
      27
    ),
    //position: Cesium.Cartesian3.fromDegrees(parseFloat(data.data[0].SWX) + 0.00005, parseFloat(data.data[0].SWY) + 0.000028, 1.5),
    billboard: {
      image: '/images/icon-map-marker1.png',
      width: 30,
      height: 40,
    },
    name: item.equipmentName || item.deviceName,
    description: '新定位内容',
  })
}
const lookDetail = (item, e) => {
  let url
  if (item.equipmentType && item.equipmentType == '液位计') {
    url = `http://139.196.154.132:9020/SCYJ/pages/Dtable/SSSJ_Info_Page_gis.html?id=${item.equipmentID}`
  }
  if (item.flow) {
    url = `http://139.196.154.132:9020/SCYJ/pages/Dtable/SSSJ_LLJ_Page_gis.html?&id=${item.equipmentID}`
  }
  if (item.equipmentType && item.equipmentType == '雨量计') {
    url = `http://139.196.154.132:9020/SCYJ/pages/Dtable/SSSJ_YLJ_Page_gis.html?id=${item.equipmentID}`
  }
  if (item.deviceType && item.deviceType == '水质仪') {
    url = `http://139.196.154.132:9020/SCYJ/pages/Dtable/SSSJ_SZY_Page_gis.html?id=${item.deviceType}`
  }
  var diag = new Dialog()
  diag.Width = 970
  diag.Modal = false
  diag.Height = 620
  diag.Title = '详细信息'
  diag.URL = url
  diag.close()
  setTimeout(() => {
    diag.show()
  })
}
</script>
<style scoped>
.table_box {
  height: 425px;
  color: #80eeff;
  width: 298px;
  overflow-y: auto;
  overflow-x: hidden;
}
.table {
  margin-top: 2px;
  margin: 5px;
  font-size: 12px;
  width: 285px;
  border-right: 1px solid #80eeff;
  border-bottom: 1px solid #80eeff;
  color: white;
}
.table_thead_tr {
  height: 35px;
}
.table_th1 {
  width: 120px;
  text-align: center;
  border-left: 1px solid #80eeff;
  border-top: 1px solid #80eeff;
}
.table_th2 {
  width: 55px;
  text-align: center;
  border-left: 1px solid #80eeff;
  border-top: 1px solid #80eeff;
}
.table_th3 {
  width: 45px;
  text-align: center;
  border-left: 1px solid #80eeff;
  border-top: 1px solid #80eeff;
}
.table_th4 {
  width: 45px;
  text-align: center;
  border-left: 1px solid #80eeff;
  border-top: 1px solid #80eeff;
}
.table_tr {
  height: 30px;
}
.table_td1 {
  width: 140px;
  text-align: left;
  border-left: 1px solid #80eeff;
  border-top: 1px solid #80eeff;
}
.table_td2 {
  text-align: center;
  font-size: 12px;
  border-left: 1px solid #80eeff;
  border-top: 1px solid #80eeff;
  padding-right: 3px;
}
.table_td3 {
  text-align: center;
  font-size: 12px;
  border-left: 1px solid #80eeff;
  border-top: 1px solid #80eeff;
  padding-right: 3px;
}
.table_td4 {
  text-align: center;
  font-size: 12px;
  border-left: 1px solid #80eeff;
  border-top: 1px solid #80eeff;
  padding-right: 3px;
}
.table_tr td a {
  color: #e8e210;
}
.water_level {
  width: 288px;
  height: 200px;
  margin: 5px;
  overflow: hidden;
}
</style>
