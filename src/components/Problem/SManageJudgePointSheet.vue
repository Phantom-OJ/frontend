<template>
  <v-sheet class="s-mj-form s-flex">
    <div class="s-flex s-left">
      <!--      <div class="s-flex">-->
      <label>{{ $t('create.judge-point.bes') }}</label>
      <s-codemirror :code.sync="judgePoint_.beforeSql" :mime="'text/x-pgsql'"/>
      <br>
      <!--      </div>-->
      <!--      <div class="s-flex">-->
      <label>{{ $t('create.judge-point.afs') }}</label>
      <s-codemirror :code.sync="judgePoint_.afterSql" :mime="'text/x-pgsql'"/>
      <!--      </div>-->
    </div>
    <div class="s-right">
      <v-textarea v-model="judgePoint_.answer" :label="$t('create.judge-point.ans')" auto-grow/>
      <s-upload-file-form/>
      <div>
        <v-responsive max-width="400">
          <v-text-field
            v-model="searchScript"
            type="number"
            label="Total Benched"
          ></v-text-field>
        </v-responsive>
        <v-virtual-scroll
          :bench="2"
          :items="scripts"
          height="300"
          item-height="32"
          max-width="400"
        >
          <template v-slot:default="{ item }">
            <v-list-item :key="item.id">

              <v-list-item-content>
                <v-list-item-title>
                  {{ item.keyword }}
                </v-list-item-title>
              </v-list-item-content>

              <v-list-item-action>
                <v-icon small>
                  mdi-open-in-new
                </v-icon>
              </v-list-item-action>
            </v-list-item>

            <v-divider></v-divider>
          </template>
        </v-virtual-scroll>
      </div>
    </div>
  </v-sheet>
</template>

<script lang="ts">
import {Vue} from '@/ts/extension'
import {Component, PropSync} from 'vue-property-decorator'
import {JudgePointForm} from "@/ts/forms";
import SCodemirror from "@/components/General/SCodemirror.vue";
import {JudgeDB, JudgeScript} from "@/ts/entities";
import SCodeEditor from "@/components/Problem/SCodeEditor.vue";
import SUploadFileForm from "@/components/General/SUploadFileForm.vue";

@Component({
  components: {SUploadFileForm, SCodeEditor, SCodemirror}
})
export default class SManageJudgePoint extends Vue {
  @PropSync('judgePoint')
  judgePoint_!: JudgePointForm

  searchScript: string = ''
  searchDB: string = ''
  scripts: JudgeScript[] = [{
    id:1,keyword:'lslnb'
  }]
  dbs: JudgeDB[] = [{
    id:1,keyword:'lslnb'
  }]


  created() {

  }
}
</script>

<style lang="scss">
.CodeMirror-hints {
  z-index: 10000 !important;
}

.s-mj-form {
  min-width: 500px;
  --s-code-mirror-height: 360px;

  .s-left {
    flex-direction: column;
    flex-grow: 1;
    width: 50%;
    min-width: 500px;
  }

  .s-right{
    flex-grow: 1;
    width: 50%;
  }

  .s-codemirror {
    width: 95%;
  }
}
</style>
