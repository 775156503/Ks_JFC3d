var layer
const viewer = new Cesium.Viewer('cesiumContainer', {
  //反走样
  contextOptions: {
    msaaLevel: 8, //硬件反走样，1-8，默认值为1
    requestWebgl2: true,
  },
  terrainProvider: new Cesium.CesiumTerrainProvider({
    url: 'http://www.supermapol.com/realspace/services/3D-dixingyingxiang/rest/realspace/datas/DatasetDEM',
  }),
})
viewer.scene.globe.depthTestAgainstTerrain = true
viewer.shadows = true
viewer.shadows = true
viewer.imageryLayers.addImageryProvider(
  new Cesium.TiandituImageryProvider({
    credit: new Cesium.Credit(
      '天地图全球影像服务     数据来源：国家地理信息公共服务平台 & 四川省测绘地理信息局'
    ),
    token: 'c394a58375d41a64c8757a73dec74989',
  })
)

viewer.cesiumWidget.creditContainer.style.display = 'none'
const scene = viewer.scene
const widget = viewer.cesiumWidget
const globe = viewer.scene.globe
scene.skyAtmosphere.show = true
scene.skyBox.show = true
var promise3 = scene.addS3MTilesLayerByScp(
  'http://58.210.32.10:8090/iserver/services/3D-XZQH/rest/realspace/datas/CH/config',
  {
    name: 'CH',
  }
)
var promise4 = scene.addS3MTilesLayerByScp(
  'http://153.101.160.58:8090/iserver/services/3D-SCXZ/rest/realspace/datas/%E9%81%82%E6%98%8C%E5%8E%BF_1_1%401/config',
  {
    name: 'KS',
  }
)
// 集镇模型
var promise = scene.addS3MTilesLayerByScp(
  'http://153.101.160.58:8090/iserver/services/3D-SCDM/rest/realspace/datas/Combine/config',
  {
    name: 'config',
  }
)

