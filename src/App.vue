<template>
<div id="app">
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
    <div class="main">
    <div class="up">
      <button class="card1">
        <a href="https://blog.scustu.cn"><svg t="1723093262921" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="17618" width="30px" height="30px"><path d="M924.8 337.6c-22.6-53.4-54.9-101.3-96-142.4-41.1-41.1-89-73.4-142.4-96C631.2 75.8 572.5 64 512 64S392.9 75.8 337.6 99.2c-53.4 22.6-101.3 54.9-142.4 96-41.1 41.1-73.4 89-96 142.4C75.8 392.9 64 451.5 64 512s11.8 119.1 35.2 174.4c22.6 53.3 54.9 101.3 96 142.4 41.1 41.1 89.1 73.4 142.4 96C392.8 948.2 451.5 960 512 960s119.1-11.8 174.4-35.2c53.3-22.6 101.3-54.9 142.4-96 41.1-41.1 73.4-89 96-142.4C948.2 631.1 960 572.5 960 512s-11.8-119.1-35.2-174.4z m-76.3 316.5c-18.4 43.5-44.7 82.5-78.3 116.1-33.5 33.5-72.6 59.9-116.1 78.3-45 19-92.8 28.7-142.1 28.7-40.5 0-79.9-6.9-117.6-19.7l2.1-27.9c5.9-69.9 27.5-136.6 64.1-191.5 6.8-10.3 14.9-22.2 23-32.8 9.6 3.3 19.7 5.1 30 5.1 50.7 0 92-41.3 92-92.1 0-50.7-41.3-91.8-92-91.8-50.8 0-92.1 41.4-92.1 92.1 0 6.5 0.7 13.4 2 19.6-13 14.8-25.1 31.5-36.2 48-25 37-67.6 117-78.8 229.2-19.6-13.1-37.9-28.2-54.8-45.1-33.6-33.6-59.9-72.6-78.3-116.1-19-45-28.7-92.8-28.7-142.1s9.6-97.1 28.7-142.1c18.4-43.5 44.7-82.5 78.3-116.1 33.6-33.6 72.6-59.9 116.1-78.3 45-19 92.8-28.7 142.1-28.7s97.1 9.6 142.1 28.7c43.5 18.4 82.5 44.7 116.1 78.3 33.6 33.6 59.9 72.6 78.3 116.1 19 45 28.7 92.8 28.7 142.1 0.1 49.2-9.6 97-28.6 142zM512.1 277.9c-62.5 0-121.2 24.3-165.4 68.6-44.2 44.2-68.3 103-68.3 165.5v34.5h97.3V512c0-83.4 60.4-151.3 143.8-151.3S663.3 428.6 663.3 512 595.4 663.3 512 663.3h-38.9v77.9H512c62.5 0 121.3-21.9 165.5-66.1 44.2-44.2 68.6-100.5 68.6-163.1s-24.3-121.3-68.5-165.5-103-68.6-165.5-68.6z" fill="#333333" p-id="17619"></path></svg></a>
      </button>
      <button class="card2" @click="getMail">
        <a href="https://qm.qq.com/q/PFbBw4XYGY"><svg t="1723093921903" class="icon" viewBox="0 0 1025 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5403" width="30px" height="30px"><path d="M511.87892 0C298.937289 0 104.4233 137.183551 30.712735 335.792572-42.997829 538.496624 20.475157 769.865896 186.323927 907.049447c165.84877 137.183551 405.408105 155.611192 589.684516 45.045345 184.276411-110.565847 280.509648-329.650025 239.559335-540.54414C972.569948 202.704052 800.578631 38.902798 591.732032 6.142547 565.114328 2.047516 538.496624 0 511.87892 0zM870.194164 647.014955c0 20.475157-2.047516 49.140376-18.427641 63.472986-14.33261 14.33261-26.617704-2.047516-34.807767-14.33261-2.047516-4.095031-14.33261-28.66522-16.380125-28.66522-6.142547 0-12.285094 24.570188-12.285094 28.66522-10.237578 24.570188-24.570188 45.045345-42.997829 63.472986 18.427641 18.427641 81.900627 30.712735 65.520502 69.615533-14.33261 34.807767-71.663049 40.950314-102.375784 42.997829-40.950314 2.047516-85.995659-2.047516-124.898457-14.33261-20.475157-6.142547-36.855282-12.285094-59.377955-12.285094-18.427641-2.047516-36.855282 16.380125-55.282923 22.522672-40.950314 14.33261-90.09069 12.285094-131.041004 8.190063-28.66522-4.095031-88.043174-10.237578-94.185721-47.092861-2.047516-12.285094 2.047516-30.712735 10.237578-40.950314 6.142547-6.142547 12.285094-10.237578 20.475157-12.285094 8.190063-2.047516 22.522672-2.047516 28.66522-6.142547 6.142547-4.095031-4.095031-8.190063-8.190063-12.285094-8.190063-6.142547-16.380125-14.33261-22.522672-20.475157-14.33261-16.380125-24.570188-32.760251-30.712735-51.187892-2.047516-4.095031-6.142547-24.570188-8.190063-24.570188-4.095031-2.047516-4.095031 6.142547-6.142547 8.190063-8.190063 16.380125-22.522672 34.807767-40.950314 40.950314-20.475157 8.190063-22.522672-12.285094-24.570188-28.66522-2.047516-20.475157-2.047516-42.997829 4.095031-63.472986 10.237578-40.950314 32.760251-77.805596 61.42547-108.518331 8.190063-8.190063 16.380125-16.380125 26.617704-24.570188 10.237578-8.190063 8.190063-6.142547 8.190063-18.427641-2.047516-22.522672-6.142547-30.712735 4.095031-53.235408 4.095031-8.190063 16.380125-20.475157 18.427641-28.66522 4.095031-10.237578 4.095031-18.427641 6.142547-28.66522 2.047516-20.475157 10.237578-40.950314 18.427641-59.377955 18.427641-38.902798 47.092861-75.75808 79.853112-102.375784 67.568017-53.235408 171.991317-55.282923 249.796913-28.66522 88.043174 28.66522 139.231066 104.4233 151.51616 194.51399 2.047516 8.190063 2.047516 18.427641 4.095031 26.617704 4.095031 10.237578 12.285094 18.427641 14.33261 26.617704 8.190063 20.475157 6.142547 36.855282 2.047516 57.330439-4.095031 16.380125 18.427641 38.902798 26.617704 53.235408 10.237578 20.475157 20.475157 40.950314 28.66522 61.42547C864.051617 604.017126 870.194164 626.539798 870.194164 647.014955z" fill="#272636" p-id="5404"></path></svg></a>
      </button>
    </div>
    <div class="down">
      <button class="card3">
        <svg t="1723093447657" class="github" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2477" width="30px" height="30px"><path d="M512 42.666667A464.64 464.64 0 0 0 42.666667 502.186667 460.373333 460.373333 0 0 0 363.52 938.666667c23.466667 4.266667 32-9.813333 32-22.186667v-78.08c-130.56 27.733333-158.293333-61.44-158.293333-61.44a122.026667 122.026667 0 0 0-52.053334-67.413333c-42.666667-28.16 3.413333-27.733333 3.413334-27.733334a98.56 98.56 0 0 1 71.68 47.36 101.12 101.12 0 0 0 136.533333 37.973334 99.413333 99.413333 0 0 1 29.866667-61.44c-104.106667-11.52-213.333333-50.773333-213.333334-226.986667a177.066667 177.066667 0 0 1 47.36-124.16 161.28 161.28 0 0 1 4.693334-121.173333s39.68-12.373333 128 46.933333a455.68 455.68 0 0 1 234.666666 0c89.6-59.306667 128-46.933333 128-46.933333a161.28 161.28 0 0 1 4.693334 121.173333A177.066667 177.066667 0 0 1 810.666667 477.866667c0 176.64-110.08 215.466667-213.333334 226.986666a106.666667 106.666667 0 0 1 32 85.333334v125.866666c0 14.933333 8.533333 26.88 32 22.186667A460.8 460.8 0 0 0 981.333333 502.186667 464.64 464.64 0 0 0 512 42.666667" fill="#231F20" p-id="2478"></path></svg>
      </button>
      <button class="card4">
        <a href="https://www.scustu.cn"><svg t="1723093517282" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4373" width="30px" height="30px"><path d="M498.16234667 906.55971555l-54.29361778-319.12163555-300.57244444-84.82247111L862.16248889 139.62695111 498.16234667 906.55971555zM299.35388445 487.54574222l194.56796444 54.90801778 30.10332444 176.93809778 215.53834667-454.12693333-440.20963555 222.28081777z" fill="#2c2c2c" p-id="4374"></path><path d="M512.91477333 433.35566222c-5.90165333 0-11.63946667-3.06403555-14.80021333-8.54357333-4.70926222-8.16583111-1.90691555-18.60152889 6.25891555-23.31079111l112.7276089-65.00920889c8.16355555-4.70812445 18.60039111-1.90805333 23.30965333 6.25777778 4.70926222 8.16583111 1.90691555 18.60152889-6.25891556 23.31079111l-112.72760889 65.00920889a16.97564445 16.97564445 0 0 1-8.50944 2.28579555z" fill="#2c2c2c" p-id="4375"></path></svg></a>
      </button>
      </div>
  </div>
  </div>
  <p style="position: absolute;right: 5vw;">距离上一次刷新页面：{{ staytime_m }} 分 {{ staytime_s }}秒啦</p>
  <p style="position: absolute;left: 16vw;top:14vh;font-size: 2vw;"><strong>联系我</strong></p>
  <p style="font-size:0.9vw;position: fixed;right:1vw;bottom: 1vh;">Copyright © 2024 蜀ICP备2024088542号</p>


  <div v-show="showWhiteboard" class="whiteboard">
  </div>  
