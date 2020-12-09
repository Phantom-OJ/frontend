<template>
  <form ref="uploadForm">
    <v-text-field :name="keyword"/>
    <input v-show="false" type="file" :name="file" ref="file"/>
    <div class="s-flex">
      <v-btn @click="chooseFile" style="margin: 0 12px 12px 0">choose</v-btn>
      <v-chip color="white" style="margin-bottom: 12px">{{ file_.name }}</v-chip>
    </div>
    <v-btn @click="upload" block>upload</v-btn>
  </form>
</template>

<script lang="ts">
import {Vue} from '@/ts/extension'
import {Component, Prop} from 'vue-property-decorator'
import {Alert} from "@/ts/entities";

@Component({})
export default class SUploadFileForm extends Vue {
  @Prop({
    type:String,
    default:'keyword'
  })
  keyword!:string

  @Prop({
    type:String,
    default:'file'
  })
  file!:string

  file_:any={
    name:'?'
  }
  intervals: number[] = []

  mounted() {
    this.intervals.push(window.setInterval(() => {
      const form = this.$refs.uploadForm as HTMLFormElement
      const jsForm = new FormData(form)
      this.file_ = jsForm.get('file')
    }, 1000))
  }

  chooseFile(){
    (this.$refs.file as HTMLInputElement).click()
  }

  upload(){
    if(this.file_?.size??0===0){
      this.$alert(new Alert({
        type:'warning',
        info:'no file'
      }))
    }else{
      const form = this.$refs.uploadForm as HTMLFormElement
      const jsForm = new FormData(form)
      console.log(jsForm.get('file'))
      this.$emit('upload', jsForm)
    }
  }


  beforeDestroy() {
    this.intervals.forEach(window.clearInterval)
  }
}
</script>

<style scoped lang="scss">

</style>
