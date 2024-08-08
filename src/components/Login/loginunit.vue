<template>

  <p class="logintxt">Chin-Wag</p>
  <button class="button head">
      <div class="bloom-container">
        <div class="button-container-main">
          <div class="button-inner">
            <div class="back"></div>
            <div class="front">
              <img  id="head" :src="headUrl" class="headicon">
            </div>
          </div>
          <div class="button-glass">
            <div class="back"></div>
            <div class="front"></div>
          </div>
        </div>
        <div class="bloom bloom1"></div>
        <div class="bloom bloom2">
      </div>
      </div></button>
  <form class="inputarea">
    <input type="text" id="account" name="account" placeholder="请输入账号(1-16位)" class="put" minlength="1" maxlength="16" @input="filterAccount" v-model="nowaccount">
    <input type="password" id="pwd" name="pwd" placeholder="请输入密码(8-16位)" class="put" minlength="8" maxlength="16" @input="filterPassword"  v-model="nowpwd">
    <button class="post" @click="LOGIN">Login</button>
  </form>

  <div class="card" style="position: fixed;right: 8vw;top: 15vh;">
    <div class="img"></div>
  <div class="textBox">
    <div class="textContent">
      <a href="https://edu.scustu.cn" style="color: aqua;"><p class="h1">Welcome</p></a>
      <span class="span"> {{ time }}</span>
    </div>
    <p class="p">Chinwag not just chinwag</p>
  <div>
</div></div></div>


  <div style="position: absolute;left: 50vw;top: 73vh;">
    <span>注册即代表同意</span>
    <a href="https://www.scustu.cn/privacy" target="_blank">用户协议和隐私条款</a>
  </div>
  <div class="lines" style="left: 4vw;"></div>
  <div class="lines" style="left: 20vw;"></div>
  <div class="rg">
    Register for a new account?
    <div id="preview"></div>
    <div class="upload-area">
        <input type="file" id="upload" name="upload" accept="image/*" @change="handleFileChange" style="display: none;">
        <button class=" upload-btn uiverse" for="upload" @click="triggerFileUpload">
          <div class="wrapper">
              <span>上传头像</span>
              <div class="circle circle-12"></div>
              <div class="circle circle-11"></div>
              <div class="circle circle-10"></div>
              <div class="circle circle-9"></div>
              <div class="circle circle-8"></div>
              <div class="circle circle-7"></div>
              <div class="circle circle-6"></div>
              <div class="circle circle-5"></div>
              <div class="circle circle-4"></div>
              <div class="circle circle-3"></div>
              <div class="circle circle-2"></div>
              <div class="circle circle-1"></div>
          </div>
        </button>
    </div>
    <p style="position: absolute;right: 50%;transform :translateX(50%);top:40vh;font-size: 12px;"><strong>右侧输入账号密码注册</strong></p>
      
    <button @click="REGIST" class="btn" style="position: absolute;right: 50%;transform :translateX(50%);top:45vh">regist</button>
  </div>



  
</template>


