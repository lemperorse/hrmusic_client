<template>
<q-page class=" bg-profile pt-6">
 
      <div class="flex  pr-6 ">
          <q-btn size="xl" flat color="red" icon="west"   @click="$router.go(-1)" />
        <q-space />
        <div class="text-right">
            <h1 :class="t"  class="text-3xl font-bold">Setting</h1>
            <span :class="t"  >Config Application</span>
        </div> 
    </div>

    <div class="q-pa-md rounded">
        <q-list :dark="dark" bordered>
            <q-item clickable v-ripple @click="switchDark">
                <q-item-section>
                    <span v-if="!dark">Dark Mode</span>
                    <span v-else>Light Mode</span>
                </q-item-section>
                <q-item-section avatar>
                    <q-icon color="primary" name="brightness_medium" />
                </q-item-section>
            </q-item> 
            <q-separator />
            <q-item clickable v-ripple>
                <q-item-section>Logout</q-item-section>
                <q-item-section avatar>
                    <q-icon color="red" name="logout" />
                </q-item-section>
            </q-item>

        </q-list>
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

    private dark: boolean = Core.DARK
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

}
</script>

<style>

</style>
