<template>
  <dv-full-screen-container class="homePage">
    <dv-loading v-if="loading" style="cursor: pointer" @click="fullScreen">
      <div style="text-align: center;color: white">点击页面进入进入全屏，以获得更好体验</div>
      <div style="text-align: center;color: white">{{num}}秒后进入</div>
    </dv-loading>
    <dv-border-box-11 title="全国图书零售监测数据" style="display: flex">
      <div style="width: 100%;height: 100%;display: flex">
        <div class="system">
          <span class="project-left">
            <Left></Left>
          </span>
          <span class="project-centre">
            <Centre></Centre>
          </span>
          <span class="project-right">
            <Right></Right>
          </span>
        </div>
      </div>
    </dv-border-box-11>
  </dv-full-screen-container>
</template>

<script setup lang="ts">
import Left from "@/views/project/left.vue";
import Centre from "@/views/project/centre.vue";
import Right from "@/views/project/right.vue";
import {onMounted, ref} from "vue";
const loading = ref<boolean>(true);
const num = ref<number>(10);
const fullScreen = () => {
  let el:any = document.documentElement;
  el.requestFullscreen||el.mozRequestFullScreen||el.webkitRequestFullscreen||el.msRequestFullScreen?
      el.requestFullscreen()||el.mozRequestFullScreen()|| el.webkitRequestFullscreen()||el.msRequestFullscreen():null;
}
const init = () => {
  setTimeout(()=>{
    num.value--;
    if (num.value === 0){
      loading.value = false;
    }else{
      init();
    }
  },1000);
}
onMounted(()=>{
  init();
})
</script>

<style scoped lang="scss">
.homePage{
  background-image: url(.././assets/background.jpeg);
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  background-color: #001651;
  .system{
    width: 95%;
    height: 85%;
    margin: auto;
    display: flex;
    .project-left{
      width: 25%;
      height: 100%;
    }
    .project-centre{
      width: calc(50% - 40px);
      height: 100%;
      margin: 0 20px 0 20px;
    }
    .project-right{
      width: 25%;
      height: 100%;
    }
  }
}
</style>