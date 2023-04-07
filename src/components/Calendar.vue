<template>
      <div class="modal fade" id="redactionModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-fullscreen">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel" >Редактировать заметку</h1>
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
          <div class="modal-footer">
            <button type="button"  class="btn btn-primary" @click="redactiononecalendar()">Сохранить изменения</button>
          </div>
          </div>
        </div>
      </div>
    </div>
    <v-container >
        <p class="calendar-text">{{ date.getDate() + " " + months[date.getMonth()] + " " +new Date(this.year,date.getMonth(),date.getDate()).toLocaleString('ru', {weekday: 'short'}) }}</p>
        <div class="block" >
            <v-btn icon color="info" @click="back_button" v-if="numcalendar != -1">
            <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <div v-for="(month,index) in store.monthlist.slice(store.start_point,store.end_point)">
            <p class="calendar-text" >{{month["dayoftheweek"]}}</p>
            <p class="calendar-text test" @click="click_data(index) " :class="[ month['monthcount'] == months[date.getMonth()].toLocaleLowerCase() && month['status'] !== true ?  month['monthcount'] !== months[date.getMonth()].toLocaleLowerCase() : 'color-test']">{{month["calendarnumber"]}}</p>
        </div>
            <v-btn icon color="info" @click="next_button() " v-if="numcalendar != 11">
            <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
            </div>
        <br>
        <p class="centertext" v-if="monthlistone.length !== 0">{{  `Выбрано ${monthlistone['calendarnumber']} ${monthlistone['monthcount']} ${monthlistone.dayoftheweek}`   }}</p>
        <div class="notinfo" v-show="store.data_list_user.length === 0">
        <img src="../../img/notfound2.png" style="margin-bottom: 40px; width: 250px;"   alt="">
        <p style="text-align: center;  font-family: 'Balsamiq Sans'; font-size: 25px; text-align: center;">Дел не запланированно :(</p>


      </div>
      
            <div class="container" style="justify-content: center;" v-show="store.data_list_user.length !== 0">
      <v-card style="margin: 20px ;" class="mx-auto" max-width="344" v-for="todo_lists,index in store.data_list_user">
        <v-img style="border-radius: 5px;" :src="todo_lists.image" height="140px" cover>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="card-circle" size="small" color="surface-variant"
              variant="text" icon="mdi-pencil" data-bs-toggle="modal" data-bs-target="#redactionModal" @click="store.redaction_index=index"></v-btn>

            <v-btn class="card-circle" size="small" color="surface-variant"
              variant="text" icon="mdi-close" @click="store.deletenotecalendar(index)"></v-btn>

            <v-btn class="card-circle" size="small" color="surface-variant"
              variant="text" icon="mdi-share-variant" @click="store.share_note_calendar(index)"></v-btn>
          </v-card-actions>

        </v-img>

        <v-card-title>
          {{ todo_lists.title }}
        </v-card-title>

        <v-card :text="todo_lists.body">

        </v-card>



      </v-card>
    </div>

     
    </v-container>
</template>

<script>
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
    monthlistone : "",
    slides: [
        'Пусть',
        'все будет',
        'хорошо :)',
      ],
    count : 0,
    counter : 0,
    month: new Date().getMonth(),    
    year: new Date().getFullYear(), 
    date: new Date(),
    numcalendar : 1,
    months : ["Января", "Февраля", "Марта", "Апреля", "Май", "Июня", 
                        "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"],
    months_ : ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", 
            "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
    };
  },
  methods: {
        calendar(){
            this.store.monthlist = []
            let calendar_count = new Date(this.year, this.month + this.numcalendar, 0).getDate();
            var myDate = new Date();
            var countdaycalendar = myDate.getDate() 
            for (let i = 1; i <= calendar_count; i++) {
                this.store.monthlist.push({calendarnumber:i,dayoftheweek:new Date(this.year,this.date.getMonth() + this.numcalendar - 1,i).toLocaleString('ru', {weekday: 'short'}),status:countdaycalendar===i,monthcount : this.months[this.month+this.numcalendar-1].toLocaleLowerCase(),calendar:this.month+this.numcalendar})
            }
        },
        next_button(){
            this.store.start_point=this.store.end_point,this.store.end_point=this.store.start_point+7
            this.counter += 1
            if (this.counter == Math.floor( this.store.monthlist.length/7)){
                    this.counter = 0 
                    this.numcalendar = this.numcalendar + 1
                    this.calendar()
                    this.store.start_point = 0
                    this.store.end_point = 7
            }
        },
        back_button(){
            this.store.start_point=this.store.start_point-7,this.store.end_point=this.store.start_point+7
            if (this.store.end_point === 0 ){
                this.numcalendar = this.numcalendar - 1
                    this.calendar()
                    this.store.start_point = 0
                    this.store.end_point = 7
            }
        },
        click_data(index){
            this.store.data_list_user = []
            this.monthlistone=this.store.monthlist.slice(this.store.start_point,this.store.end_point)[index]
            let len_day = this.monthlistone["calendarnumber"].toString().length;
            let len_month = this.monthlistone["calendar"].toString().length;
            if (Number(len_day) === 1){len_day = "0"+`${this.monthlistone["calendarnumber"]}`} else {len_day = `${this.monthlistone["calendarnumber"]}` }
            if (Number(len_month) === 1){len_month = "0"+`${this.monthlistone["calendar"]}`} else {len_month = `${this.monthlistone["calendar"]}` }
            let status = this.store.todo_list.filter((element) => {
                return element.createdAt.slice(5,7) === len_month && element.createdAt.slice(8,10) === len_day
            })
            if (status !== undefined){
                console.log(status)
                this.store.data_list_user = status
                this.store.update_calendar = index
            }
        },
        async redactiononecalendar(){

          if (this.store.todos_name_redaction.length == 0) {this.store.todos_name_redaction = this.store.todo_list[this.store.redaction_index].title} else {this.store.todos_name_redaction = this.store.todos_name_redaction}
          if (this.store.todos_description_redaction.length == 0) {this.store.todos_description_redaction = this.store.todo_list[this.store.redaction_index].body} else {this.store.todos_description_redaction = this.store.todos_description_redaction}

          const headers = new Headers();
          headers.append("Content-Type", "application/json");
          headers.append("Authorization", `Bearer ${this.store.tokens.accessToken}`);

          const body = JSON.stringify({
            userDetail: {
              note: {
                user_id :  `${this.store.user.user_id}`,
                note_id : `${this.store.data_list_user[this.store.redaction_index].id}`,
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
          let update = this.store.update_calendar
          this.click_data(Number(update))
          return data
    },

        
  },
  created(){
    this.calendar()
  }

}

  
</script>

<style>

    .calendar-text{
        font-family: 'Balsamiq Sans';
        text-align: center;
    }
    .test{
        margin: 15px;
        text-align: center;
    }

    .block{
        display: flex;
        justify-content: center;
        margin-right: auto;
    }

    .buttons{
        width: 80px;
        height: 80px;
        background-color: black;
        border-radius: 50%;
        margin: 20px;
        color: #fff;
        font-family: 'Balsamiq Sans';font-size: 30px;
    }
    .max{
        max-width: 700px;
    }

    .centertext{
        text-align: center;
    }

    .color-test{
        color: red;
    }
    
</style>
