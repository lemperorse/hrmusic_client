<template>
<q-page class="row items-center justify-evenly">
 
    <q-btn color="primary" icon="check" label="OK" @click="loginFacebook" />
</q-page>
</template>

<script>

</script>

<script lang="ts">
import { Todo, Meta } from 'components/models';
import ExampleComponent from 'components/ClassComponent.vue';
import { Vue, Component } from 'vue-property-decorator';
import {fb} from '../plugins/facebook.js'
 @Component({
    components: { ExampleComponent }
})
export default class PageIndex extends Vue {

    async loginFacebook() {
        fb.login(["public_profile", "user_birthday"], (r:any) => {
            alert(JSON.stringify(r))
        }, (e:any) => {
            alert(JSON.stringify(e))
        })

    }
};
</script>
