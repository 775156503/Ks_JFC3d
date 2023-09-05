<template>
  <div id="box">
    <div class="login">
      <Particles
        id="tsparticles"
        :particlesInit="particlesInit"
        :particlesLoaded="particlesLoaded"
        :options="option"
      />
      <img class="logo" src="@/assets/images/QC_logo.png" alt />
      <h1 class="title2">{{ title }}</h1>
      <div class="zong">
        <div class="loginto">
          <div class="titlename">账号登录</div>
          <p style="margin-top: 4vh">
            <i class="icon iconone"></i>
            <input
              type="text"
              v-model.trim="formState.username"
              placeholder="请输入账号"
              @keyup.enter="handleClickLogin"
            />
          </p>
          <p style="margin-top: 3vh">
            <i class="icon icontwo"></i>
            <input
              class="input"
              v-model.trim="formState.password"
              type="password"
              @keyup.enter="handleClickLogin"
              placeholder="请输入密码"
            />
          </p>

          <div class="login_box">
            <input
              id="jzmm"
              style="margin: 0 0.3vw; width: 2vh; height: 2vh"
              class="input"
              type="checkbox"
              v-model="formState.remember"
            />
            <label style="cursor: pointer" for="jzmm">记住密码</label>
          </div>
          <div style="text-align: center">
            <button class="loginButton" @click="handleClickLogin">登 录</button>
          </div>
        </div>
      </div>
    </div>
    <div class="company">
      欢迎登录{{ title }} | 版权所有 @2021-2023 上海启呈信息科技有限公司
    </div>
    <!-- <div class="namebox">
      <div class="name"></div>
    </div> -->
  </div>
</template>
<script setup>
import { message } from 'ant-design-vue'
import { ref, reactive, toRaw, watch, onMounted, onUnmounted } from 'vue'
import { loadFull } from 'tsparticles'
import { useRouter } from 'vue-router'
import { getUserInfo } from '@/api/index'
import { debounce } from 'loadsh'
import axios from 'axios'
const router = useRouter()
//import.meta.env.VITE_APP_TITLE
const title = '天工之城管网三维分析系统'
const formState = reactive({
  username: '',
  password: '',
  remember: false,
})
watch(
  () => formState.remember,
  (newValue, oldValue) => {
    console.log('watch 已触发', newValue)
  }
)
const handleClickLogin_ = () => {
  if (!formState.username) {
    return message.error('请输入账号')
  } else if (!formState.password) {
    return message.error('请输入密码')
  }
  const params = {
    password: formState.password,
    userName: formState.username,
  }
  let params2 = JSON.stringify(params)

  getUserInfo(params2).then((res) => {
    console.log(res)
    if (res.code == 200) {
      //储存用户
      localStorage.setItem('username', formState.username)
      localStorage.setItem('psw', formState.password)
      localStorage.setItem('token_51', res.data.token)
      console.log('token', localStorage.getItem('token_51'))
      router.push('/home')
    } else if (res.code == -1) {
      message.error('用户名或密码错误,登录失败')
    } else {
      message.error('登录失败')
    }
  })
}
const handleClickLogin = debounce(handleClickLogin_, 300)
onMounted(() => {
  formState.username = localStorage.getItem('username')
  formState.password = localStorage.getItem('psw')
  formState.remember = true
  // 全局监听回车
  document.onkeydown = function (e) {
    let key = window.event.keyCode
    if (key == 13) {
      handleClickLogin()
    }
  }
})
onUnmounted(() => {
  document.getElementById('cesiumContainer').style.display = 'block'
})
const particlesInit = async (engine) => {
  await loadFull(engine)
}
const particlesLoaded = async (container) => {
  console.log('Particles container loaded', container)
}

const option = {
  fpsLimit: 60,
  interactivity: {
    events: {
      onClick: {
        enable: false,
        mode: 'push',
      },
      onHover: {
        enable: true,
        mode: 'grab',
      },
      resize: true,
    },
    modes: {
      bubble: {
        distance: 400,
        duration: 2,
        opacity: 0.7,
        size: 40,
      },
      push: {
        quantity: 4,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
      attract: {
        // 鼠标悬浮时，集中于一点，鼠标移开时释放产生涟漪效果
        distance: 200,
        duration: 0.4,
        factor: 5,
      },
    },
  },
  particles: {
    color: {
      value: '#ffffff',
    },
    links: {
      color: '#ffffff',
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1,
    },
    collisions: {
      enable: true,
    },
    move: {
      direction: 'none',
      enable: true,
      outMode: 'bounce',
      random: false,
      speed: 2,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        area: 1000,
      },
      value: 80,
    },
    opacity: {
      value: 0.5,
    },
    shape: {
      type: 'circle',
    },
    size: {
      random: true,
      value: 4,
    },
  },
  detectRetina: true,
}
</script>