<script >
import axios  from 'axios';
export default {
  name: 'LoginUnit',
  props: {
    // 接收父组件传来的参数
    
  },
  data()
  {
    
    return {
      selectedHeadFile: null,
      nowaccount:'',
      nowpwd:'',
      headUrl:'',
      time:'',


    } 
  },
  methods:{

      updateHeadUrl()
    {
      this.headUrl = 'https://api.scustu.cn/user/' + this.nowaccount + '/head';
    },
    filterAccount(event) {
      // 只允许输入字母和数字
      this.nowaccount = event.target.value.replace(/[^0-9]/g, '');
      this.updateHeadUrl();

    },
    filterPassword(event) {
      // 只允许输入字母、数字和特殊字符
      this.nowpwd = event.target.value.replace(/[^a-zA-Z0-9!@#$%^&*]/g, '');
    },
    LOGIN(event)
    {event.preventDefault();

      if(!this.nowaccount || !this.nowpwd)
      {
        alert('请填写账号密码');
        return;
      }
      if(this.nowaccount.length<1 || this.nowaccount.length>16)
      {
        alert('账号长度不符合要求');
        return;
      }
      if(this.nowpwd.length<8 || this.nowpwd.length>16)
      {
        alert('密码长度不符合要求');
        return;
      }
      
      console.log('login');
      axios.post('https://api.scustu.cn/login',{
        account:this.nowaccount,
        password:this.nowpwd

      })
      .then(response=>{
        
        if(response.data.message=='SUCCESS')
      {
        this.$router.push({
          path:'/home',
          query:{
            account:this.nowaccount,
            headUrl:this.headUrl
          }
        });
      }
      else{
        alert('登录失败: '+response.data.message);
      }
        
      })
      .catch(error => {
        if (error.response) {
          // 服务器返回的错误信息
          alert(`登录失败: ${error.response.data.message}`);
        } else if (error.request) {
          // 请求已发送但没有收到响应
          alert('登录失败: 没有收到服务器响应');
        } else {
          // 其他错误
          alert(`登录失败: ${error.message}`);
        }
      })
    },
    REGIST(event)
    {
       event.preventDefault();
      if (!this.nowaccount || !this.nowpwd || !this.selectedHeadFile) {
        alert('请填写账号密码并上传头像');
        return;
      }
      const formData = new FormData();
      formData.append('account', this.nowaccount);
      formData.append('password', this.nowpwd);
      formData.append('image', this.selectedHeadFile);
      console.log(formData);

      axios.post('https://api.scustu.cn/register',formData,{
        headers: {
          'Content-Type':'multipart/form-data'
        }
      })
      .then(response=>{
        if(response.data.message=='SUCCESS')
          {
            alert('注册成功,自动登录');
            this.$router.push({
              path:'/home',
              query:{
                account:this.nowaccount,
                headUrl:this.headUrl
          }
        });
          }else{
            alert('注册失败: '+response.data.message);
          }
        
      })
      .catch(error => {
        if (error.response) {
          // 服务器返回的错误信息
          alert(`注册失败: ${error.response.data.message}`);
        } else if (error.request) {
          // 请求已发送但没有收到响应
          alert('注册失败: 没有收到服务器响应');
        } else {
          // 其他错误
          alert(`注册失败: ${error.message}`);
        }
      });

    },

    afterHtmx(){
      this.$nextTick(()=>{
        console.log('htmx');
      })
    },
    triggerFileUpload() {
      document.getElementById('upload').click();
    },
    handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.selectedHeadFile = file
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = document.createElement('img');
          img.src = e.target.result;
          img.width = 100; // 设置预览图片的宽度
          img.style.borderRadius='50%';
          document.getElementById('preview').innerHTML = ''; // 清空之前的预览
          document.getElementById('preview').appendChild(img);
        };
        reader.readAsDataURL(file);
        //this.headUrl = '';
      } else {
        console.error('No file selected');
      }
    },
    getNowTime()
    {
      setInterval(()=>{
        this.time=new Date().toDateString();
      })
    },
   
  },
 
  
  
  mounted(){
    console.log("mounted");
    this.getNowTime();
    this.headUrl = 'https://api.scustu.cn/user/' + this.nowaccount + '/head';
  },
  beforeUnmount(){
    console.log("beforeDestroy")
  },
  
  
  
}



</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>



