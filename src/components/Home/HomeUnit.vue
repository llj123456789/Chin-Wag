
<template>
  <div class="card">
    <img :src="headUrl" style="width: 90px;border-radius: 50%;">
  <p class="heading">
    用户id:{{ account }}
  </p>
  <p>
    memory: 10M
  </p>
  <p>普通用户</p>
</div>
 
    <button hx-get="logo.txt" hx-target="#output" @htmx:afterRequest="afterHtmx">Fetch Data</button>
    <div id="output" >data</div>

    <p>{{ msg }} </p>
    

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
    
    
    export default {
      name: 'HomeIndex',
      props: {
        msg: String
      },
      data()
      {
        return {
          account:'',
          headUrl:'',
          showWhiteboard: false
        } 
      },
      methods:{
        
        afterHtmx(){
          this.$nextTick(()=>{
            console.log('htmx');
          })
        },
        waitTime() {
          this.showWhiteboard=true;
      setTimeout(() => {
        this.showWhiteboard = false;
        // 在这里添加你想在 3 秒后执行的代码
      }, 1000);
    },
        
      },
      
      mounted(){
        
        this.account=this.$route.query.account;
        this.headUrl=this.$route.query.headUrl;
      },
      beforeUnmount(){
      },
      
      
      
    }
    
    </script>
<style scoped>
/* From Uiverse.io by Ratinax */ 
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
  top: 20px;
  left: 10px;
  width: 190px;
  height: 254px;
  background-color: #03030389;
  display: flex;
  flex-direction: column;
  justify-content: end;
  padding: 12px;
  gap: 12px;
  border-radius: 8px;
  cursor: pointer;
  color: white;
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
  background: linear-gradient(-45deg, #e81cff 0%, #40c9ff 100% );
  z-index: -10;
  pointer-events: none;
  transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.card::after {
  content: "";
  z-index: -1;
  position: absolute;
  inset: 0;
  background: linear-gradient(-45deg, #fc00ff 0%, #00dbde 100% );
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
  color: #e81cff;
  font-weight: 600;
}

.card:hover::after {
  filter: blur(30px);
}

.card:hover::before {
  transform: rotate(-90deg) scaleX(1.34) scaleY(0.77);
}


    </style>
    
    
    