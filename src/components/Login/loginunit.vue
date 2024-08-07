<template>
  <p class="logintxt">QChat</p>
  <img class="head" id="head" :src="'https://api.scustu.cn/user/'+id+'/head'">
  <form class="inputarea">
    <input type="text" id="account" name="account" placeholder="请输入账号" class="put">
    <input type="password" id="pwd" name="pwd" placeholder="请输入密码" class="put">
    <button class="post">Login</button>
  </form>
  <div class="lines" style="left: 4vw;"></div>
  <div class="lines" style="left: 20vw;"></div>
  <div class="rg">
    Register for a new account?
    <button style="position: absolute;right: 0vw;top:25vh;width: 10vh;height: 5vh">regist</button>
  </div>
  
</template>


<script >

export default {
  name: 'LoginUnit',
  props: {
    // 接收父组件传来的参数
    
  },
  data()
  {
    return {
      id: 'login',
    } 
  },
  methods:{
    
    afterHtmx(){
      this.$nextTick(()=>{
        console.log('htmx');
      })
    }
    
  },
  
  mounted(){
    console.log("mounted")
  },
  beforeUnmount(){
    console.log("beforeDestroy")
  },
  
  
  
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
  font-family: Georgia, 'Times New Roman', Times, serif;
  color: transparent;
  font-family: 'Arial';
  -webkit-text-fill-color: transparent;
  animation: move 5s infinite ease-in-out;
}
.head{
  height: 180px;
  width: 180px;
  background-color: #f0f2f5;
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

.post{
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 10vw;
  height: 50px;
  background: linear-gradient(90deg,  #24aadb, #ffdada,#ff88c3,#e87ef6,#f8bfbf,#24aadb);
  background-size: 200% 100%;
  color: #000000;
  border-radius: 10px;
  border: 3px rgb(0, 0, 0) solid;
  font-family: Georgia, 'Times New Roman', Times, serif;
  box-shadow: 2vh,1vh,8vh #7cb5fb;
  cursor: pointer;
  font-size: 30px;
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
  height: 30vh;
  backdrop-filter: blur(10px);
  background-color: #f7bad33d;
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



</style>


