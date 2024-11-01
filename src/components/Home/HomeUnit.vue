
<template>



<div class="barTop">
  <div :class="[ page == 'friend' ? 'rbClass' : null , 'chose']" style="left :5%;" @click="toF">
    <strong>AI-robot</strong>
  </div>
  <div :class="[ page == 'resource' ? 'rbClass' : null , 'chose']" style="left:20%;" @click="toR">
    <strong>在线资源</strong>
  </div>
  <div :class="[ page == 'memory' ? 'rbClass' : null , 'chose']" style="left:35%;" @click="toM">
    <strong>在线存储</strong>
  </div>
  <div :class="[ page == 'tool' ? 'rbClass' : null , 'chose']" style="left:50%;" @click="toT">
    <strong>在线工具</strong>
  </div>
  <div :class="[ page == 'user' ? 'rbClass' : null , 'chose']" style="left:65%;" @click="toU">
    <strong>用户</strong>
  </div>
  <div :class="[ page == 'index' ? 'rbClass' : null , 'chose']" style="left:80%;" @click="toI">
    <strong>首页</strong>
  </div>
</div>.

  
  <div class="card">
    <img :src="headUrl" style="width: 90px;border-radius: 50%;">
  <p class="heading">
    用户账号:{{ account }}
  </p>
  <p>
    TotalMemory: {{ mem }} M
  </p>
  <p v-bind:class="[ isRoot ? 'redClass' : 'greenClass' ]" > {{ NIKO }}</p>
  </div>
 

<div class="information">
    <span> <strong>Information</strong></span>
</div>

<div class="view">
  <div class="input__container" style="position: absolute;right: 0vw;top: 0vh;">
    <div class="shadow__input"></div>
    <button class="input__button__shadow">
      <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" height="20px" width="20px">
        <path d="M4 9a5 5 0 1110 0A5 5 0 014 9zm5-7a7 7 0 104.2 12.6.999.999 0 00.093.107l3 3a1 1 0 001.414-1.414l-3-3a.999.999 0 00-.107-.093A7 7 0 009 2z" fill-rule="evenodd" fill="#17202A"></path>
      </svg>
    </button>
    <input type="text" name="text" class="input__search" placeholder="What do you want to search?">
  </div>

  <router-view></router-view>
  
</div>

<div v-show="showWhiteboard" class="whiteboard">
    <div class="loader">
      <div class="intern">
    </div>
    <div class="external-shadow">
    <div class="central">
    </div>
    </div>
  </div>
<br>
<p style="position: absolute;left: 50%;top: 50%;transform: translateX(-50%);font-size: 30px;
background: linear-gradient(90deg,red,green,blue,pink,purple);
-webkit-background-clip: text;color: transparent;
box-shadow: 2vw 2vw 5vw 1vw aqua;outline: 2px whitesmoke;"><strong>别急,内容正在加载中</strong></p>
  </div>  
</template>
    <script >

