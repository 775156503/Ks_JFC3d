<template>
<!-- <sm3d-shadow-query v-show="props.sunshine"></sm3d-shadow-query> -->
    <div class="comment-container hidden"  ref="timeGet" style="display: block; z-index: -999;" >
        <div class="comment-title" id="timetitle">
            <h4>日照分析</h4>
            <i class="comment-close" @click="closeSunshine"></i>
        </div>
        <p class="slogen">日照效果预览：</p>
        <div class="setingBar" style="margin-left: 35px;">
            <div class="autoSun" id="autoSun" @click="autoSun" ref="_autoSun"></div>
            <label class="speed_label"  id="stapau">{{stapau}}</label>
            <div style="width: 84px; height: 38px; border-radius: 5px; background: rgba(76,158,151,1); position: relative; left: 80px; bottom: 61px;">
                <div class="jiansu_div" @click="jiansu_click" @mouseenter="jiansu_enter" @mouseleave="jiansu_leave">
                    <img class="jiansu_img" :src="Jiansu_img"/>
                    <label class="speed_label" >减速</label>
                </div>
                <div class="jiasu_div"  @click="jiasu_click" @mouseenter="jiasu_enter" @mouseleave="jiasu_leave">
                    <img class="jiasu_img" :src="Jiasu_img" />
                    <label class="speed_label">加速</label>
                </div>
            </div>
            <div class="dayContral" style="display: none;" @click="dayContral">
                <i></i>
                <div class="dayBox"></div>
            </div>
            <div class="time-contral" style="left: -20px; bottom: 20px;">
                <div class="content-body" ref ="content_body"></div>
                <div id="demo-simple-slider" class="dragdealer" ref = "demo_simple">
                    <div class="handle red-bar"></div>
                </div>
                <div class="timeBox" style="right: -10px" ref="timeBox">
                    13:22:26
                </div>
                <div class="dot"><i></i><i></i><i></i><i></i><i></i><i></i></div>
            </div>
            <div style="position: absolute; top: 0; left: 0px; background: red; top: -200px; left: 0;" class="calenderShow"></div>
        </div>
    </div>
</template>
<script setup>
import {ref,onMounted,watch} from 'vue'
import jiasu_img from '/images/加速.png'
import _jiasu_img from '/images/加速_.png'
import jiansu_img from '/images/减速.png'
import _jiansu_img from '/images/减速_.png'

const props = defineProps({
    sunshine:{
        type:Boolean,
        default:true
      }
    })

const emit = defineEmits(["closeSunshine"])
const closeSunshine =()=>{
    emit("closeSunshine", false)
}
 var dragdealer
let content_body = ref(null)
let timeBox = ref(null)
let demo_simple = ref(null)
let stapau = ref('开始')
let _autoSun = ref(null)
let handle = ref(false)

let timeGet= ref(false)
//创建创建阴影查询对象

let Jiasu_img = ref(jiasu_img)
let Jiansu_img = ref(jiansu_img)
 const shadowQuery = new Cesium.ShadowQueryPoints(scene);
 shadowQuery.build();
 watch(props,(o,n)=>{
     console.log(n.sunshine)
     if(n.sunshine){
        timeGet.value.style.zIndex=9999   
         scene.layers.find("config").shadowType = 2;   
     }
     else{
                timeGet.value.style.zIndex=-999
        scene.layers.find("config").shadowType = 0;  
           handle.value=false
     }
 })
 var fTimeNum
     function autoSunDelay() {
          //getDragdealer()
         sunTimer = setInterval(function () {
               
                if (fTime >= 1) {
                    dragdealer.setValue(0, 1, false);
                    fTime = 0;
                } else {
                    if (Math.abs(fTime - fTimeNum) < 0.001) {                       
                        //$("#stapau").text("开始");
                        stapau.value= '开始'
                       // $("#autoSun").removeClass("active");

                        _autoSun.value.classList.remove("active");
                        dragdealer.setValue(fTimeNum, 1, false);
                        clearInterval(sunTimer);
                        fTime = fTimeNum;
                        //setTimeout(function(){dragdealer.setValue(0.25,1,false);},2000);
                    } else {
                        dragdealer.setValue(fTime, 1, false);
                        fTime = fTime + 0.01;
                    }
                }
            }, interval);
        }
        function getNowFormatDate(newDate) {
            let date;
            if (newDate) {
                date = newDate;
            } else {
                date = new Date();
            }
            let seperator1 = "-";
            let month = date.getMonth() + 1;
            let strDate = date.getDate();
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            let currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            let Number = (date.getHours() * 60 * 60 + date.getMinutes() * 60 + date.getSeconds()) / (24 * 60 * 60);
            
            return {
                nowData: date,
                number: Number,
                secound: date.getHours() * 60 * 60 + date.getMinutes() * 60 + date.getSeconds(),
                currentDate: currentdate
            };
        }
        // $('.dayContral').on('click', function () {
        //     if (!$(this).attr("clicked") || $(this).attr("clicked") == "0") {
        //         $('.calenderShow').trigger("mousedown");
        //         $(this).attr("clicked", 1);
        //     } else {
        //         $(this).attr("clicked", 0);
        //         $("#ProImg").mousedown();
        //     }
        // });
        var date_init;
        var julianDay, julianSecound;
        date_init = new Date();
        // date_init.setHours(14);
        // date_init.setMinutes(30);
        onMounted(()=>{
            getDragdealer()

        })
