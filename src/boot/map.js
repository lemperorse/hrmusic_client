import * as VueGoogleMaps from 'vue2-google-maps';


export default ({ Vue }) => {
  console.log("maps plugings");
  Vue.use(VueGoogleMaps, {
    load: {
      key: 'AIzaSyC_w9yzNOHB0-EM87ZebuyRSCsMkOQ_tac',
      libraries: 'places,drawing', // This is required if you use the Autocomplete plugin
      // OR: libraries: 'places,drawing'
      // OR: libraries: 'places,drawing,visualization'
      // (as you require)

      //// If you want to set the version, you can do so:
      // v: '3.26',
    },
 
  })


}