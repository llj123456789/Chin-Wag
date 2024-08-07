<template>
  
  <div class="bar" id="bar">
    <img src="./assets/aboy.png" style="display: inline;width: 20vh;position: relative;top: -3vh;">
    <button @click="isCollapsed = !isCollapsed;" class="lbButton" >{{ lbButtonText }}</button>
    <div>
      <button @click="isDropdownOpen = !isDropdownOpen;isDropdownOpen2 = false" class="setting">设置⚙</button>
      <div v-if="isDropdownOpen" class="dropdown-content">
        <div @click="selectOption('Option 1')">插件设置</div>
        <div @click="selectOption('Option 2')">背景设置</div>
        <div @click="selectOption('Option 3')">字体设置</div>
      </div>
    </div>
    <div>
      <button @click="isDropdownOpen2 = !isDropdownOpen2;isDropdownOpen = false;" class="others">外部跳转</button>
      <div v-if="isDropdownOpen2" class="dropdown-content2">
        <div @click="selectOption2('Option 1')">主页导航</div>
        <div @click="selectOption2('Option 2')">Github</div>
        <div @click="selectOption2('Option 3')">资源网</div>
      </div>
    </div>
  
  </div>
 
  

  <transition name="lb">
    <div v-show="!isCollapsed"  class="leftBar-1" >
      <span style="position: relative;left: 10vw;font-size: 3vw;">意见箱</span>
      <form id="suggestForm" hx-post="https://api.scustu.cn/suggest" hx-target="#received" hx-swap="beforeend" @htmx:beforeRequest="beforeHtmxSubmit" @htmx:afterRequest="afterHtmxSubmit">
        <textarea id="suggestMan" name="advisor" placeholder="Name:" style="font-size: 3vh;width: 20vw;
        height: 10%;"></textarea>
        <textarea id="suggest" name="suggest" placeholder="Welcome to give me suggest" style="font-size: 3vh;width: 20vw;
        height: 10%;"></textarea>
        <button id="sendSuggest"  type="submit" style="width: 8vw;position: absolute;border:1px solid black;left: 8vw;top:30vh;color:black;background-color: brown;"><i class="fa fa-handshake"></i>提交</button>
  
      </form>
      <div id="received"> 
      </div>     
    </div>
  </transition>
  
  <div class="view-0 custom-cursor">
      <router-view></router-view>
  </div>
  <div class="tip-0 custom-cursor">
    <p>&emsp;&emsp;&emsp;&emsp;Base Info and tips</p>
    <div>
    <p>
      &距离上一次刷新页面：{{ staytime_m }} 分 {{ staytime_s }}秒啦<br>用户：&ensp; {{ user }} 
      <br><img :src="'https://api.scustu.cn/user/'+id+'/head'" alt="No found" style="width: 90px;position: absolute;left: 14vw;border-radius: 50%;">
      <br>账号: &emsp; {{ id }} 
      
    </p>
  </div>
  </div>
  <p style="font-size:0.9vw;position: fixed;right:1vw;bottom: 1vh;">Copyright © 2024 蜀ICP备2024088542号</p>

</template>

<script setup>
import { onMounted,ref,computed } from 'vue';
const isCollapsed=ref(true);
const isDropdownOpen=ref(false);
const isDropdownOpen2=ref(false);
const staytime_m=ref(0);
const staytime_s=ref(0);
const selectedOption = ref(null);
const selectedOption2 = ref(null);
const id= ref('0');
const user = ref("未登录哟！！！");

const beforeHtmxSubmit = () => {
      alert('You will upload your suggests when you look the information');
    };
const afterHtmxSubmit = (event) => {
  if (event.detail.successful) {
    alert('Thanks for your suggest, successfully uploaded');
  } else {
    alert('Failed to upload your suggest, please try again');
  }
};


const lbButtonText = computed(() => {
  return isCollapsed.value ? '展开建议栏' : '收起建议栏';
});


const selectOption=(option)=>
  {
    selectedOption.value = option;
    isDropdownOpen.value = false; // 选择后关闭下拉菜单

  }
const selectOption2=(option)=>
{
  selectedOption2.value = option;
  isDropdownOpen2.value = false; // 选择后关闭下拉菜单
}

setInterval(() => {
  staytime_s.value=+staytime_s.value+1;
  if(staytime_s.value==60)
    {
      staytime_s.value=0;
      staytime_m.value=+staytime_m.value+1;
    }
},1000);

onMounted(() => {
  
});


</script>

<script>
export default {
  name: 'App',
  components: [
]
};
</script>


<style scoped>
  @import url('./assets/styles/fontawesome.min.css');
  
  .dropdown-content {
  position: absolute;
  left: 31vw;
  top:10vh;
  width: 10vw;
  height: 20vh;
  background-color: #a6ffbe;
  border: 3px solid rgb(132, 226, 255);
  border-radius: 10%;
  box-shadow: 2vh 3vh 10vh 3vh rgb(255, 177, 177);
  z-index: 100;
}