</div>


</template>

<script setup>
import { onMounted,ref,computed, } from 'vue';
const isCollapsed=ref(true);
const isDropdownOpen=ref(false);
const isDropdownOpen2=ref(false);
const staytime_m=ref(0);
const staytime_s=ref(0);
const selectedOption = ref(null);
const selectedOption2 = ref(null);
const showWhiteboard=ref(false);


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

const getMail=()=>
{
  alert('Mail:204158484@qq.com\n');
}


const lbButtonText = computed(() => {
  return isCollapsed.value ? '意见箱' : '关闭意见箱';
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
.whiteboard {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.9); /* 半透明白色背景 */
  z-index: 9999; /* 确保白板在最上层 */
}
</style>
<style scoped>
  

  .fade-enter-from{   /* 进入时的透明度为0 和 刚开始进入时的原始位置通过active透明度渐渐变为1 */  
  opacity: 0;
  transform: translateX(-100%);
}
 
.fade-enter-to{   /*定义进入完成后的位置 和 透明度 */
  transform: translateX(0%);
  opacity: 1; 
}
 
.fade-leave-active,.fade-enter-active {
    transition: all 0.5s ease-out;
}
 
.fade-leave-from { /* 页面离开时一开始的css样式,离开后为leave-to，经过active渐渐透明 */
  transform: translateX(0%);
  opacity: 1;
}
 
.fade-leave-to{   /* 这个是离开后的透明度通过下面的active阶段渐渐变为0 */  
  transform: translateX(100%);
  opacity: 0;
}
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
  overflow: hidden;
  background-color: #ffd8d87b;
  overflow-x: hidden;
  position: fixed;
  left: 1vw;
  top: 6vh;
  width: 22vw;
  height: 32vh;
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


</style>

<style>
.main {
  display: flex;
  flex-direction: column;
  gap: 0.5em;
}

.up {
  display: flex;
  flex-direction: row;
  gap: 0.5em;
}

.down {
  display: flex;
  flex-direction: row;
  gap: 0.5em;
}

.card1 {
  width: 90px;
  height: 90px;
  outline:1.5px solid #ffbf92e0;
  border: 3px solid black;
  background: rgba(255, 255, 255, 0.497);
  border-radius: 90px 5px 5px 5px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  transition: .2s ease-in-out;
}

.instagram {
  margin-top: 1.5em;
  margin-left: 1.2em;
  fill: #cc39a4;
}

.card2 {
  width: 90px;
  height: 90px;
  outline:1.5px solid #ffbf92e0;
  border: 3px solid black;
  background: #e66a6a89;
  border-radius: 5px 90px 5px 5px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  transition: .2s ease-in-out;
}

.twitter {
  margin-top: 1.5em;
  margin-left: -.9em;
  fill: #03A9F4;
}

.card3 {
  width: 90px;
  height: 90px;
  outline:1.5px solid #ffbf92e0;
  border: 3px solid black;
  background: rgba(44, 43, 43, 0.5);
  border-radius: 5px 5px 5px 90px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  transition: .2s ease-in-out;
}

.github {
  margin-top: -.6em;
  margin-left: 1.2em;
}

.card4 {
  width: 90px;
  height: 90px;
  outline:1.5px solid #ffbf92e0;
  border: 3px solid black;
  background: rgba(99, 201, 224, 0.527);
  border-radius: 5px 5px 90px 5px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  transition: .2s ease-in-out;
}

.discord {
  margin-top: -.9em;
  margin-left: -1.2em;
  fill: #8c9eff;
}

.card1:hover {
  cursor: pointer;
  scale: 1.1;
  background-color: #cc39a4;
}

.card1:hover .instagram {
  fill: white;
}

.card2:hover {
  cursor: pointer;
  scale: 1.1;
  background-color: #03A9F4;
}

.card2:hover .twitter {
  fill: white;
}

.card3:hover {
  cursor: pointer;
  scale: 1.1;
  background-color: black;
}

.card3:hover .github {
  fill: white;
}

.card4:hover {
  cursor: pointer;
  scale: 1.1;
  background-color: #8c9eff;
}

.card4:hover .discord {
  fill: white;
}
</style>

