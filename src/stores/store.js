import { defineStore } from "pinia";
import bridge from "@vkontakte/vk-bridge";

export const useStore = defineStore("store", {
  state: () => {
    return {
      user: [],
      tokens : {},
      todos_name : "",
      todo_list : [],
      redaction_index : "" , 
      todos_description : "",
      todos_name_redaction : "",
      todos_description_redaction : "",
      backgrounds_user: [" https://cdn.vuetifyjs.com/images/cards/sunshine.jpg ", "https://cdn.vuetifyjs.com/images/carousel/sky.jpg", " https://cdn.vuetifyjs.com/images/cards/docks.jpg"],
      choice_img: 0,
      choice_img_redaction : 0,
      start_point : 0,
      end_point : 7,
      monthlist : [],
      data_list_user : [],
      update_calendar : "",
    };
  },
  actions: {
    close_app() {
      bridge
        .send("VKWebAppClose", {
          status: "success",
          payload: {
            name: "",
          },
        })
        .then((data) => {
          if (data.status) {
            // Событие отправлено
          }
        })
        .catch((error) => {
          // Ошибка
          console.log(error);
        });
    },
    async registration() {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");

      const body = JSON.stringify({
        userDetail: {
          firstName: `${this.user.first_name}`,
          surname: `${this.user.last_name}`,
          type: "id",
          value: `${this.user.user_id}`,
        },
      });

      const requestOptions = {
        method: "POST",
        headers,
        body,
        redirect: "follow",
      };

      let url = await fetch("/api/user/register", requestOptions)
      let data = await url.json()
      return data
    },

    async addnote() {
      if (this.todos_name.length > 0 && this.todos_description.length > 0){
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Authorization", `Bearer ${this.tokens.accessToken}`);

      const body = JSON.stringify({
        userDetail: {
          note: {
            user_id :  `${this.user.user_id}`,
            title : `${this.todos_name}`,
            body :  `${this.todos_description}`,
            image : `${this.backgrounds_user[this.choice_img]}`,
          }
        },
      });

      const requestOptions = {
        method: "POST",
        headers,
        body,
        redirect: "follow",
      };



      let url = await fetch("/api/note/add/", requestOptions)
      let data = await url.json()
      await this.getallnote()
      console.log(data)
      this.todos_description = ""
      this.todos_name = ""
      return data
      }
    },


    async getallnote() {
      this.todo_list = []
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Authorization", `Bearer ${this.tokens.accessToken}`);

      const body = JSON.stringify({
        userDetail: {
          note: {
            user_id :  `${this.user.user_id}`,
          }
        },
      });

      const requestOptions = {
        method: "POST",
        headers,
        body,
        redirect: "follow",
      };


      let url = await fetch("/api/note/all/", requestOptions)
      let data = await url.json()
      console.log(data)
      this.todo_list.push(...data)
      return data
    },

    async deletenote(index) {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Authorization", `Bearer ${this.tokens.accessToken}`);

      const body = JSON.stringify({
        userDetail: {
          note: {
            user_id :  `${this.user.user_id}`,
            note_id : `${this.todo_list[index].id}`
          }
        },
      });

      const requestOptions = {
        method: "POST",
        headers,
        body,
        redirect: "follow",
      };


      let url = await fetch("/api/note/delete/", requestOptions)
      let data = await url.json()
      await this.getallnote()
      return data
    },

    async deletenotecalendar(index) {

      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Authorization", `Bearer ${this.tokens.accessToken}`);

      const body = JSON.stringify({
        userDetail: {
          note: {
            user_id :  `${this.user.user_id}`,
            note_id : `${this.data_list_user[index].id}`
          }
        },
      });

      const requestOptions = {
        method: "POST",
        headers,
        body,
        redirect: "follow",
      };


      let url = await fetch("/api/note/delete/", requestOptions)
      let data = await url.json()
      this.data_list_user.splice(index,1)
      await this.getallnote()
      return data
    },

    
    async login() {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
  
        const body = JSON.stringify({
          userDetail: {
            firstName: `${this.user.first_name}`,
            surname: `${this.user.last_name}`,
            type: "id",
            value: `${this.user.user_id}`,
          },
        });

  
        const requestOptions = {
          method: "POST",
          headers,
          body,
          redirect: "follow",
        };
  
        let url = await fetch("/api/user/login", requestOptions)
        let data = url.json()
        return data
      },

      share_note_calendar(index){
        let message = `У меня новая заметка под названием "${this.data_list_user[index].title}" !\nПиши и свои заметки в приложении My Diary в ВКонтакте!`;
        bridge.send('VKWebAppShowWallPostBox', {
          'message': message,
              'attachments': 'photo225837092_457256137,https://vk.com/app51466583',
        })
      
      }
  },
});
