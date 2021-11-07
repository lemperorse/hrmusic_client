<template>
<q-page class=" pt-6  bg-goal">
  <div class="flex  pr-6 ">
          <q-btn size="xl" flat color="red" icon="west"   @click="$router.go(-1)" />
        <q-space />
        <div class="text-right">
            <h1 :class="t"  class="text-3xl font-bold"> About</h1>
            <span :class="t"  >Application Info data</span>
        </div>
    </div>
    <div :class="bg" class="flex flex-col justify-center items-center  shadow-4xl mt-10">
        <div>
          
            <i class="em em-gift_heart text-6xl" aria-role="presentation" aria-label="HEART WITH RIBBON"></i>
        </div>
        <h1 :class="t"  class="text-3xl font-bold">Heart Exercise</h1>
        <span :class="t" >Application for exercise with music</span>
        <span :class="t"  class="mt-4 font-bold">Version Beta 1.0</span>
         <span :class="t"  class="mt-4 font-bold">Copyright 2021 © Nattapon Kumyaito</span>
    </div>

</q-page>
</template>

<script>

</script><script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Core } from '../../store/core'
@Component({
    components: {}
})
export default class PageIndex extends Vue {
 get dark(){
      return Core.DARK
    }
    get t(){
        return (!this.dark)?`text-black`:`text-white`
    }
    get bg(){
        return (this.dark)?`bg-black`:`bg-white`
    }
    get t_gray(){
        return (!this.dark)?`text-gray-600`:`text-gray-300`
    }
    get t_gray_xl(){
        return (!this.dark)?`text-black`:`text-gray-600`
    }
    
};
</script>

<style>
.bg-goal {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='800' height='1300' preserveAspectRatio='none' viewBox='0 0 800 1300'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1009%26quot%3b)' fill='none'%3e%3cpath d='M271.24 18.99L283.51 22.64 282.64 35.42 294.92 39.07 294.05 51.85 306.32 55.5 305.45 68.28M264.66 23.55L276.94 27.2 276.07 39.98 288.34 43.63 287.48 56.41 299.75 60.06 298.88 72.84M258.09 28.11L270.37 31.77 269.5 44.54 281.77 48.2 280.9 60.97 293.18 64.62 292.31 77.4' stroke='%23d3b714' stroke-width='1.66' stroke-dasharray='4%2c 4'%3e%3c/path%3e%3crect width='265.6' height='265.6' clip-path='url(%26quot%3b%23SvgjsClipPath1010%26quot%3b)' x='119.78' y='832.15' fill='url(%23SvgjsPattern1011)' transform='rotate(314.88%2c 252.58%2c 964.95)'%3e%3c/rect%3e%3crect width='394.44' height='394.44' clip-path='url(%26quot%3b%23SvgjsClipPath1012%26quot%3b)' x='37.07' y='53.43' fill='url(%23SvgjsPattern1013)' transform='rotate(250.7%2c 234.29%2c 250.65)'%3e%3c/rect%3e%3crect width='506.16' height='506.16' clip-path='url(%26quot%3b%23SvgjsClipPath1014%26quot%3b)' x='119' y='993.13' fill='url(%23SvgjsPattern1015)' transform='rotate(343.54%2c 372.08%2c 1246.21)'%3e%3c/rect%3e%3crect width='347.36' height='347.36' clip-path='url(%26quot%3b%23SvgjsClipPath1016%26quot%3b)' x='-30.38' y='950.87' fill='url(%23SvgjsPattern1017)' transform='rotate(77.45%2c 143.3%2c 1124.55)'%3e%3c/rect%3e%3cpath d='M659.66 280.71L651.18 271.12 658.67 260.74 650.18 251.15 657.68 240.76 649.19 231.17 656.68 220.79M667.66 280.31L659.17 270.72 666.66 260.34 658.17 250.75 665.67 240.36 657.18 230.77 664.67 220.39M675.65 279.92L667.16 270.33 674.65 259.94 666.16 250.35 673.66 239.97 665.17 230.38 672.66 219.99' stroke='%23d3b714' stroke-width='1' stroke-dasharray='4%2c 4'%3e%3c/path%3e%3ccircle r='66.66666666666667' cx='5.66' cy='798.9' fill='rgba(90%2c 228%2c 232%2c 1)'%3e%3c/circle%3e%3ccircle r='66.66666666666667' cx='341.39' cy='441.87' stroke='rgba(144%2c 107%2c 232%2c 1)' stroke-width='1.88' stroke-dasharray='4%2c 4'%3e%3c/circle%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1009'%3e%3crect width='800' height='1300' fill='white'%3e%3c/rect%3e%3c/mask%3e%3cpattern x='0' y='0' width='265.6' height='13.28' patternUnits='userSpaceOnUse' id='SvgjsPattern1011'%3e%3crect width='265.6' height='6.64' x='0' y='0' fill='%23e73635'%3e%3c/rect%3e%3crect width='265.6' height='6.64' x='0' y='6.64' fill='rgba(0%2c 0%2c 0%2c 0)'%3e%3c/rect%3e%3c/pattern%3e%3cclipPath id='SvgjsClipPath1010'%3e%3ccircle r='66.4' cx='252.58' cy='964.95'%3e%3c/circle%3e%3c/clipPath%3e%3cpattern x='0' y='0' width='10.38' height='10.38' patternUnits='userSpaceOnUse' id='SvgjsPattern1013'%3e%3cpath d='M5.19 1L5.19 9.38M1 5.19L9.38 5.19' stroke='%23037b0b' fill='none' stroke-width='2.77'%3e%3c/path%3e%3c/pattern%3e%3cclipPath id='SvgjsClipPath1012'%3e%3ccircle r='98.61' cx='234.29' cy='250.65'%3e%3c/circle%3e%3c/clipPath%3e%3cpattern x='0' y='0' width='13.32' height='13.32' patternUnits='userSpaceOnUse' id='SvgjsPattern1015'%3e%3cpath d='M6.66 1L6.66 12.32M1 6.66L12.32 6.66' stroke='%23d3b714' fill='none' stroke-width='1.12'%3e%3c/path%3e%3c/pattern%3e%3cclipPath id='SvgjsClipPath1014'%3e%3ccircle r='126.54' cx='372.08' cy='1246.21'%3e%3c/circle%3e%3c/clipPath%3e%3cpattern x='0' y='0' width='13.36' height='13.36' patternUnits='userSpaceOnUse' id='SvgjsPattern1017'%3e%3cpath d='M0 13.36L6.68 0L13.36 13.36' stroke='%23d3b714' fill='none'%3e%3c/path%3e%3c/pattern%3e%3cclipPath id='SvgjsClipPath1016'%3e%3ccircle r='86.84' cx='143.3' cy='1124.55'%3e%3c/circle%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e");
}
</style>
