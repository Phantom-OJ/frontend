import {Alert} from "@/ts/DataDef";
import * as V from 'vue-property-decorator'

export class Vue extends V.Vue{
  $alert(alert:Alert):void{}
}