.dropdown-content div {
  cursor: pointer;
  padding: 12px 16px;
  display: block;
}

.dropdown-content div:hover {
  background-color: #f1f1f1;
}
.dropdown-content2 {
  position: absolute;
  left: 38vw;
  top:10vh;
  width: 10vw;
  height: 20vh;
  background-color: #a6ffbe;
  border: 3px solid rgb(132, 226, 255);
  border-radius: 10%;
  box-shadow: 2vh 3vh 10vh 3vh rgb(255, 177, 177);
  z-index: 100;
}

.dropdown-content2 div {
  cursor: pointer;
  padding: 12px 16px;
  display: block;
}

.dropdown-content2 div:hover {
  background-color: #f1f1f1;
}

.custom-cursor{
  cursor: url('./assets/cur.ico'), pointer; 
}
.leftBar-1 {
  z-index: 1;
  overflow: scroll;
  
  display: inline;
  position: fixed;
  font-size: 2vh;
  background-color: rgba(255, 181, 222, 0.525);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  color: rgb(250, 112, 112);
  left: 0vw;
  padding: 10px;
  height: 50vh;
  width: 25vw;
  border: 2px solid black;
}
.lb-enter-from,.lb-leave-to{
  transform: translateX(-100%);
}
.lb-enter-active,.lb-leave-active{
  transition: 2S;
}

.lb.leave-from,.lb-enter-to{
  transform: translateX(0);
}
.lbButton{
  position: fixed;
  display: inline;
  height: 7vh;
  width: 5vw;
  color:rgb(0, 0, 0);
  border: 2px solid black;
  border-radius: 20%;
  box-shadow: 0 0 1vh rgba(0, 0, 0, 0.5), 0 0 3vh rgba(0, 0, 0, 0.5), 0 1vh 0vh rgba(0, 0, 0, 0.3);
  left: 27vw;
  top: 2vh;
  background-color: rgba(97, 255, 186, 0.8);
  transition: 0.5s;
}
.lbButton:hover
{
  background-color: rgba(97, 255, 186, 0.8);
  transform: scale(1.2);
}
.setting{
    position: fixed;
  display: inline;
  height: 7vh;
  width: 5vw;
  color:rgb(0, 0, 0);
  border: 2px solid black;
  border-radius: 20%;
  box-shadow: 0 0 1vh rgba(0, 0, 0, 0.5), 0 0 3vh rgba(0, 0, 0, 0.5), 0 1vh 0vh rgba(0, 0, 0, 0.3);
  left: 34vw;
  top: 2vh;
  background-color: rgba(84, 217, 243, 0.556);
  transition: 0.5s;
  }
  .setting:hover
{
  transform: scale(1.2);
}
.others{
    position: fixed;
  display: inline;
  height: 7vh;
  width: 5vw;
  color:rgb(0, 0, 0);
  border: 2px solid black;
  border-radius: 20%;
  box-shadow: 0 0 1vh rgba(0, 0, 0, 0.5), 0 0 3vh rgba(0, 0, 0, 0.5), 0 1vh 0vh rgba(0, 0, 0, 0.3);
  left: 41vw;
  top: 2vh;
  background-color: rgba(101, 255, 109, 0.556);
  transition: 0.5s;
  }
  .others:hover
{
  transform: scale(1.2);
}
.bar{
  width: 100%;
  height: 10vh;
  background-color: rgba(0, 0, 0, 0.288);
  position: fixed;
  background-size: cover;
  border: 2px solid #ccc; /* 可选：添加边框 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 可选：添加阴影 */
  top: 0vh;
  z-index: 2;
}
.tip-0{
  z-index: 0;
  overflow-y: scroll;
  background-color: #ffd8d87b;
  overflow-y: auto;
  position: fixed;
  left: 1vw;
  top: 6vh;
  width: 22vw;
  height: 30vh;
  border-radius: 10%;
  border: 2px solid rgb(129, 255, 240);
  box-shadow: 5vh 3vh 2vh rgba(0, 0, 0, 0.5);
  transform: translateY(20deg);
  margin-top: 5vh;
  backdrop-filter: blur(20px); /* 毛玻璃效果 */
}
.view-0{
  z-index: 1;
  background-color: #ffd8d87b;
  overflow-y: auto;
  position: fixed;
  left: 24vw;
  top: 5vh;
  width: 70vw;
  height: 80vh;
  border: 2px solid black;
  box-shadow: 5vh 3vh 1vh rgba(0, 0, 0, 0.5), 0 0 3vh rgba(0, 0, 0, 0.5), 0 1vh 0vh rgba(0, 0, 0, 0.3);
  transform: translateY(20deg);
  margin-top: 5vh;

}
.view-0:hover{
  background-color: #ffd8d8ab;
}

</style>

