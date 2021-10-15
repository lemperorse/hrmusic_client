import { VuexModule, Module, Mutation, Action } from "vuex-class-modules";
import { Core } from "./core";
import { fb } from '../plugins/facebook'
const FB:any = fb
@Module({ generateMutationSetters: true })
class FacebookModules extends VuexModule {

    async login() {
        
        FB.login(["public_profile", "user_birthday"], (r: any) => {
            alert(JSON.stringify(r))
        }, (e: any) => {
            alert(JSON.stringify(e))
        })

    }


}

import store from "./index"
export const Facebook = new FacebookModules({ store, name: "Facebook" })