#preview  {
  margin-top: 10px;
  width: 100px;
  height: 100px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  
  border: 1px solid #ddd;
  border-radius: 50%;
  padding: 5px;
  background-color: #f9f9f9;
}
.logintxt{
  font-size: 35px;
  font-weight: bolder;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top:3vh;
  background: linear-gradient(90deg, #24aadb, #ffdada,#ff88c3,#e87ef6,#f8bfbf,#24aadb);
  -webkit-background-clip: text;
  background-size: 200% 100%;
  color: transparent;
  font-family: 'Poppins','Arial';
  -webkit-text-fill-color: transparent;
  animation: move 5s infinite ease-in-out;
}
.head{
  height: 180px;
  width: 180px;
  background-color: #87d4f84a;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 12vh
  
}
.inputarea{
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 43vh;
  display: block;
  justify-content: center;
  align-items: center;
  width: 200px;
  font-size: 20px;
}
.regarea{
  position: absolute;
  top: 10vh;
  width: 20vw;
  font-size: 18px;
}

.put{
  border: 2px solid #5394f6;
  outline: none;
  padding: 10px;
  color: #f0f2f5;
  width: 100%;
  margin-bottom: 10px;
  background-color: #52575d;
  border-radius: 10px;

}
.put2{
  border: 2px solid #5394f6;
  outline: none;
  padding: 10px;
  color: #f0f2f5;
  width: 70%;
  margin-bottom: 10px;
  background-color: #52575d;
  border-radius: 10px;

}

.post{
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 10vw;
  height: 50px;
  background: linear-gradient(90deg,  #24aadb, #ffdada,#ff88c3,#e87ef6,#f8bfbf,#24aadb);
  background-size: 200% 100%;
  color: transparent;
  border-radius: 28px;
box-shadow:  -10px 10px 20px #969696,
             10px -10px 20px #ffffff;
  border: 3px rgb(0, 0, 0) solid;
  font-family: 'Poppins';
  box-shadow: 2vh,1vh,8vh #7cb5fb;
  cursor: pointer;
  font-size: 30px;
  -webkit-text-stroke: 1.7px  #000000;
  animation: move 2s infinite linear;
}
@keyframes move {
  0%{
    background-position: 0 0;
  }
  100% {
    background-position: 200% 0;
  }
}
.rg{
  position: absolute;
  left:2vw;
  top: 10vh;
  width: 20vw;
  height: 63vh;
  backdrop-filter: blur(10px);
  background-color: #f7bad300;
  background-size: 200% 100%;
  color: #001418;
  border-radius: 10px;
  border: 3px rgb(0, 0, 0) solid;
  font-family: Georgia, 'Times New Roman', Times, serif;
  box-shadow: 
      5vh 5vh 5px rgba(0, 0, 0, 0.5), /* 阴影效果 */
      inset 0 0 5px rgba(255, 255, 255, 0.3); /* 内部阴影效果 */
  cursor: pointer;
  font-size: 20px;
  animation: updown 4s infinite ease-in-out;

}
@keyframes updown {
  0%{
    transform: translateY(0);
  }
  50%{
    transform: translateY(3vh);
  }
  100% {
    transform: translateY(0);
  }
}
.lines{
    transform-origin: top center;
    position: absolute;
    top: -5vh;
    height: 20vh;
    width: 0.2vw;
    background-color: #000;
    cursor: pointer; /* 添加指针，表示可点击 */
    transition: height 1s ease; /* 平滑过渡效果 */
    border-radius: 10%; /* 圆角效果 */
    box-shadow: 
    4vh 5vh 5px rgba(0, 0, 0, 0.5), /* 阴影效果 */
    inset 0 0 5px rgba(255, 255, 255, 0.3); /* 内部阴影效果 */
  }

  .headicon{
    position: absolute;
    left: -50%;
    top: -50%;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    transform-origin: center;
    rotate: 45deg;
  }


</style>

<style>
.button {
  background: none;
  border: none;
}

.button .bloom-container {
  position: relative;
  transition: all 0.2s ease-in-out;
  border: none;
  background: none;
}

.button .bloom-container .button-container-main {
  width: 110px;
  aspect-ratio: 1;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  display: grid;
  place-content: center;
  border-right: 5px solid white;
  border-left: 5px solid rgba(128, 128, 128, 0.147);
  transform: rotate(-45deg);
  transition: all 0.5s ease-in-out;
}

.button .bloom-container .button-container-main .button-inner {
  height: 60px;
  aspect-ratio: 1;
  border-radius: 50%;
  position: relative;
  box-shadow: rgba(100, 100, 111, 0.5) -10px 5px 10px 0px;
  transition: all 0.5s ease-in-out;
}

.button .bloom-container .button-container-main .button-inner .back {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: linear-gradient(60deg, rgb(1, 85, 103) 0%, rgb(147, 245, 255) 100%);
}

.button .bloom-container .button-container-main .button-inner .front {
  position: absolute;
  inset: 5px;
  border-radius: 50%;
  background: linear-gradient(60deg, rgb(0, 103, 140) 0%, rgb(58, 209, 233) 100%);
  display: grid;
  place-content: center;
}

.button .bloom-container .button-container-main .button-inner .front .svg {
  fill: #ffffff;
  opacity: 0.5;
  width: 30px;
  aspect-ratio: 1;
  transform: rotate(45deg);
  transition: all 0.2s ease-in;
}

.button .bloom-container .button-container-main .button-glass {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.888) 100%);
  transform: translate(0%, -50%) rotate(0deg);
  transform-origin: bottom center;
  transition: all 0.5s ease-in-out;
}

