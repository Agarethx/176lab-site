import * as THREE from 'three'
import { ScrollTrigger } from '../animations/gsap-setup.js'

export class Scene {
  constructor(canvasSelector = '[data-three-canvas]') {
    this.canvas = document.querySelector(canvasSelector)
    if (!this.canvas) return

    this._init()
    this._addGeometry()
    this._bindResize()
    this._animate()
    this._bindScroll()
  }

  _init() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true,
    })
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight)

    this.scene = new THREE.Scene()

    this.camera = new THREE.PerspectiveCamera(
      60,
      this.canvas.clientWidth / this.canvas.clientHeight,
      0.1,
      100
    )
    this.camera.position.z = 3

    // Soft ambient + directional light
    this.scene.add(new THREE.AmbientLight(0xffffff, 0.6))
    const dir = new THREE.DirectionalLight(0xffffff, 1.2)
    dir.position.set(2, 4, 3)
    this.scene.add(dir)
  }

  _addGeometry() {
    // Default: simple torus knot — swap with your own mesh/model
    const geo = new THREE.TorusKnotGeometry(0.9, 0.3, 128, 32)
    const mat = new THREE.MeshStandardMaterial({
      color: 0x6366f1,
      roughness: 0.4,
      metalness: 0.6,
    })
    this.mesh = new THREE.Mesh(geo, mat)
    this.scene.add(this.mesh)
  }

  _bindResize() {
    window.addEventListener('resize', () => {
      const w = this.canvas.clientWidth
      const h = this.canvas.clientHeight
      this.camera.aspect = w / h
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(w, h)
    })
  }

  _animate() {
    const tick = () => {
      if (this.mesh) {
        this.mesh.rotation.x += 0.004
        this.mesh.rotation.y += 0.006
      }
      this.renderer.render(this.scene, this.camera)
      this._raf = requestAnimationFrame(tick)
    }
    tick()
  }

  _bindScroll() {
    // Slow rotation on scroll progress
    ScrollTrigger.create({
      trigger: this.canvas,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        if (this.mesh) {
          this.mesh.rotation.z = self.progress * Math.PI
        }
      },
    })
  }

  destroy() {
    cancelAnimationFrame(this._raf)
    this.renderer.dispose()
  }
}
