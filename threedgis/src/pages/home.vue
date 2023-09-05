<template>
  <div class="header_title">
    <div class="header_main" id="title_two">
      <div class="title_box">
        <div class="title_header">
          {{ title }}
        </div>
      </div>
    </div>
  </div>
  <div
    style="
      position: absolute;
      right: 20px;
      bottom: 20px;
      padding: 10px;
      background: #0b173f;
      border-radius: 50%;
      cursor: pointer;
    "
    @click="to_mh"
  >
    <img src="/images/fh.png" style="height: 30px; width: 30px" />
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
const title = ref('天工之城管网三维分析系统')
const router = useRouter()
const to_mh = () => {
  // location.replace(
  //   'http://139.196.154.132:9020/SCMH/index.html?key=' +
  //     getQueryString('key') +
  //     '&&UserName=' +
  //     getQueryString('UserName') +
  //     '&&ParssWord=' +
  //     getQueryString('ParssWord')
  // )
  document.getElementById('cesiumContainer').style.display = 'none'
  router.push('/login')
}
function getQueryString(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  var r = window.location.search.substring(1).match(reg)
  console.log(window.location.search)
  if (r != null) return decodeURI(r[2])
  return null
}
</script>
<style scoped>
.header_title {
  width: 100%;
  position: absolute;
  top: 0px;
}
.header_main {
  float: left;
  font-size: 16px;
  width: 80%;
  text-align: center;
  left: 10%;
  position: absolute;
  z-index: 1000;
}
.title_box {
  width: 100%;
  height: 50px;
}
.title_header {
  display: block;
  width: 100%;
  text-align: center;
  letter-spacing: 2px;
  color: #fff;
  text-align: center;
  height: 100%;
  font-size: 26px;
  font-weight: bold;
  display: block;
  font-family: Tahoma;
  background: url(../images/title.png) no-repeat 0px 0px;
  background-size: 1300px 50px;
  background-position: center;
  z-index: 9999;
}
</style>
