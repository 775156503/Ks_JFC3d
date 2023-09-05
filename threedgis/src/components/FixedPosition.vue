<template>


</template>
<script setup>
import  { watch} from 'vue'
const props = defineProps({
        fixedPosition:String
    })
  watch(
            props,
            (old, newProps) => {
                console.log('=======', newProps.fixedPosition); //这里看到新值

            if(newProps.fixedPosition == '全国'){
                //全国
              viewer.camera.flyTo({
                //将经度、纬度、高度的坐标转换为笛卡尔坐标
                destination: Cesium.Cartesian3.fromDegrees(104.87297, 30.920457, 23907304.927698),
                orientation: {
                    heading: Cesium.Math.toRadians(350.555984),
                    pitch: -1.57229615865957967,
                    roll: 3.2294167340296553e-12
                }
                    });
            }
            if(newProps.fixedPosition == '遂昌县'){
              //遂昌县
              viewer.camera.flyTo({
                  //将经度、纬度、高度的坐标转换为笛卡尔坐标
                  destination: Cesium.Cartesian3.fromDegrees(119.075223, 28.440434, 168000),
                  orientation: {
                      heading: Cesium.Math.toRadians(359.457043),
                      pitch: -1.57229615865957967,
                      roll: 3.2294167340296553e-12
                  }
                      });
            }

            //天工之城
            if(newProps.fixedPosition == '天工之城'){
               viewer.camera.flyTo({
                //将经度、纬度、高度的坐标转换为笛卡尔坐标
                destination: Cesium.Cartesian3.fromDegrees(118.991389, 28.519397, 1900),
                orientation: {
                    heading: Cesium.Math.toRadians(357.678885),
                    pitch: -0.34229615865957967,
                    roll: 3.2294167340296553e-12
                }
            });
            }

            //集镇
            if(newProps.fixedPosition == '集镇'){
                          viewer.camera.flyTo({
                            //将经度、纬度、高度的坐标转换为笛卡尔坐标
                            destination: Cesium.Cartesian3.fromDegrees(119.005604, 28.579147, 215),
                            orientation: {
                                heading: Cesium.Math.toRadians(357.678885),
                                pitch: -0.34229615865957967,
                                roll: 3.2294167340296553e-12
                            }
                           });  
            }

            },
            // {   
            //     immediate: true,
            //     deep: true
            // }
      )
</script>
<style>
</style>
