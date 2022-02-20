<template>
<q-page class=" bg-profile pt-6">
 
      <div class="flex  pr-6 ">
          <q-btn size="xl" flat color="red" icon="west"   @click="$router.go(-1)" />
        <q-space />
        <div class="text-right">
            <h1 :class="t"  class="text-3xl font-bold">{{$l('ตั้งค่า','Setting')}}</h1>
            <span :class="t"  > {{$l('จัดการแอปพลิเคชัน','Config Application')}} </span>
        </div> 
    </div>

    <div class="q-pa-md rounded">
        <q-list :dark="dark" bordered>
            <q-item clickable v-ripple @click="switchDark">
                <q-item-section>
                    <span v-if="!dark"> {{$l('โหมดมืด','Dark Mode')}}</span>
                    <span v-else> {{$l('โหมดแสง','Light Mode')}}</span>
                </q-item-section>
                <q-item-section avatar>
                    <q-icon color="primary" name="brightness_medium" />
                </q-item-section>
            </q-item> 
             <q-item clickable v-ripple @click="confirm=true">
                <q-item-section> 
                    <span> {{$l('ภาษา','Language')}} </span>
                </q-item-section>
                <q-item-section avatar>
                    <q-icon color="orange" name="flag" />
                </q-item-section>
            </q-item> 
            <q-separator />
            <q-item clickable v-ripple>
                <q-item-section>{{$l('ออกจากระบบ','Logout')}}</q-item-section>
                <q-item-section avatar>
                    <q-icon color="red" name="logout" />
                </q-item-section>
            </q-item>

        </q-list>

        <q-dialog v-model="confirm"  >
            <q-card>
                <q-card-section class="row items-center">
                   <i class="em em-world_map text-4xl" aria-role="presentation" aria-label=""></i>
                    <span class="text-xl q-ml-sm">{{$l('เลือกภาษาของแอปพลิเคชัน','Choose Application Language')}}</span>
                </q-card-section>
                <q-card-actions align="right">
                    <q-btn @click="setLanguage('th')" flat label="ภาษาไทย" color="primary"  />
                    <q-btn @click="setLanguage('en')"  flat label="English" color="primary"  />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</q-page>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { bluetooth } from "../../plugins/ble";
import { Auth } from "../../store/auth";
import { Alert } from "../../store/alert";
import { Core } from "../../store/core";
 
@Component({
    components: {},
})
export default class Setting extends Vue {
    confirm:boolean = false
    private dark: boolean = Core.DARK

    $l(th:any,en:any){
        let lang = localStorage.getItem('lang')
        return (lang == 'th')?th:en
    }

    get t() {
        return (!this.dark) ? `text-black` : `text-white`
    }
    get bg() {
        return (!this.dark) ? `bg-black` : `bg-white`
    }
    get t_gray() {
        return (!this.dark) ? `text-gray-600` : `text-gray-300`
    }
    get t_gray_xl() {
        return (!this.dark) ? `text-black` : `text-gray-600`
    }

    async switchDark(){
        let dark = (this.dark)?`1`:`0`  
        await localStorage.setItem(`dark`,dark)
        await location.reload();
    }

        async logout() {
        await Auth.logout();
        await location.reload();
    }


    async setLanguage(lang:string){
        if(lang == 'th'){
            localStorage.setItem('lang','th')
        }else{
          localStorage.setItem('lang','en')
        }
        this.confirm = false;
        location.reload();
    }

}
</script>

<style>

</style>