.button .bloom-container .bloom {
  height: 1px;
  width: 1px;
  position: absolute;
  background: white;
}

.button .bloom-container .bloom1 {
  top: 10px;
  right: 20px;
  box-shadow: rgb(255, 255, 255) 0px 0px 10px 10px, rgb(255, 255, 255) 0px 0px 20px 20px;
}

.button .bloom-container .bloom2 {
  bottom: 10px;
  left: 20px;
  box-shadow: rgba(255, 255, 255, 0.5) 0px 0px 10px 10px, rgba(255, 255, 255, 0.5) 0px 0px 30px 20px;
}

.button .bloom-container:hover {
  transform: scale(1.1);
}

.button .bloom-container:hover .button-container-main .button-glass {
  transform: translate(0%, -40%);
}

.button .bloom-container:hover .button-container-main .button-inner .front .svg {
  opacity: 1;
  filter: drop-shadow(0 0 10px white);
}

.button .bloom-container:active {
  transform: scale(0.7);
}

.button .bloom-container:active .button-container-main .button-inner {
  transform: scale(1.2);
}
</style>

<style>

.btn {
  font-size: 1.2rem;
  padding: 1rem 2.5rem;
  border: none;
  outline: none;
  border-radius: 0.4rem;
  cursor: pointer;
  text-transform: uppercase;
  background-color: rgb(14, 14, 26);
  color: rgb(234, 234, 234);
  font-weight: 700;
  transition: 0.6s;
  box-shadow: 0px 0px 60px #1f4c65;
  -webkit-box-reflect: below 10px linear-gradient(to bottom, rgba(0,0,0,0.0), rgba(0,0,0,0.4));
}

.btn:active {
  scale: 0.92;
}

.btn:hover {
  background: rgb(2,29,78);
  background: linear-gradient(270deg, rgba(2, 29, 78, 0.681) 0%, rgba(31, 215, 232, 0.873) 60%);
  color: rgb(4, 4, 38);
}




</style>

<style>
.upload-area {
  width: 8vw;
  top: 50vh;
  margin: 20px auto;
  padding: 20px;
  border: 2px dashed #68f0ff;
  border-radius: 15%;
  display: flex;
  position: absolute;right: 50%;transform :translateX(50%);top:20vh;
  background-color: #aeffe57b;
}

.upload-area:hover {
  background-color: #f1f1f1;
}

.upload-btn {
  font-size: 16px;
  color: #fff;
  background-color: #446f9d;
  border: none;
  position: fixed;
  width: 8vw;

  border-radius: 4px;
  cursor: pointer;
}

