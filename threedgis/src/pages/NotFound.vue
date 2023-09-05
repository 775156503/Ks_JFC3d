<template>
  <div class="ims-page-not-found">
    <div class="content">
      <img src="@/assets/images/404.png" alt="" />
      <div class="error-text-box">
        <span>出错了</span>
        <span>抱歉，网页走丢了...</span>
        <Button type="primary" @click="goHome">返回首页</Button>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

defineComponent({
  name: 'PageNotFound',
})
</script>

<script setup>
import { Button } from 'ant-design-vue'

import { useRouter } from 'vue-router'

const router = useRouter()

// 返回首页
function goHome() {
  router.push('/home')
}
</script>

<style lang="less" scoped>
.ims-page-not-found {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .content {
    display: flex;
    align-items: center;

    img {
      width: 500px;
    }
  }

  .error-text-box {
    display: flex;
    flex-direction: column;
    margin-left: 80px;

    > :nth-child(1) {
      color: #3370ff;
      font-size: 30px;
    }

    > :nth-child(2) {
      color: #333;
      margin: 15px 0 35px 0;
    }
  }
}
</style>
