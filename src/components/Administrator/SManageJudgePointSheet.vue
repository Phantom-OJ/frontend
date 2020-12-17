<template>
  <v-sheet class="s-mj-form s-flex">
    <div class="s-left">
      <v-select :items="languages" v-model="judgePoint_.dialect" color="secondary" style="width: 95%;"/>
      <label>{{ $t('create.judge-point.bes') }}</label>
      <s-codemirror :code.sync="judgePoint_.beforeSql" :mime="`text/x-${judgePoint_.dialect}`" :options="cmOption"/>
      <br>
      <label>{{ $t('create.judge-point.afs') }}</label>
      <s-codemirror :code.sync="judgePoint_.afterSql" :mime="`text/x-${judgePoint_.dialect}`" :options="cmOption"/>
      <br>
      <label>{{ $t('create.judge-point.ans') }}</label>
      <s-codemirror :code.sync="judgePoint_.answer" :mime="`text/x-${judgePoint_.dialect}`" :options="cmOption"/>
    </div>
    <div class="s-right">
      <div class="s-flex space-around" style="margin-bottom: 46px">
        <div class="s-search-vs">
          <v-responsive class="s-vc--search">
            <v-text-field
              v-model="searchScript"
              :label="$t('create.judge-point.script')"
            ></v-text-field>
          </v-responsive>
          <br>
          <div class="s-vs">
            <v-virtual-scroll
              :bench="2"
              :items="scripts"
              item-height="44"
            >
              <template v-slot:default="{ item }">
                <div :key="item.ID"
                     :class="{'cursor-hand-hover':true, 's-vs--item':true, 's-vs--item__active':item.ID===script.ID}"
                     @click="showScript(item)">
                  {{ item.keyword }}
                </div>
                <v-divider></v-divider>
              </template>
            </v-virtual-scroll>
            <v-btn fab absolute color="secondary" @click="addScript" class="s-vs--btn">
              <v-icon>
                mdi-plus
              </v-icon>
            </v-btn>
          </div>
        </div>
        <div class="s-search-vs">
          <v-responsive class="s-vs--search">
            <v-text-field
              v-model="searchDB"
              :label="$t('create.judge-point.db')"
            ></v-text-field>
          </v-responsive>
          <br>
          <div class="s-vs">
            <v-virtual-scroll
              :bench="2"
              :items="dbs"
              item-height="44"
            >
              <template v-slot:default="{ item }">
                <div :key="item.ID"
                     :class="{'cursor-hand-hover':true, 's-vs--item':true, 's-vs--item__active':item.ID===DB.ID}"
                     @click="showDB(item)">
                  {{ item.keyword }}
                </div>
                <v-divider></v-divider>
              </template>
            </v-virtual-scroll>
            <v-btn fab absolute color="secondary" @click="addDB" class="s-vs--btn">
              <v-icon>
                mdi-plus
              </v-icon>
            </v-btn>
          </div>
        </div>
      </div>
      <v-textarea v-if="flag===2" readonly :value="`${DB.dialect}\n${DB.databaseUrl}`" filled disabled height="180"
                  class="s-vs--append" hide-details/>
      <s-codemirror v-else-if="flag===3" :code="script.script" mime="text/x-python" :options="cmOption"
                    read-only="nocursor" class="s-vs--append"/>
      <div v-else-if="flag===0" class="s-vs--append">
        <v-select :items="languages" v-model="create_DB.dialect" hide-details style="margin-bottom: 16px"/>
        <v-text-field v-model="create_DB.keyword" hide-details class="s-c-keyword" :label="$t('create.keyword')"/>
        <v-btn @click="submitDB" class="s-c-btn" color="success">
          {{ $t('submit') }}
        </v-btn>
        <v-textarea v-model="create_DB.databaseUrl" filled label="database URL" height="120"/>
      </div>
      <div v-else-if="flag===1" class="s-vs--append">
        <v-text-field v-model="create_SC.keyword" hide-details class="s-c-keyword" :label="$t('create.keyword')"/>
        <v-btn @click="submitSC" color="success" class="s-c-btn">
          {{ $t('submit') }}
        </v-btn>
        <s-codemirror :code.sync="create_SC.script" mime="text/x-python" :options="cmOption"/>
      </div>
    </div>
  </v-sheet>
