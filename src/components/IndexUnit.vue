
<template>
    <!--<button hx-get="logo.txt" hx-target="#output" @htmx:afterRequest="afterHtmx">Fetch Data</button>
    <div id="output" >data</div>-->
    <h3 class="lead-text">欢迎使用<br>Chin-Wag<br>一个集成网站</h3>
    
    <p class="golden-text">为什么用我们的网站？
    <br>我们的网站是一个集成网站，可以让你在一个网站上完成所有的事情<br>不需要来回切换网站，节省时间。
    convenience method,<br>
    easy to use,<br>
    save time,<br>
    convenient to use.
    </p>
    <div class="grids">
      <div>
          <h4>who an I?</h4>
          <p>我是一个学生，我喜欢编程，我喜欢学习，我喜欢挑战，我喜欢创新。</p>
      </div>
    </div>
    
</template>


    <script >
    
    
    export default {
      name: 'IndexUnit',
      data()
      {
        return {
          
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
    @import url('https://fonts.googleapis.com/css2?family=Lobster&display=swap');
.grids{
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 10px;
}
.lead-text {
    position: relative;
    font-size: 6vh;
    font-family: 'Lobster', cursive;
    color: white;
}

.golden-text {
    font-family: 'Lobster', cursive;
    color: transparent;
    background: linear-gradient(90deg, #03ff0b, #572dc8, #ffd900, #ff0000, #ff00f7, #0000ff, #00ff00);
    background-size: 200% 200%;
    animation: gold-glow 3s linear infinite;
    -webkit-background-clip: text;
}
@keyframes gold-glow{
  0% {
    background-position: 0% 50%;
}
50% {
    background-position: 100% 50%;
}

100% {
    background-position: 0% 50%;
}
}
    </style>
    
    
    