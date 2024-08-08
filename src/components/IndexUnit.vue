
<template>
    <button hx-get="logo.txt" hx-target="#output" @htmx:afterRequest="afterHtmx">Fetch Data</button>
    <div id="output" >data</div>
    <img src="@/assets/logo.png">
    
    </template>
    <script >
    
    
    export default {
      name: 'IndexUnit',
      props: {
        msg: String
      },
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
    
    
    