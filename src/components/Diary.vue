<template>
  <v-container style="margin-top: 50px;">
    <div class="notinfo"  v-show="store.todo_list.length === 0" > 
      <img src="../../img/notfound.png" style="margin-bottom: 40px; width: 250px;" alt="">
      <p style="text-align: center;  font-family: 'Balsamiq Sans';  font-size: 25px; text-align: center;">Заметок нет :(
      </p>
    </div>
    <!-- Модальное окно -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-fullscreen">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Добавить заметку</h1>
            <button type="button" class="btn-close" style="padding-left: 50px;" data-bs-dismiss="modal"
              aria-label="Закрыть"  @click="store.choice_img = 0"></button>
          </div>
          <div class="modal-body">
            <v-text-field v-model="store.todos_name" label="Введите название"></v-text-field>
            <v-text-field v-model="store.todos_description" label="Введите описание"></v-text-field>
            <h1 style="margin: 20px;" class="modal-title fs-5" id="exampleModalLabel">Выберите изображение</h1>
            <v-card elevation="24" max-width="444" class="mx-auto">
              <v-carousel :continuous="false" :show-arrows="false" hide-delimiter-background delimiter-icon="mdi-square"
                height="300" v-model="store.choice_img">
                <v-carousel-item  v-for="(slide, i) in slides" :key="i">
                  <v-img :src="store.backgrounds_user[i]" cover height="100%" tile>
                    <div class="d-flex fill-height justify-center align-center">
                      <div style="color: aliceblue;" class="text-h2">
                        {{ slide }}
                      </div>
                    </div>
                  </v-img>
                </v-carousel-item>
              </v-carousel>
            </v-card>
          </div>
          <div class="modal-footer">
            <button type="button"  class="btn btn-primary" @click="store.addnote()">Сохранить изменения</button>
          </div>
        </div>
      </div>
    </div>
    <div class="container" style="justify-content: center;">
      <v-card style="margin: 20px ;" class="mx-auto" max-width="344" v-for="todo_lists,index in store.todo_list">
        <v-img style="border-radius: 5px;" :src="todo_lists.image" height="140px" cover>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="card-circle" size="small" color="surface-variant"
              variant="text" icon="mdi-pencil" data-bs-toggle="modal" data-bs-target="#redactionModal" @click="store.redaction_index=index"></v-btn>

            <v-btn class="card-circle" size="small" color="surface-variant"
              variant="text" icon="mdi-close" @click="store.deletenote(index)"></v-btn>
            
              <v-btn class="card-circle" size="small" color="surface-variant"
                variant="text" icon="mdi-share-variant" @click="share_note(index)"></v-btn>
              
          </v-card-actions>

        </v-img>

        <v-card-title>
          {{ todo_lists.title }}
        </v-card-title>

        <v-card :text="todo_lists.body">

        </v-card>



      </v-card>
    </div>

    <div class="modal fade" id="redactionModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-fullscreen">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel" @click="">Редактировать заметку</h1>
            <button type="button" class="btn-close" style="padding-left: 50px;" data-bs-dismiss="modal"
              aria-label="Закрыть" @click="store.choice_img = 0"></button>
          </div>
          <div class="modal-body">
            <v-text-field v-model="store.todos_name_redaction" label="Введите новое название"></v-text-field>
            <v-text-field v-model="store.todos_description_redaction" label="Введите новое описание"></v-text-field>
            <h1 style="margin: 20px;" class="modal-title fs-5" id="exampleModalLabel">Выберите новое изображение</h1>
            <v-card elevation="24" max-width="444" class="mx-auto">
              <v-carousel :continuous="false" :show-arrows="false" hide-delimiter-background delimiter-icon="mdi-square"
                height="300" v-model="store.choice_img_redaction">
                <v-carousel-item  v-for="(slide, i) in slides" :key="i">
                  <v-img :src="store.backgrounds_user[i]" cover height="100%" tile>
                    <div class="d-flex fill-height justify-center align-center">
                      <div style="color: aliceblue;" class="text-h2">
                        {{ slide }}
                      </div>
                    </div>
                  </v-img>
                </v-carousel-item>
              </v-carousel>
            </v-card>
          </div>
          <div class="modal-footer">
            <button type="button"  class="btn btn-primary" @click="redactionone()">Сохранить изменения</button>
          </div>
        </div>
      </div>
    </div>


    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"
      style="  display:flex;width: 80px; height: 80px; border-radius: 50%;  margin-left: auto; margin-right: auto; background-color: #75B2E9; border: none;">
      <svg width="40px" style="margin-left: auto; margin-right: auto; margin-bottom: auto; margin-top: auto;"
        height="40px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
        <path fill="#000000"
          d="M480 480V128a32 32 0 0 1 64 0v352h352a32 32 0 1 1 0 64H544v352a32 32 0 1 1-64 0V544H128a32 32 0 0 1 0-64h352z" />
      </svg>
    </button>


  </v-container>


</template>

<script>

import bridge from '@vkontakte/vk-bridge';
import { useStore } from '../stores/store'


export default {
  setup() {
    const store = useStore();
    return {
      store
    }
  },
  data() {
    return {
      slides: [
        'Пусть',
        'все будет',
        'хорошо :)',
      ],
    };
  },
  methods: {
    async redactionone(){
      if (this.store.todos_name_redaction.length == 0) {this.store.todos_name_redaction = this.store.todo_list[this.store.redaction_index].title} else {this.store.todos_name_redaction = this.store.todos_name_redaction}
      if (this.store.todos_description_redaction.length == 0) {this.store.todos_description_redaction = this.store.todo_list[this.store.redaction_index].body} else {this.store.todos_description_redaction = this.store.todos_description_redaction}

      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Authorization", `Bearer ${this.store.tokens.accessToken}`);

      const body = JSON.stringify({
        userDetail: {
          note: {
            user_id :  `${this.store.user.user_id}`,
            note_id : `${this.store.todo_list[this.store.redaction_index].id}`,
            title : `${this.store.todos_name_redaction}`,
            body : `${this.store.todos_description_redaction}`,
            image : `${this.store.backgrounds_user[this.store.choice_img_redaction]}`,
          }
        },
      });

      const requestOptions = {
        method: "POST",
        headers,
        body,
        redirect: "follow",
      };


      let url = await fetch("/api/note/edit/", requestOptions)
      let data = await url.json()

      await this.store.getallnote()
      this.store.todos_name_redaction = ""
      this.store.todos_description_redaction = ""
      return data
    },

    share_note(index){
        let message = `У меня новая заметка под названием "${this.store.todo_list[index].title}" !\nПиши и свои заметки в приложении My Diary в ВКонтакте!`;
        bridge.send('VKWebAppShowWallPostBox', {
          'message': message,
              'attachments': 'photo225837092_457256137,https://vk.com/app51466583',
        })
      
      }
    

    
  },

}

</script>

<style>



.card-m {
  margin: 10px 20px;
}

.circle {
  width: 40px;
  height: 40px;
  margin: 10px 7px;
  border-radius: 20px;
  /* background-color: #FF5370; */
  border: 5px solid #EFBF7F;

}

.block-menu {
  margin: 0px 5px;
  display: block ruby;
  width: 150px;
  height: 50px;
}

.img-block-menu {
  margin: 8px 8px;
  display: grid;
  width: 30px;
  height: 30px;
  color: #EFBF7F;
}

.btn-close {
  padding-left: 50px;
}

.notinfo {
  display: flow-root;
  width: 250px;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: auto;
  margin-right: auto;
}

/* .test2 {
  color: #EFBF7F;
} */

.card-circle{
  background-color: #EFBF7F; 
  width: 30px; 
  height: 30px;
}
</style>