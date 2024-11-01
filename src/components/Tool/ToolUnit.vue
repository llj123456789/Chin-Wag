
<template>
    <button hx-get="https://api.scustu.cn/girl/beautiful" hx-target="#output1" hx-swap="innerHtml" >随机获取美女图片一张</button>
    <br><br>OUTPUT：<div id="output1" ></div>

    <button hx-get="https://api.scustu.cn/yiyan" hx-target="#output2" hx-swap="innerHtml" @htmx:afterRequest="afterHtmx">随机获取每日一言</button>
    
    <br><br>OUTPUT：<div id="output2" ></div>
</template>
    <script >
    
    
    export default {
      name: 'ToolUnit',

      data()
      {
        return {
          
        } 
      },
      methods:{
        
        afterHtmx(event) {
      const response = event.detail.xhr.responseText;
      const data = JSON.parse(response);

      const formattedOutput = `
        <p><strong>每日一言:</strong> ${data.hitokoto}</p>
        <p><strong>出处:</strong> ${data.from}</p>
        <p><strong>创建者:</strong> ${data.creator}</p>
        <p><strong>创建时间:</strong> ${new Date(data.created_at * 1000).toLocaleString()}</p>
      `;

      document.getElementById('output2').innerHTML = formattedOutput;
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
    h3 {
      margin: 40px 0 0;
    }
    ul {
      list-style-type: none;
      padding: 0;
    }
    li {
      display: inline-block;
      margin: 0 10px;
    }
    a {
      color: #42b983;
    }
    </style>
    
    
    