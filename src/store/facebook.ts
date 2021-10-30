import { VuexModule, Module, Mutation, Action } from "vuex-class-modules";
import { Core } from "./core";
import { fb } from '../plugins/facebook'

const FB:any = fb
@Module({ generateMutationSetters: true })
class FacebookModules extends VuexModule {
    public USER:any = null
    async login() {
        
       let user =  await FB.login(["public_profile", "user_birthday"], async (r: any) => {
            let data = r.authResponse
            let resUser = await this.getProfile(data.accessToken)
            this.USER = resUser
            return resUser;
            //alert(JSON.stringify(r.authResponse))
        }, (e: any) => {
            alert(JSON.stringify(e))
            return null
        }) 
        
        return user;
    }

    async getProfile(token:any){
        let user = await Core.getHttp(`https://graph.facebook.com/v11.0/me?fields=id%2Cname%2Clast_name%2Cfirst_name%2Cpicture&access_token=${token}`)
        let formReg = {}
        let formLog = {}
        if(user.id){
            formReg = {
                first_name:  user.first_name,
                last_name: user.last_name,
                email:`${user.id}@facebook.com`,
                user_name:user.id,
                password:btoa(user.id),
                password_password_confirm:btoa(user.id)
            }

            formLog = {
                user_name:user.id,
                password:btoa(user.id),
            }
            // alert(JSON.stringify({
            //     formReg:formReg,
            //     formLog:formLog
            // }))
            return {
                formReg:formReg,
                formLog:formLog
            }
           
        }
        return null
        
    }


}

import store from "./index"
export const Facebook = new FacebookModules({ store, name: "Facebook" })