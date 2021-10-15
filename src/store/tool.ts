import { VuexModule, Module, Mutation, Action } from "vuex-class-modules";
import { Core } from "./core";
import * as moment from 'moment';
import * as _ from 'lodash'
const MM:any = moment
@Module({ generateMutationSetters: true })
class ToolModules extends VuexModule {

    countDate(startDate:string,num:number){
        var endDate:any = MM(startDate, "YYYY-MM-DD").add(num, 'days').format('YYYY-MM-DD')
         
        return {
            "start" : startDate,
            "end" : endDate
        }
    }

    getDifficultyIn(arr:any){
       let levels =  _.map(arr,'difficulty')
       let sort = _.uniq(_.filter(levels, (v, i, a:any) => a.indexOf(v) !== i)) // _.sortedUniq(levels)
       sort = sort.sort(function(a, b){return a-b}); 
       return this.getStringDifficulty(sort[sort.length-1])
    }

    getStringDifficulty(level:number){
        switch(level) {
            case 1:
              return {
                  color: 'green',
                  mode: 'Easy'
              } 
            case 2:
                return {
                    color: 'blue',
                    mode: 'Moderate'
                } 
            case 3:
                return {
                    color: 'purple',
                    mode: 'Hard'
                } 
            default:
                return {
                    color: 'green',
                    mode: 'Easy'
                } 
          }
    }


}

import store from "./index"
export const Tool = new ToolModules({ store, name: "Tool" })