var promise9 = scene.addS3MTilesLayerByScp(
  'http://153.101.160.58:8090/iserver/services/3D-SCSM/rest/realspace/datas/SM/config',
  {
    name: 'SM',
  }
)
var promise88 = scene.addS3MTilesLayerByScp(
  'http://153.101.160.58:8090/iserver/services/3D-SCGW_0607/rest/realspace/datas/Combine/config',
  {
    name: 'DD',
    lodRangeScale: 1,
  }
)
// 水管--正向
var promise7 = scene.addS3MTilesLayerByScp(
  'http://153.101.160.58:8090/iserver/services/3D-SCGW/rest/realspace/datas/GWNB/config',
  {
    name: 'GWNB',
    lodRangeScale: 1,
  }
)
// 水管--负向
var promise6 = scene.addS3MTilesLayerByScp(
  'http://153.101.160.58:8090/iserver/services/3D-SCGW/rest/realspace/datas/GWBN/config',
  {
    name: 'GWBN',
    lodRangeScale: 1,
  }
)
// 井室
var promise8 = scene.addS3MTilesLayerByScp(
  'http://153.101.160.58:8090/iserver/services/3D-SCGW/rest/realspace/datas/JS/config',
  {
    name: 'js',
    lodRangeScale: 1,
  }
)
// 集镇白膜模型
var promise81 = scene.addS3MTilesLayerByScp(
  'http://153.101.160.58:8090/iserver/services/3D-BM/rest/realspace/datas/BM/config',
  {
    name: 'BM',
    lodRangeScale: 1,
  }
)
function doSqlQuery(feature) {
  var hml_ = feature.NEWFIELD_2
  var layer = 'SCGW'

  var getFeatureParam, getFeatureBySQLService, getFeatureBySQLParams
  getFeatureParam = new SuperMap.REST.FilterParameter({
    attributeFilter: "NEWFIELD_2 ='" + hml_ + "'",
  })
  getFeatureBySQLParams = new SuperMap.REST.GetFeaturesBySQLParameters({
    queryParameter: getFeatureParam,
    toIndex: -1,
    datasetNames: ['1:' + layer],
  })
  var url = 'http://153.101.160.58:8090/iserver/services/data-SCGW/rest/data'
  getFeatureBySQLService = new SuperMap.REST.GetFeaturesBySQLService(url, {
    eventListeners: {
      processCompleted: onQueryComplete,
      processFailed: processFailed,
    },
  })
  getFeatureBySQLService.processAsync(getFeatureBySQLParams)
}
//设置自发光纹理--负向管线
function setHypsometric_(layer) {
  var hyp1 = new Cesium.HypsometricSetting()
  hyp1.emissionTextureArray = [
    {
      url: 'images/lx.jpg',
      USpeed: -0.2,
      VSpeed: 0,
      UTiling: 10,
      VTiling: 3,
    },
  ]
  layer.hypsometricSetting = {
    hypsometricSetting: hyp1,
  }
}
//设置自发光纹理--正向管线
function setHypsometric(layer) {
  var hyp1 = new Cesium.HypsometricSetting()
  hyp1.emissionTextureArray = [
    {
      url: 'images/lx1.jpg',
      USpeed: 0.2,
      VSpeed: 0,
      UTiling: 10,
      VTiling: 3,
    },
  ]
  layer.hypsometricSetting = {
    hypsometricSetting: hyp1,
  }
}
// 白膜变色
function setHypsometric2(layer, hyp) {
  //创建分层设色对象
  var colorTable = new Cesium.ColorTable()
  //设置最大/最小可见高度， 颜色表
  colorTable.insert(0, new Cesium.Color(0, 39 / 255, 148 / 255))
  colorTable.insert(150, new Cesium.Color(149 / 255, 232 / 255, 249 / 255))
  hyp.ColorTable = colorTable
  hyp.Opacity = 0.6 //蓝色的透明度(设置为0则显示白膜纯白色)
  hyp.LineInterval = 10.0 //线宽
  layer.hypsometricSetting = {
    hypsometricSetting: hyp,
    analysisMode: Cesium.HypsometricSettingEnum.AnalysisRegionMode.ARM_ALL, //显示模式
  }
}
Cesium.when(promise81, function (layer) {
  layer.visible = false
  let hyp = new Cesium.HypsometricSetting()
  let layerBM = scene.layers.find('BM')
  layerBM.style3D.fillStyle = Cesium.FillStyle.Fill_And_WireFrame
  layerBM.wireFrameMode = Cesium.WireFrameType.EffectOutline
  layerBM.style3D.lineColor = Cesium.Color.fromCssColorString('rgb(67,67,67)')
  layerBM.style3D.lineWidth = 0.5
  layerBM.style3D.fillForeColor.alpha = 0.8 //白膜本身的透明度
  setHypsometric2(layerBM, hyp)
})
// Cesium.when(promise7, function (layer) {
//     setHypsometric_(layer);
//     layer.setQueryParameter({
//         url: 'http://153.101.160.58:8090/iserver/services/data-SCGW/rest/data',
//         dataSourceName: '1',
//         dataSetName: 'GWNB',
//         keyWord: 'SmID'
//     });
//     layer.selectColorType = 1.0;
//     layer.selectedColor = Cesium.Color.WHITE;
//     viewer.pickEvent.addEventListener(function (feature) {
//         console.log(feature);
//         doSqlQuery(feature);
//     });
// });
// Cesium.when(promise8, function (layer) {
//     layer.setQueryParameter({
//         url: 'http://153.101.160.58:8090/iserver/services/data-SCGW/rest/data',
//         dataSourceName: '1',
//         dataSetName: 'JS',
//         keyWord: 'SmID'
//     });
//     layer.selectColorType = 1.0;
//     layer.selectedColor = Cesium.Color.WHITE;
//     viewer.pickEvent.addEventListener(function (feature) {
//         console.log(feature);
//         doSqlQuery(feature);
//     });
// });
// Cesium.when(promise, function (layer) {
//     layer.computeHeight = true;
// });
const obj = {
  tag: 'div',
  children: [{ tag: 'span', children: 'hello' }],
}
// function Reader(obj,root){
//     const el = document.createElement(obj.tag)
//     if(typeof obj.children === 'string'){
//         const text = document.createTextNode(obj.children)
//         el.appendChild(text)
//     }else {
//         obj.children.forEach((child)=>Reader(child,el))
//     }
//     root.appendChild(el)
// }
function Reader(obj, root) {
  const el = document.createElement(obj.tag)
  if (typeof el.children === 'string') {
    const text = document.createTextNode(el.children)
    el.appendChild(text)
  } else {
    obj.children.forEach((child) => Reader(child, el))
  }
  root.appendChild(el)
}