</template>

<script lang="ts">
import {Vue} from '@/ts/extension'
import {Component, Prop, PropSync} from 'vue-property-decorator'
import {DBForm, JudgePointForm, ScriptForm} from "@/ts/forms";
import SCodemirror from "@/components/General/SCodemirror.vue";
import {JudgeDB, JudgeScript} from "@/ts/entities";
import SCodeEditor from "@/components/Problem/SCodeEditor.vue";
import {mapState} from "vuex";
import {SUtil} from "@/ts/utils";

enum Mode {
  ADD_DB, ADD_SC, SHOW_DB, SHOW_SC
}

@Component({
  components: {SCodeEditor, SCodemirror},
  computed: {...mapState(['scripts', 'dbs'])}
})
export default class SManageJudgePoint extends Vue {
  readonly cmOption = {
    lineNumbers: false,
    viewportMargin: 10
  }
  readonly languages = SUtil.languages
  readonly scripts!: JudgeScript[]
  readonly dbs!: JudgeDB[]

  @PropSync('judgePoint')
  judgePoint_!: JudgePointForm
  @Prop({type: Boolean, required: true})
  isCreate!: boolean

  searchScript: string = ''
  searchDB: string = ''
  flag: Mode = Mode.SHOW_DB
  DB: JudgeDB = {} as JudgeDB
  script: JudgeScript = {} as JudgeScript

  create_DB: DBForm = {
    id: 0,
    databaseUrl: '',
    dialect: 'pgsql',
    keyword: ''
  }

  create_SC: ScriptForm = {
    id: 0,
    keyword: '',
    script: 'def mzynb():'
  }

  addScript() {
    this.flag = Mode.ADD_SC
  }

  addDB() {
    this.flag = Mode.ADD_DB
  }

  showScript(s: JudgeScript) {
    this.flag = Mode.SHOW_SC
    this.script = s
  }

  showDB(d: JudgeDB) {
    this.flag = Mode.SHOW_DB
    this.DB = d
  }

  async submitDB() {
    if (!window.confirm(this.$t('warning.warn').toString())) return
    const msg = await this.$api.putDB(this.create_DB)
    this.refresh()
    SUtil.alertIfSuccess(msg, 'success.upload', this)
  }

  refresh() {
    this.$store.dispatch('loadScripts', true)
    this.$store.dispatch('loadDBs', true)
  }

  async submitSC() {
    if (!window.confirm(this.$t('warning.warn').toString())) return
    const msg = await this.$api.putScript(this.create_SC)
    this.refresh()
    SUtil.alertIfSuccess(msg, 'success.upload', this)
  }
}
</script>

<style lang="scss">
.CodeMirror-hints {
  z-index: 10000 !important;
}

.s-c-keyword {
  width: 60%;
  margin-right: 5%;
  display: inline-flex;
  min-width: 120px;
  margin-bottom: 16px;
}

.s-c-btn {
  width: 35%;
  min-width: 60px;
  margin-bottom: 16px;
}

.s-mj-form {
  min-width: 380px;
  --s-code-mirror-height: 180px;

  .theme--light.v-label {
    color: rgba(0, 0, 0, 0.86);
  }

  .s-left {
    width: 50%;
    min-width: 380px;
    flex-grow: 1;
  }

  .s-right {
    flex-grow: 1;
    width: 50%;
    max-width: 95%;

    .s-search-vs {
      padding: 0 12px;
      width: 42%;

      .s-vs {
        border: 1px dashed var(--v-info-base);
        height: 410px;
        position: relative;

        .s-vs--item {
          padding: 6px 12px;
          height: 43px;
          line-height: 31px;
        }

        .s-vs--item__active {
          background-color: #2d94377f;
        }

        .s-vs--btn {
          right: -15px;
          bottom: -15px;
        }
      }
    }

    .s-vs--append {
      padding-left: 24px;
      width: 95%;

      .s-codemirror {
        width: 100%;
      }
    }

    .theme--light.v-input--is-disabled input, .theme--light.v-input--is-disabled textarea {
      color: rgba(0, 0, 0, 0.9);
    }
  }

  .s-codemirror {
    width: 95%;
  }
}
</style>
