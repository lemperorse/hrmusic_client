<template>
  <div>

  </div>
</template>

<script>
export default {
    name: 'Map',
    props: {
        on:{
            default:false
        }
    },
    data(){
        return {
           
        }
    },
    async created(){
        try {
            await this.run()
        } catch (error) {
            
        }
    },
    methods:{
        async run(){
            alert('We want to know your location. to show you where you are exercising. Please allow us to access your location')
            await navigator.geolocation.getCurrentPosition(async (r)=>{
                var updatedLatitude = position.coords.latitude;
                var updatedLongitude = position.coords.longitude;
                alert(`Your location is: ${updatedLatitude}, ${updatedLongitude}`)
            },
            [async (e)=>{
                alert('We need your location to show you where you are exercising. Please allow us to access your location')
               console.log(e)
            }] );
        }
    }
}
</script>

<style>

</style>