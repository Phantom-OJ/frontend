<template>
  <canvas ref="threeCanvas" id="s-loading-canvas"/>
</template>

<script lang="ts">
import {Vue} from '@/ts/extension'
import {Component, Prop, Watch} from 'vue-property-decorator'
import * as Three from 'three'
import {mapState} from "vuex";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

@Component({
  computed: {...mapState(['width_height'])}
})
export default class SLoading extends Vue {
  readonly width_height!: { width: number, height: number }
  @Prop({
    type: Number
  })
  canvasWidth?: number
  @Prop({
    type: Number
  })
  canvasHeight?: number

  scene!: Three.Scene
  geometry!: Three.BoxGeometry
  material!: Three.MeshLambertMaterial
  mesh!: Three.Mesh
  point!: Three.PointLight
  ambient!: Three.AmbientLight
  camera!: Three.OrthographicCamera
  renderer!: Three.WebGLRenderer
  controls!:OrbitControls
  canvas!:HTMLCanvasElement
  lastAnimate = Date.now()
  readonly s = 200

  created() {
    this.scene = new Three.Scene()
    this.geometry = new Three.BoxGeometry(100, 100, 100)
    this.material = new Three.MeshLambertMaterial({
      color: 0x00FF00
    })
    this.mesh = new Three.Mesh(this.geometry, this.material)
    this.scene.add(this.mesh)
    this.point = new Three.PointLight(0xFFFFFF)
    this.point.position.set(400, 200, 300)
    this.scene.add(this.point)
    this.ambient = new Three.AmbientLight(0x777777)
    this.scene.add(this.ambient)
    this.camera = new Three.OrthographicCamera(-this.s * this.k, this.s * this.k, this.s, -this.s, 1, 1000)
    this.camera.position.set(200, 300, 200)
    this.camera.lookAt(this.scene.position)
  }

  mounted() {
    this.canvas = this.$refs.threeCanvas as HTMLCanvasElement
    this.renderer = new Three.WebGLRenderer({
      canvas: this.canvas
    })
    this.renderer.setSize(this.width, this.height)
    this.renderer.setClearColor(0xF8F8FF, 1)
    this.renderer.render(this.scene, this.camera)
    this.controls = new OrbitControls(this.camera, this.canvas)
    this.animate()
  }

  get k() {
    return this.width / this.height
  }

  get height() {
    return this.canvasHeight ?? this.width_height.height - 180
  }

  get width() {
    return this.canvasWidth ?? this.width_height.width * 0.84 - 10
  }

  animate(){
    const time = Date.now()
    const t = time - this.lastAnimate
    this.lastAnimate = time
    requestAnimationFrame(this.animate)
    this.rerender()
    this.mesh.rotateX(.001*t)
  }

  rerender(){
    this.renderer.render(this.scene, this.camera)
  }

  canvasResize() {
    this.camera.left = -this.s * this.k
    this.camera.right = this.s * this.k
    this.camera.top = this.s
    this.camera.bottom = -this.s
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(this.width, this.height)
    this.rerender()
  }

  @Watch('width')
  widthChanged() {
    this.canvasResize()
  }

  @Watch('height')
  heightChanged() {
    this.canvasResize()
  }

}
</script>

<style scoped lang="scss">
  #s-loading-canvas {
    display: block;
    margin: 10px auto;
  }

</style>