.upload-btn:hover {
  background-color: #0056b3;
}
</style>


<style>

.uiverse {
  --duration: 7s;
  --easing: linear;
  --c-color-1: rgba(255, 163, 26, .7);
  --c-color-2: #1a23ff;
  --c-color-3: #e21bda;
  --c-color-4: rgba(255, 232, 26, .7);
  --c-shadow: rgba(255, 223, 87, .5);
  --c-shadow-inset-top: rgba(255, 223, 52, .9);
  --c-shadow-inset-bottom: rgba(255, 250, 215, .8);
  --c-radial-inner: #ffd215;
  --c-radial-outer: #fff172;
  --c-color: #fff;
  -webkit-tap-highlight-color: transparent;
  -webkit-appearance: none;
  outline: none;
  position: relative;
  cursor: pointer;
  border: none;
  display: table;
  border-radius: 24px;
  padding: 0;
  margin: 0;
  text-align: center;
  font-weight: 600;
  font-size: 16px;
  letter-spacing: 0.02em;
  line-height: 1.5;
  color: var(--c-color);
  background: radial-gradient(circle, var(--c-radial-inner), var(--c-radial-outer) 80%);
  box-shadow: 0 0 14px var(--c-shadow);
}

.uiverse:before {
  content: '';
  pointer-events: none;
  position: absolute;
  z-index: 3;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  border-radius: 24px;
  box-shadow: inset 0 3px 12px var(--c-shadow-inset-top), inset 0 -3px 4px var(--c-shadow-inset-bottom);
}

.uiverse .wrapper {
  -webkit-mask-image: -webkit-radial-gradient(white, black);
  overflow: hidden;
  border-radius: 24px;
  padding: 12px 0;
}

.uiverse .wrapper span {
  display: inline-block;
  position: relative;
  z-index: 1;
}

.uiverse .wrapper .circle {
  position: absolute;
  left: 0;
  top: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  filter: blur(var(--blur, 8px));
  background: var(--background, transparent);
  transform: translate(var(--x, 0), var(--y, 0)) translateZ(0);
  animation: var(--animation, none) var(--duration) var(--easing) infinite;
}

.uiverse .wrapper .circle.circle-1, .uiverse .wrapper .circle.circle-9, .uiverse .wrapper .circle.circle-10 {
  --background: var(--c-color-4);
}

.uiverse .wrapper .circle.circle-3, .uiverse .wrapper .circle.circle-4 {
  --background: var(--c-color-2);
  --blur: 14px;
}

.uiverse .wrapper .circle.circle-5, .uiverse .wrapper .circle.circle-6 {
  --background: var(--c-color-3);
  --blur: 16px;
}

.uiverse .wrapper .circle.circle-2, .uiverse .wrapper .circle.circle-7, .uiverse .wrapper .circle.circle-8, .uiverse .wrapper .circle.circle-11, .uiverse .wrapper .circle.circle-12 {
  --background: var(--c-color-1);
  --blur: 12px;
}

.uiverse .wrapper .circle.circle-1 {
  --x: 0;
  --y: -40px;
  --animation: circle-1;
}

.uiverse .wrapper .circle.circle-2 {
  --x: 92px;
  --y: 8px;
  --animation: circle-2;
}

.uiverse .wrapper .circle.circle-3 {
  --x: -12px;
  --y: -12px;
  --animation: circle-3;
}

.uiverse .wrapper .circle.circle-4 {
  --x: 80px;
  --y: -12px;
  --animation: circle-4;
}

.uiverse .wrapper .circle.circle-5 {
  --x: 12px;
  --y: -4px;
  --animation: circle-5;
}

.uiverse .wrapper .circle.circle-6 {
  --x: 56px;
  --y: 16px;
  --animation: circle-6;
}

.uiverse .wrapper .circle.circle-7 {
  --x: 8px;
  --y: 28px;
  --animation: circle-7;
}

