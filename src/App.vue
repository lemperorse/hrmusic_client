<template>
  <div id="q-app"> 
    <Map />
    <router-view />   
  </div>
</template> 
<script lang="ts">
import Map from './components/Map.vue'
import { Vue, Component } from 'vue-property-decorator';
@Component({
    components: {
        Map
    }
})
export default class App extends Vue {

  async created(){
    console.log(this.$router)
  }
}
</script>
