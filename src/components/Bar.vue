
<template >
    <v-card 
      class="mx-auto" 
    >
      <v-layout>
        <v-app-bar
          color="primary"
          density="compact"
        >
          <template v-slot:prepend>
            <v-avatar color="surface-variant">
                <v-img :src=" store.user.img"></v-img>
            </v-avatar>
          </template>
  
          <v-app-bar-title>{{`${store.user.first_name} ${store.user.last_name} `}}</v-app-bar-title>
  

            <v-btn   icon >
              <v-icon @click="store.close_app()">mdi-cancel</v-icon>
            </v-btn>
          </v-app-bar>

          <!-- <v-icon icon="md:home"></v-icon> -->

        <v-main>
        </v-main>
      </v-layout>
    </v-card>
</template>

<script>

import bridge from '@vkontakte/vk-bridge';
import { useStore } from '../stores/store'

export default {
  setup(){
    const store = useStore();
    return {
      store
    }
  },
  
data() {
  return {
    img : "",
    person : {},
    menu : ['Выйти','Рассказать Друзьям'],
    value : "",
  };
},
methods: {
  async vkcreateuser(){
    bridge
    .send('VKWebAppGetUserInfo')
    .then(async data => {
      this.store.user = {user_id : data.id , first_name: data.first_name , last_name : data.last_name , img : data.photo_200}
      console.log(this.store.user)
      const login = await this.store.login()
      if(!login.success){
        const reg = await this.store.registration()
        this.store.tokens = {accessToken : reg.accessToken,refreshToken:reg.refreshToken}
        console.log(this.store.tokens)
        await this.store.getallnote()
      }
      else{
        this.store.tokens = {accessToken : login.accessToken,refreshToken:login.refreshToken}
        console.log(this.store.tokens)
        await this.store.getallnote()
      }

    })
    .catch(error => {
    });


  }
  
  
},

created(){
  this.vkcreateuser()
  bridge.send('VKWebAppGetAuthToken', { 
        app_id: 51466583, 
        scope: 'messages'
        })
        .then((data) => { 
          if (data.access_token) {
            console.log(data.access_token)
          }
        })
        .catch((error) => {
          // Ошибка
          console.log(error);
        });
}
}
</script>

<style>
select {
      background-color: none;
      width: 140px;
      height: 35px;
      font-size: 18px;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      }
      select::-ms-expand { 
      display: none; 
      }
</style>