import axios from 'axios';

    
    
    export default {
      name: 'HomeIndex',
      data()
      {
        return {
          account: '',
          headUrl:  '',
          mem: '',
          isRoot: false,
          NIKO: '',
          showWhiteboard: true,
          page: 'index',
          intervalId: null ,
        } 
      },
      methods:{
        toF()
        {
        
          this.page='friend';
          this.$router.push({
            path:'/home/friend',
          })
        }
        ,
        toR()
        {
          this.page='resource';
          this.$router.push({
            path:'/home/resource',
          })
        }
        ,
        toM()
        {
          this.page='memory';
          this.$router.push({
            path:'/home/memory',
          })
        }
        ,
        toT()
        {
          this.page='tool';
          this.$router.push({
            path:'/home/tool',
          })
        }
        ,
        toU()
        {
          this.page='user';
          this.$router.push({
            path:'/home/user',
          })
        }
        ,
        toI()
        {
          this.page='index';
          this.$router.push({
            path:'/home/',
          })
        }
        ,
        checkFirst()
        {
              axios.post('https://api.scustu.cn/alive',{
                account:this.$store.state.account
              })
              .then(response=>{
                if(response.data.message=='SUCCESS')
              {
                this.$store.state.temp=response.data.temp;
              }else{
                this.$store.dispatch('logout')
                this.$router.push({
                    path:'/',
                    state:{
                    }
                  });
              }
              })
              .catch(error=>{
                if (error.response) {
          // 服务器返回的错误信息
              } else if (error.request) {
                // 请求已发送但没有收到响应
              } else {
                // 其他错误
                }
                this.$store.dispatch('logout')
                this.$router.push({
                    path:'/',
                    state:{
                    }
                  });
                
              })
        },
        checkOnline()
        {

          this.intervalId =setInterval(() => {
              axios.post('https://api.scustu.cn/checkAlive',{
                temp:this.$store.state.temp,
                account:this.$store.state.account
              })
              .then(response=>{
                if(response.data.message!='SUCCESS')
                {
                this.$store.dispatch('logout')
                alert('长时间未操作退出登录')
                this.$router.push({
                    path:'/',
                    state:{
                    }
                  });
                this.stopInterval();
              }
              })
              .catch(error=>{
                if (error.response) {
          // 服务器返回的错误信息
                alert('服务器校验失败');
              } else if (error.request) {
                // 请求已发送但没有收到响应
                alert('没有收到服务器响应');
              } else {
                // 其他错误
                alert('服务器校验失败');
                }
                this.$store.dispatch('logout')
                this.$router.push({
                    path:'/',
                    state:{
                    }
                  });
                this.stopInterval();
                
              })
            },500000);
        },
        stopInterval() {
      if (this.intervalId) {
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
    },
        afterHtmx(){
          this.$nextTick(()=>{
          })
        },
      waitTime() {
      setTimeout(() => {
        this.showWhiteboard = false;
        // 在这里添加你想在 3 秒后执行的代码
      }, 2000);
      },    

      checkNiko()
      {
      if(this.isRoot=='true')   this.isRoot=true
      else if(this.isRoot=='fasle') this.isRoot=false
      if(typeof(this.isRoot)!="boolean") this.isRoot=false
      if(this.isRoot==true) this.NIKO='管理员';
      else if(this.isRoot==false) this.NIKO='普通用户';
      
      }
        
        
      },
      created()
      {
        this.checkFirst();
        this.account= this.$store.state.account;
        this.headUrl=this.$store.state.headUrl;
        this.mem=this.$store.state.mem ;
        this.isRoot= this.$store.state.isRoot; 
        this.page=this.$route.query.page;
        this.checkNiko();
      },
      
      mounted(){
        
        this.waitTime();
        this.checkOnline();
        const data={
          messages:[],
        }
        this.$store.dispatch('history',data);
        
        
      },
      beforeUnmount(){
      },
      
      
      
    }
    
    </script>
<style scoped>
.view{
  z-index: 3;
  background-color: transparent;
  overflow-y: auto;
  position: fixed;
  left: 41.5vw;
  top: 18.7vh;
  width: 52.4vw;
  height: 65.7vh;
  transform: translateY(20deg);
  margin-top: 5vh;
  border: 3px solid #212121;
  box-shadow: 1px 1px 5px 1px #97f8ff;

}


.information{
  width: 17vw;
  background-color: rgba(255, 255, 255, 0);
  position: absolute;
  bottom: 0vh;
  height: 33vh;
  text-align: center;
  border: 2px solid #212121;
  border-radius: 10%;
  
}
.chose{
  z-index: 3;
  position: absolute;display: flex;
  justify-content: center;
  align-items: center;
  top: 10%;width: 5vw;height: 10vh;border: 3px solid black;border-radius: 12%;
}
.chose:hover{
  scale: 1.1;
}

.barTop{
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  background-color: rgba(0, 255, 255, 0.282);
  border: 2px solid black;
  box-shadow: 2px 2px 5px 1px #212121;
  width: 75%;
  right: 0;
  height: 13vh;
  z-index: 3;
 
}

.redClass{
  color: rgb(255, 122, 137);
}
.greenClass{
  color: rgb(133, 255, 202);
}

.rbClass{
  background-color: rgb(255, 122, 137);
}

.loader {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: not-allowed;
  scale: 0.7;
}

.central {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 10em;
  height: 10em;
  border-radius: 50%;
  box-shadow: 0.5em 1em 1em cyan,
    -0.5em 0.5em 1em lime,
    0.5em -0.5em 1em white,
    -0.5em -0.5em 1em yellow;
}

.external-shadow {
  width: 10em;
  height: 10em;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  box-shadow: 0.5em 0.5em 3em cyan,
    -0.5em 0.5em 3em lime,
    0.5em -0.5em 3em white,
    -0.5em -0.5em 3em yellow;
  z-index: 999;
  animation: rotate 3s linear infinite;
  background-color: #212121;
}

.intern {
  position: absolute;
  color: white;
  z-index: 9999;
}

.intern::before {
  content: "100%";
  animation: percent 2s ease-in-out infinite;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }

  50% {
    transform: rotate(180deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

@keyframes percent {
  0% {
    content: '0%';
  }

  25% {
    content: '25%';
  }

  33% {
    content: '33%';
  }

  42% {
    content: '42%';
  }

  51% {
    content: '51%';
  }

  67% {
    content: '67%';
  }

  74% {
    content: '74%';
  }

  75% {
    content: '75%';
  }

  86% {
    content: '86%';
  }

  95% {
    content: '95%';
  }

  98% {
    content: '98%';
  }

  99% {
    content: '99%';
  }
}
.whiteboard {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(161, 219, 236); /* 半透明白色背景 */
  z-index: 9999; /* 确保白板在最上层 */
}
</style>
    <style scoped>
.card {
  position: relative;
  top: -10px;
  left: 10px;
  width: 190px;
  height: 254px;
  background-color: #03030389;
  display: flex;
  flex-direction: column;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  color: rgb(255, 255, 255);
}

.card::before {
  content: '';
  position: absolute;
  inset: 0;
  left: -5px;
  margin: auto;
  width: 200px;
  height: 264px;
  border-radius: 10px;
  background: linear-gradient(-45deg, #fc00ff 0%, #40c9ff 100% );
  z-index: -10;
  pointer-events: none;
  transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.card::after {
  content: "";
  z-index: -1;
  position: absolute;
  inset: 0;
  background: linear-gradient(-45deg, #ffffff 0%, #00dbde 100% );
  transform: translate3d(0, 0, 0) scale(0.95);
  filter: blur(20px);
}

.heading {
  font-size: 20px;
  text-transform: capitalize;
  font-weight: 700;
}

.card p:not(.heading) {
  font-size: 14px;
}

.card p:last-child {

  font-weight: 600;
}

.card:hover::after {
  filter: blur(30px);
}

.card:hover::before {
  transform: rotate(-90deg) scaleX(1.34) scaleY(0.77);
}


    </style>
    
    
  <style>
  /* From Uiverse.io by EddyBel */ 
.input__container {
  position: relative;
  background: rgba(255, 255, 255, 0.664);
  padding: 10px 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  border-radius: 22px;
  max-width: 300px;
  transition: transform 400ms;
  transform-style: preserve-3d;
  transform: rotateX(0deg) rotateY(0deg);
  perspective: 500px;
}

.shadow__input {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  bottom: 0;
  z-index: -1;
  filter: blur(30px);
  border-radius: 20px;
  background-color: #999cff;
  background-image: radial-gradient(at 85% 51%, hsla(60,60%,61%,1) 0px, transparent 50%),
    radial-gradient(at 74% 68%, hsla(235,69%,77%,1) 0px, transparent 50%),
    radial-gradient(at 64% 79%, hsla(284,72%,73%,1) 0px, transparent 50%),
    radial-gradient(at 75% 16%, hsla(283,60%,72%,1) 0px, transparent 50%),
    radial-gradient(at 90% 65%, hsla(153,70%,64%,1) 0px, transparent 50%),
    radial-gradient(at 91% 83%, hsla(283,74%,69%,1) 0px, transparent 50%),
    radial-gradient(at 72% 91%, hsla(213,75%,75%,1) 0px, transparent 50%);
}

.input__button__shadow {
  cursor: pointer;
  border: none;
  background: none;
  transition: transform 400ms, background 400ms;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  padding: 5px;
}

.input__button__shadow:hover {
  background: rgba(255, 255, 255, 0.411);
}

.input__search {
  width: 100%;
  border-radius: 20px;
  outline: none;
  border: none;
  padding: 8px;
  position: relative;
}
  </style>