<style lang="less" scoped>
p {
  position: relative;
}
.icon {
  width: 4.5vh;
  height: 4.5vh;
  position: absolute;
  top: 0%;
  left: 0;
  transform: scale(0.6);
}
.iconone {
  background: url('@/assets/images/账号.png') no-repeat center;
}
.icontwo {
  background: url('@/assets/images/密码.png') no-repeat center;
}

button {
  width: 100%;
  background: #377cf1;
  background-image: linear-gradient(
    to bottom,
    rgb(35, 87, 222),
    rgb(55, 124, 241),
    rgb(35, 87, 222)
  );
  border: 1px solid transparent;
  color: #fff;
  height: 4.5vh;
  cursor: pointer;
  font-size: 2vh;
  margin-top: 2.5vh;
  border-radius: 4px;
}
.login {
  color: #fff;
  width: 100%;
  height: 80vh;
  margin: 120px auto;
  position: relative;
  z-index: 5;
}
input::-webkit-input-placeholder {
  color: #bcc6ea;
}
input::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #bcc6ea;
}
input:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #bcc6ea;
}
input:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: #bcc6ea;
}

.loginto {
  width: 100%;
  height: 100%;
  background: url('@/assets/images/bg1.png') no-repeat;
  opacity: 1;
  position: relative;
  background-size: 100% 100%;
  padding: 1vh 2.2vw;
  padding-top: 0;
}
.loginto .titlename {
  color: #fff;
  font-weight: normal;
  font-size: 1.1vw;
  height: 5vh;
  line-height: 4.6vh;
  text-align: center;
  background: url('@/assets/images/bg2.png') no-repeat center center;
  background-size: 8vw 1.5vh;
  position: relative;
  top: 2vh;
}
h1 {
  display: inline-block;
}
#box {
  width: 100%;
  height: 100vh;
  /* background: url(../assets/Login_bg.png) no-repeat center center; */
  background: url('@/assets/images/Login_bg.png') no-repeat center center;
  background-size: 100% 100%;
  overflow: hidden;
  user-select: none;
  position: relative;
}
.title2 {
  position: absolute;
  top: 5vh;
  left: 50%;
  transform: translateX(-50%);
  font-size: 3.2vw;
  /* font-size: 3vw; */
  font-weight: 700;
  color: #fff;
  letter-spacing: 12px;
  width: 100%;
  text-align: center;
  font-family: cursive;
  /* font-family: "微软雅黑"; */
  text-shadow: 2px 2px 2px grey;
}
.logo {
  width: 4.5vw;
  position: absolute;
  top: -9vh;
  left: 50%;
  transform: translateX(-50%);
}
.zong {
  width: 21vw;
  height: 37vh;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.namebox {
  width: 100%;
  height: 5vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

span {
  text-align: right;
  width: 275px;
  display: inline-block;
  padding-top: 10px;
}
input:-webkit-autofill {
  -webkit-text-fill-color: #ededed !important;

  background-color: transparent;
  background-image: none;
  transition: background-color 50000s ease-in-out 0s;
}
input[type='text'],
input[type='password'] {
  width: 100%;
  height: 4.5vh;
  text-indent: 2vw;
  border: 1px solid #0091ff;
  border-radius: 5px;
  outline: 0;
  background-color: #113c8a;
}
input[type='checkbox'] {
  position: relative;
  cursor: pointer;
}
input[type='checkbox']::after {
  width: 100%;
  height: 100%;
  border-radius: 3px;
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  /* background: #0091ff; */
  background: #4cc0f8;
  cursor: pointer;
}
input[type='checkbox']:checked::after {
  display: none;
}
.company,
.namebox {
  font-family: '宋体';
  color: #fff;
  font-size: 0.5vw;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 1%;
}
.namebox {
  bottom: 5%;
}
.loginButton {
  text-align: center;
  transition: all 0.3s;
  outline: none;
  height: 38px;
  line-height: 0px;
  padding: 0 0 3px 0;
}
.loginButton:hover {
  box-shadow: 0px 0px 12px #4cc0f8;
}
.login_box {
  height: 3vh;
  line-height: 3vh;
  margin-right: 2px;
  font-size: 0.8vw;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 2.5vh;
}
</style>
