import * as VueGoogleMaps from 'vue2-google-maps';


export default ({ Vue }) => {
  console.log("maps plugings");
  Vue.use(VueGoogleMaps, {
    load: {
      key: 'AIzaSyC04k2TIJBXUa0yJQ0N2XimbuiVubkgG6g',
      libraries: 'places,drawing', // This is required if you use the Autocomplete plugin
    
    },
 
  })


}