.uiverse .wrapper .circle.circle-8 {
  --x: 28px;
  --y: -4px;
  --animation: circle-8;
}

.uiverse .wrapper .circle.circle-9 {
  --x: 20px;
  --y: -12px;
  --animation: circle-9;
}

.uiverse .wrapper .circle.circle-10 {
  --x: 64px;
  --y: 16px;
  --animation: circle-10;
}

.uiverse .wrapper .circle.circle-11 {
  --x: 4px;
  --y: 4px;
  --animation: circle-11;
}

.uiverse .wrapper .circle.circle-12 {
  --blur: 14px;
  --x: 52px;
  --y: 4px;
  --animation: circle-12;
}

@keyframes circle-1 {
  33% {
    transform: translate(0px, 16px) translateZ(0);
  }

  66% {
    transform: translate(12px, 64px) translateZ(0);
  }
}

@keyframes circle-2 {
  33% {
    transform: translate(80px, -10px) translateZ(0);
  }

  66% {
    transform: translate(72px, -48px) translateZ(0);
  }
}

@keyframes circle-3 {
  33% {
    transform: translate(20px, 12px) translateZ(0);
  }

  66% {
    transform: translate(12px, 4px) translateZ(0);
  }
}

@keyframes circle-4 {
  33% {
    transform: translate(76px, -12px) translateZ(0);
  }

  66% {
    transform: translate(112px, -8px) translateZ(0);
  }
}

@keyframes circle-5 {
  33% {
    transform: translate(84px, 28px) translateZ(0);
  }

  66% {
    transform: translate(40px, -32px) translateZ(0);
  }
}

@keyframes circle-6 {
  33% {
    transform: translate(28px, -16px) translateZ(0);
  }

  66% {
    transform: translate(76px, -56px) translateZ(0);
  }
}

@keyframes circle-7 {
  33% {
    transform: translate(8px, 28px) translateZ(0);
  }

  66% {
    transform: translate(20px, -60px) translateZ(0);
  }
}

@keyframes circle-8 {
  33% {
    transform: translate(32px, -4px) translateZ(0);
  }

  66% {
    transform: translate(56px, -20px) translateZ(0);
  }
}

@keyframes circle-9 {
  33% {
    transform: translate(20px, -12px) translateZ(0);
  }

  66% {
    transform: translate(80px, -8px) translateZ(0);
  }
}

@keyframes circle-10 {
  33% {
    transform: translate(68px, 20px) translateZ(0);
  }

  66% {
    transform: translate(100px, 28px) translateZ(0);
  }
}

@keyframes circle-11 {
  33% {
    transform: translate(4px, 4px) translateZ(0);
  }

  66% {
    transform: translate(68px, 20px) translateZ(0);
  }
}

@keyframes circle-12 {
  33% {
    transform: translate(56px, 0px) translateZ(0);
  }

  66% {
    transform: translate(60px, -32px) translateZ(0);
  }
}

</style>

<style scoped>
.card {
  width: 100%;
  max-width: 290px;
  height: 70px;
  background: #353535;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: left;
  backdrop-filter: blur(10px);
  transition: 0.5s ease-in-out;
}

.card:hover {
  cursor: pointer;
  transform: scale(1.05);
}

.img {
  width: 50px;
  height: 50px;
  margin-left: 10px;
  border-radius: 10px;
  background: linear-gradient(#d7cfcf, #666db7);
}

.card:hover > .img {
  transition: 0.5s ease-in-out;
  background: linear-gradient(#9198e5, #fffafa);
}

.textBox {
  width: calc(100% - 90px);
  margin-left: 10px;
  color: white;
  font-family: 'Poppins' sans-serif;
}

.textContent {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.span {
  font-size: 10px;
}

.h1 {
  position: relative;
  top: 2vh;
  font-size: 16px;
  font-weight: bold;
}

.p {
  font-size: 12px;
  font-weight: lighter;
}


</style>