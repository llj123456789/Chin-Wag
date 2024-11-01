
<template>
  
  <div>
    <p style="color: brown;font-size: larger;">chatRobot</p>
      <div class="chat-window" ref="chatWindow">
        <div v-for="(msg,index) in messages" :key="index" >
          <div v-if="msg.type === 'text'" >
            <div v-if="msg.sender==='me'" style="width: 50%;transform: translateX(90%);">
              <div style="display: flex; align-items: center; justify-content: flex-end; width: 100%;">
                <!-- 消息内容 -->
                <span style="background-color:aquamarine; text-align: center; margin-right: 10px;">{{ msg.content }}</span>
                <!-- 头像 -->
                <img :src="headUrl" style="width: 60px; border-radius: 50%;" />
              </div>
            </div>
            <div v-if="msg.sender !=='me'"  style="width: 50%;transform: translateX(0%);">
              <div style="display: flex; align-items: center; justify-content: flex-start; width: 100%;">
                <!-- 头像 -->
                <img  :src="robotUrl" style="width: 60px;;border-radius: 50%;margin-right: 10px;left: 0%;" />
                <!-- 消息内容 -->
                <span style="background-color:aliceblue; text-align: center; ">{{ msg.content }}</span>
              </div>
            </div>
          </div>
          <div v-else-if="msg.type === 'image'">
            <div v-if="msg.sender==='me'" style="width: 50%;transform: translateX(90%);">
              <div style="display: flex; align-items: center; justify-content: flex-end; width: 100%;">
                <!-- 消息内容 -->
                <img :src="msg.content" style="width: 100px; border-radius: 10%;" />
                <!-- 头像 -->
                <img :src="headUrl" style="width: 60px; border-radius: 50%;" />
              </div>
            </div>
          </div>
          <div v-else-if="msg.type === 'link'">
            <div v-if="msg.sender==='me'" style="width: 50%;transform: translateX(90%);">
              <div style="display: flex; align-items: center; justify-content: flex-end; width: 100%;">
                <!-- 消息内容 -->
                <a :href="msg.content" style="background-color: #7feaff; text-align: center; margin-right: 10px;">{{ msg.content }}</a>
                <!-- 头像 -->
                <img :src="headUrl" style="width: 60px; border-radius: 50%;" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <textarea v-model="message" class="textInput" id="textInput" placeholder="请输入.."></textarea>
      <button id="send_m" @click="send">发送</button>
      <div id="load_img">
        <input id="loadImg" type="file" @change="handleImageUpload" accept="image/*" style="display: none;">
        <img id="load_img_button" src="https://scustu.cn/image/share.png" @click="triggerImgUpload">
      </div>
      
  </div>
    
