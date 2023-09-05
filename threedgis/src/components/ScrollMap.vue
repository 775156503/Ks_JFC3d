<template>

</template>
<script setup>
  import {onMounted,watch} from 'vue'

const props = defineProps({
        scroll_Map:Boolean
    })
let layer_list
let isfi = true
let rollerShutterConfig
let windowHeight

watch(props,(n,o)=>{

      console.log(n.scroll_Map)
      if(n.scroll_Map){

            layer_list = [];
            layer_list.push(scene.layers.find("config"));
            console.log(rollerShutterConfig,'开始数据')
            initRollerShutter(layer_list, rollerShutterConfig);           
            globe.globeAlpha = 0.02;
            var horizontalSlider = document.getElementById('horizontal-slider');
            horizontalSlider.style.display = 'block';

            rollerShutterConfig.splitDirection = Cesium.SplitDirection.BOTTOM;
           // $(this).addClass("active");
           // deactiveAll();
        setRollerShutterSplit(layer_list, rollerShutterConfig);
    }else{
        
        globe.globeAlpha = 1.0;
        var horizontalSlider = document.getElementById('horizontal-slider');
        horizontalSlider.style.display = 'none';
        rollerShutterConfig.splitDirection = Cesium.SplitDirection.NONE;
         setRollerShutterSplit(layer_list, rollerShutterConfig);
  }
})

function initRollerShutter(layer, rollerShutterConfig) {
    setRollerShutterSplit(layer, rollerShutterConfig);
    bindSliderEvt(layer, rollerShutterConfig);

}

function setRollerShutterSplit(layer, rollerShutterConfig) {
    var splitPosition = null;
    splitPosition = rollerShutterConfig.horizontalSplitPosition   
    for (var laye in layer) {
        console.log()
        layer[laye].splitDirection = rollerShutterConfig.splitDirection  
           
        if (splitPosition != null) { 
          // 在没有禁用卷帘的情况下有必要设卷帘分割位置
            layer[laye].splitPosition = splitPosition;
            console.log(layer[laye],'layer[laye]')
        }
    }
}
 function bindSliderEvt(layer, rollerShutterConfig) {
    var verticalSlider = document.getElementById('vertical-slider');
    var horizontalSlider = document.getElementById('horizontal-slider');
    verticalSlider.addEventListener('mousedown', mouseDown, false);
    horizontalSlider.addEventListener('mousedown', mouseDown, false);
//    var windowWidth = $("#cesiumContainer").width();
//     windowHeight = $("#cesiumContainer").height();
     var windowWidth = window.getComputedStyle(document.querySelector("#cesiumContainer")).width.split("p")[0]
         windowHeight = window.getComputedStyle(document.querySelector("#cesiumContainer")).height.split("p")[0]
         console.log(windowHeight,'windowHeight@@')
    document.addEventListener('mouseup', mouseUp, false);
    function mouseUp(e) {
        document.removeEventListener('mousemove', sliderMove, false);
    }
    function mouseDown(e) {
        document.addEventListener('mousemove', sliderMove, false);
    }
    function sliderMove(e) { // 鼠标拖拽时执行
        //解决拖拽鼠标粘滞的bug
        if (e.preventDefault) {
            e.preventDefault();
        } else {
            e.returnValue = false;
        }
        var clientY = e.clientY;
        if (clientY < 0) {
            clientY = 0;
        } else if (clientY > windowHeight) {
            //clientY = windowHeight - $('#horizontal-slider').height();
            clientY = windowHeight - document.querySelector('#horizontal-slider').style.height;
        }
        //horizontalSlider.style.top = clientY + 'px';
        //rollerShutterConfig.horizontalSplitPosition = windowHeight - clientY;
        horizontalSlider.style.top = e.clientY + 'px';
        rollerShutterConfig.horizontalSplitPosition = windowHeight - e.clientY;

        setRollerShutterSplit(layer, rollerShutterConfig);
    }
}
function reSet(){
    document.querySelector("#cesiumContainer").addEventListener('resize',()=>{
    windowHeight = window.getComputedStyle(document.querySelector("#cesiumContainer")).height.split("p")[0]
     var horizontalSlider = document.getElementById('horizontal-slider');
     var jlheight = parseInt(horizontalSlider.style.top);
     if (!isNaN(jlheight)) {
         rollerShutterConfig.horizontalSplitPosition = windowHeight - jlheight;
         initRollerShutter(layer_list, rollerShutterConfig);
     }
     else if (isNaN(jlheight)) {
          windowHeight = window.getComputedStyle(document.querySelector("#cesiumContainer")).height.split("p")[0]
         rollerShutterConfig.horizontalSplitPosition = windowHeight * 0.3;
         initRollerShutter(layer_list, rollerShutterConfig);
     }
    })
//     $("#cesiumContainer").resize(function () {
//       windowHeight = $("#cesiumContainer").height();
//      var horizontalSlider = document.getElementById('horizontal-slider');
//      var jlheight = parseInt(horizontalSlider.style.top);
//      if (!isNaN(jlheight)) {
//          rollerShutterConfig.horizontalSplitPosition = windowHeight - jlheight;
//          initRollerShutter(layer_list, rollerShutterConfig);
//      }
//      else if (isNaN(jlheight)) {
//           //windowHeight = $("#cesiumContainer").height();
//           windowHeight = document.querySelector("#cesiumContainer").style.height
//          rollerShutterConfig.horizontalSplitPosition = windowHeight * 0.3;
//          initRollerShutter(layer_list, rollerShutterConfig);
//      }
//  });
}
onMounted(()=>{
    //windowHeight = $("#cesiumContainer").height();
    windowHeight = window.getComputedStyle(document.querySelector("#cesiumContainer")).height.split("p")[0]
    //console.log(windowHeight,'windowHeight')
   rollerShutterConfig = { 
          // 卷帘配置参数，以对象方式实现地址传递
           splitDirection: Cesium.SplitDirection.NONE,
           //verticalSplitPosition: windowWidth / 2,
           horizontalSplitPosition: windowHeight*0.3
       };
      reSet()
})

</script>
<style>

</style>