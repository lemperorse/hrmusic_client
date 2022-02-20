<template>
<q-item clickable tag="a" target="_blank" @click="$router.push(`${link}`)">
    <q-item-section v-if="icon" avatar> 
        <i :class="`${icon} text-xl`" aria-role="presentation" aria-label="TEAR-OFF CALENDAR"></i>
    </q-item-section>

    <q-item-section>
        <q-item-label class="text-yellow-500 font-semibold">{{$l(title_th,title)}}</q-item-label>
        <span :class="text_grey" class="text-xs"> {{$l(caption_th,caption)}}</span>
      
    </q-item-section>
</q-item>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Core } from '../store/core'
@Component
export default class EssentialLink extends Vue {
      private dark:boolean = Core.DARK
    @Prop({ type: String, required: true }) readonly title!: string;
    @Prop({ type: String, required: true }) readonly title_th!: string;
    @Prop({ type: String, default: '' }) readonly caption!: string;
    @Prop({ type: String, default: '' }) readonly caption_th!: string;
    @Prop({ type: String, default: '#' }) readonly link!: string;
    @Prop({ type: String, default: '' }) readonly icon!: string;
 $l(th:any,en:any){
        let lang = localStorage.getItem('lang')
        return (lang == 'th')?th:en
    }
   
     get t() {
        return (!this.dark) ? `text-black` : `text-white`
    }
    get bg() {
        return (this.dark) ? `bg-black` : `bg-white`
    }

    get text_grey() {
        return (this.dark) ? `text-gray-300` : `text-gray-500`
    }

     get text_orange() {
        return (this.dark) ? `text-yellow-500` : `text-gray-500`
    }

}
</script>
