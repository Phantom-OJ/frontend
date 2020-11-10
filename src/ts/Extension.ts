// @ts-nocheck
import {Alert} from "@/ts/DataDef"
import xss from 'xss'
import marked from 'marked'
import * as V from 'vue-property-decorator'

const sXssOptions = {}
const sXss = new xss.FilterXSS(sXssOptions)

marked.setOptions({})

export class Vue extends V.Vue {
  $alert(alert: Alert): void {
  }

  $xss(html: string): string {
    return sXss.process(html)
  }

  $m2h(md:string):string{
    return marked(md)
  }
}

