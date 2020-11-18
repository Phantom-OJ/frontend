// @ts-nocheck
import {Alert} from "@/ts/interfaces"
import xss from 'xss'
import marked from 'marked'
import * as V from 'vue-property-decorator'
import {API} from './api'

declare module 'vue/types/vue' {
  interface Vue {
    $alert(alert: Alert): void
    $api: API
  }
}
const sXssOptions = {}
const sXss = new xss.FilterXSS(sXssOptions)

marked.setOptions({})


export class Vue extends V.Vue {
  $xss(html: string): string {
    return sXss.process(html)
  }

  $m2h(md: string): string {
    return marked(md)
  }
}