</template>
  <script >
  import axios from 'axios';

  
  export default {
    name: 'FriendUnit',
    
    data()
    {
      return {
        message: '',
        messages: [],
        headUrl: '',
        image:'',
        robotUrl: 'http://q2.qlogo.cn/headimg_dl?dst_uin=2041584846&spec=100',
       
      } 
    },
    methods:{
      
      afterHtmx(){
        this.$nextTick(()=>{
          console.log('htmx');
        })
      },
      triggerImgUpload(){
        document.getElementById('loadImg').click();
      },
      handleImageUpload(e){
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
          const imageSrc= e.target.result;
          this.image = imageSrc;
        };
        reader.readAsDataURL(file);
      },
      send(){
        if(this.message === '' && this.image === ''){
          return;
        }
        let msgType = 'text';
        if(this.isIMageURL(this.message)){
          msgType = 'image';
        }else if(this.isURL(this.message)){
          msgType = 'link';
        }
        if(this.image !== '')
        {
          this.messages.push({
            type: 'image',
            content: this.image,
            sender: 'me'
          });
        }
        if(this.message !== '')
        {
          this.messages.push({
            type: msgType,
            content: this.message,
            sender: 'me'
          });
        }
        

        this.scrollToBottom();


        const formData = new FormData();
        if(this.message !== '')
        {
          formData.append('message', this.message);
        }else
        {
          formData.append('message', "Nonex86");
        }
        if(this.image !== '')
        {
          formData.append('image', this.image);
        }else
        {
          formData.append('image', "Nonex86");
        }
        

        axios.post('https://api.scustu.cn/robot_post', formData,{
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then((res)=>{
          var data = res.data;
          var text=data.message;
          var image=data.image;
          
          if(image !== '')
          {
            this.messages.push({
              type: 'text',
              content: image,
              sender: 'robot'
            });
            this.scrollToBottom();
          }
          if(text !== '')
          {
            this.messages.push({
              type: 'text',
              content: text,
              sender: 'robot'
            });
            this.scrollToBottom();
          }
        })
        
        

        this.message = '';
        this.image = '';
        
      },
      receive(){
        axios.get('https://api.scustu.cn/robot_get')
        .then((res)=>{
          var data = res.data;
          console.log(data);
        })
      },
      isURL(str)
      {
        const pattern = new RegExp('^(https?:\\/\\/)?'+
        '((([a-zA-Z\\d]([a-zA-Z\\d-]*[a-zA-Z\\d])*)\\.)+[a-zA-Z]{2,}'+
        '|((\\d{1,3}\\.){3}\\d{1,3}))'+
        '(\\:\\d+)?(\\/[-a-zA-Z\\d%_.~+]*)*'+
        '(\\?[;&a-zA-Z\\d%_.~+=-]*)?'+
        '(\\#[-a-zA-Z\\d_]*)?$','i');
        return pattern.test(str);
      },
      isIMageURL(url)
      {
        return /\.(jpeg|jpg|gif|png)$/.test(url);
      },
      scrollToBottom() {
        this.$nextTick(() => {
          const chatWindow = this.$refs.chatWindow;
          chatWindow.scrollTop = chatWindow.scrollHeight;
        });
      },
      
    },
    
    mounted(){
      console.log("mounted");
      this.headUrl=this.$store.state.headUrl;
      this.messages=this.$store.state.messages;

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
    .textInput{
      position: absolute;
      bottom: 0;
      left: 0;
      width: 60%;
      height: 15%;
      margin: 0;

      padding: 10px;
      font-size: 16px;
      font-family: monospace;
      line-height: 1.5;

      background: none;
      border: 3px solid #910f0f;
      resize: none;
      white-space: pre-wrap;
      word-wrap: break-word;
      overflow: hidden;
    }
    .chat-window{
      position: absolute;
      top: 12%;
      left: 0;
      width: 100%;
      height: 60%;
      margin: 0;
      padding: 10px;
      font-size: 16px;
      font-family: monospace;
      line-height: 1.5;
      background: none;
      border: 3px solid #910f0f;
      resize: none;
      white-space: pre-wrap;
      word-wrap: break-word;
      overflow: scroll;
    }
    #send_m{
      position: absolute;
      bottom: 0;
      right: 1%;
      width: 15%;
      height: 20%;
      margin: 0;
      padding: 10px;
      font-size: 30px;
      font-family: monospace;
      font-weight: bolder;
      line-height: 1.5;
      background: none;
      border: 3px solid #910f0f;
      border-radius: 30%;
      resize: none;
      white-space: pre-wrap;
      word-wrap: break-word;
      overflow: hidden;
    }
    #load_img{
      position: absolute;
      bottom: 0;
      right: 16%;
      width: 10%;
      height: 15%;
      margin: 0;
      padding: 10px;
      font-size: 30px;
      font-family: monospace;
      font-weight: bolder;
      line-height: 1.5;
      background: none;
      border-radius: 30%;
      resize: none;
      white-space: pre-wrap;
      word-wrap: break-word;
      overflow: hidden;
    }
    #load_img_button{
      width: 100%;
      height: 100%;
      background-size: 100% 100%;
    }
    #load_img_button:hover{
     transform: scale(1.1);
    }
    #send_m:hover{
      background-color: #7feaff;
      color: white;
    }

</style>


    
    