const jiansu_enter=()=>{
    console.log('@@@@')
    Jiansu_img.value=_jiansu_img

}
const jiansu_leave=()=>{
     console.log('###')
        Jiansu_img.value=jiasu_img

}
const jiasu_enter=()=>{
    Jiasu_img.value =_jiasu_img

}
const jiasu_leave=()=>{
        Jiasu_img.value =jiasu_img

}
        function getDragdealer(){
            //demo_simple.value
            dragdealer = new Dragdealer('demo-simple-slider', {
            x: getNowFormatDate(new Date).number,
            left: -11,
            right: -11,
            css3: true,
            speed: 1,
            animationCallback: function (x, y) {
          
                //$(".content-body").css({ 'width': Math.ceil(160 * x) + 'px' });
                content_body.value.style.width = Math.ceil(160 * x) + 'px'
                // $("#demo-simple-slider .handle").css({
                //     'left':Math.ceil(145 * x) + 'px'
                // })
                var hour = Math.floor(24 * x);
                var minute = Math.floor((24 * x - hour) * 60);
                var secound = Math.floor(((24 * x - hour) * 60 - minute) * 60);
               
               timeBox.value.innerHTML = hour + ' : ' + minute + ' : ' + secound
              // $(".timeBox").html(hour + ' : ' + minute + ' : ' + secound);
                if (julianDay) {
                    //如果选择了年月日
                    julianSecound = hour * 60 * 60 + minute * 60 + secound;
                } else {
                    //如果没有选择年月日，就是现在的年月日
                    var nowCalender = getNowFormatDate().nowData;
                    var JulianDate = nowCalender;
                    julianDay = JulianDate;
                    julianSecound = hour * 60 * 60 + minute * 60 + secound;
                }
                julianDay.setHours(hour);
                julianDay.setMinutes(minute);
                if (viewer) {
                    //console.log(Cesium.JulianDate.fromDate(julianDay),'fromDate(julianDay)')
                    viewer.clock.currentTime = Cesium.JulianDate.fromDate(julianDay);
                }
            }
        });
        }
        //时间比
        var fTime = 0.26;
        //定时器
        var sunTimer = null;
        //自动日照
        var oTimeOut = null;
        var interval = 200;
const jiansu_click=()=> {
    interval = interval * 2;
    if (_autoSun.value.getAttribute('class').includes('active')) {
        clearInterval(sunTimer);
        setTimeout(autoSunDelay(), interval);
    }
}
const jiasu_click=()=> {
  
    interval = interval / 2;
    if (_autoSun.value.getAttribute('class').includes('active')) {
        clearInterval(sunTimer);
        setTimeout(autoSunDelay(), interval);
    }
}
 const autoSun=()=>{
            fTime = parseFloat(dragdealer.getValue()[0]).toFixed(2);
            fTimeNum = fTime;
            fTime = parseFloat(fTime) + 0.01;  
            if(_autoSun.value.getAttribute('class').includes('active')){
                stapau.value = "继续"
                clearTimeout(oTimeOut);
                clearInterval(sunTimer);
                interval = 200;
                _autoSun.value.classList.remove("active")
            } else{
                stapau.value='暂停'
                dragdealer.setValue(fTime, 0, false);
                clearInterval(sunTimer);
                setTimeout(autoSunDelay(), interval);
                 _autoSun.value.classList.add("active")
            }        
}
const formateDate =(time)=>{
        let year = time.getFullYear()
        let month = time.getMonth() + 1
        let day = time.getDate()
        let hour = time.getHours()
	      let minute = time.getMinutes()
	      let second = time.getSeconds()
        if (month < 10) {
          month = '0' + month
        }
 
        if (day < 10) {
          day = '0' + day
        }
        hour = hour.toString().padStart(2, '0')
	      minute = minute.toString().padStart(2, '0')
	      second = second.toString().padStart(2, '0')
        return `${hour}:${minute}:${second}`
      }


</script>
<style scoped>
:deep(.setingBar) {
    width: 150px;
    height: 110px;
    margin: 5px;
    border-radius: 4px;
    /*color: cornflowerblue;*/
}
:deep(.slogen){
  margin: 0;
  padding: 0 20px;
  line-height: 18px;
  text-align: justify;
  margin: 5px 0 0 0;
  /*color: cornflowerblue;*/
  font-size: 13px;    
}
:deep(.content-body) {
    pointer-events: none;
    border-radius: 6px;
    overflow: hidden;
    height: 12px;
    background-image: url(/images/bg_image.png);
    background-size: auto 100%;
    color: #fff;
    font-size: 20px;
    position: absolute;
    z-index: 9999;
    top: 18px;
    left: 20px;
}
.jiansu_div{
  width: 38px; 
  height: 38px; 
  float: left;
}
.jiansu_img{
    cursor: pointer; 
    height: 38px; 
    width: 28px; 
    float: left; 
    margin-left: 5px
}
.jiasu_div{
    width: 38px; 
    height: 38px; 
    float: right;
}
.jiasu_img{
  cursor: pointer; 
  height: 38px; 
  width: 28px; 
  float: right; 
  margin-right: 5px  
}
.speed_lable{
    margin-left: 6px; 
    font-size: 13px;
}
</style>