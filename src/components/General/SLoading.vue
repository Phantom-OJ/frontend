<template>
  <div style="position: relative">
    <img class="mydiv" id="phantom1" src="@/assets/load.png" alt="loading..."/>
    <img class="mydiv" id="phantom2" src="@/assets/load.png" alt="loading..."/>
    <img class="mydiv" id="phantom3" src="@/assets/load.png" alt="loading..."/>
    <slot/>
  </div>
</template>

<script lang="ts">
// @ts-nocheck
import {Vue} from '@/ts/extension'
import {Component} from 'vue-property-decorator'

@Component({})
export default class SLoading extends Vue {
  interval: number = -1

  mounted() {
    this.show()
  }

  move() {
    let obj1 = document.getElementById("phantom1");
    let obj2 = document.getElementById("phantom2");
    let obj3 = document.getElementById("phantom3");
    if (obj3.offsetLeft >= -123) {
      obj1.style.cssText = "left:" + (obj1.offsetLeft - 1) + "px;";
      obj2.style.cssText = "left:" + (obj2.offsetLeft - 1) + "px;";
      obj3.style.cssText = "left:" + (obj3.offsetLeft - 1) + "px;";
    } else {
      obj1.style.cssText = "left:100%";
      obj2.style.cssText = "left:109%";
      obj3.style.cssText = "left:115%";
    }
  }

  show() {
    this.interval = window.setInterval(() => this.move(), 3);
  }

  beforeDestroy() {
    window.clearInterval(this.interval)
  }
}
</script>

<style scoped lang="scss">
#phantom1, #phantom2, #phantom3 {
  bottom: 50%;
}

#phantom1 {
  width: 100px;
  height: 100px;
  left: 100%;
}

#phantom2 {
  width: 60px;
  height: 60px;
  left: 109%;
}

#phantom3 {
  width: 40px;
  height: 40px;
  left: 115%;
}

.mydiv {
  position: absolute;
  animation: rotateImg 4s;
  animation-iteration-count: infinite;

  -webkit-animation: rotateImg 4s;
  -webkit-animation-iteration-count: infinite;
}

@keyframes rotateImg {
  0% {
    transform: rotate(360deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

@-webkit-keyframes rotateImg {
  0% {
    -webkit-transform: rotate(360deg);
  }
  100% {
    -webkit-transform: rotate(0deg);
  }
}

@-moz-keyframes rotateImg {
  0% {
    -moz-transform: rotate(360deg);
  }
  100% {
    -moz-transform: rotate(0deg);
  }
}
</style>
