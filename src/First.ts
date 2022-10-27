import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default class First {
	private renderer!: THREE.WebGLRenderer;
	private scene!: THREE.Scene;
	private camera!: THREE.OrthographicCamera;
  private mesh!: THREE.Mesh

	private lightAmbient!: THREE.AmbientLight;
	private lightPoint!: THREE.PointLight;

	private controls!: OrbitControls;
	private stats!: any;

	private cube!: THREE.Mesh;
	private plane!: THREE.Mesh;

  private renderTime: number = Date.now()

	constructor() {
		this.initScene();
	}

	initStats() {
		this.stats = new (Stats as any)();
		document.body.appendChild(this.stats.dom);
	}

	initScene() {
    // 创建场景对象
		this.scene = new THREE.Scene();
    // 创建球体几何对象
    // const geometry = new THREE.SphereGeometry(60, 40, 40)
    // 创建立方体几何对象
    const geometry = new THREE.BoxGeometry(50, 100, 100)
    const material = new THREE.MeshLambertMaterial({ color: 0x0000FF })
    // 材质对象
    this.mesh = new THREE.Mesh(geometry, material)
    this.scene.add(this.mesh)

    // 点光源
    const point = new THREE.PointLight(0xFFFFFF)
    point.position.set(400, 200, 300)
    this.scene.add(point)

    // 环境光
    const ambient = new THREE.AmbientLight(0xFF4444)
    this.scene.add(ambient)

    // 相机设置
    const width = window.innerWidth
    const height = window.innerHeight
    const k = width / height
    const s = 200 // 三维场景显示范围控制系数, 系数越大, 显示的范围越大

    // 相机对象
    const camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000)
    camera.position.set(200, 300, 200)
    camera.lookAt(this.scene.position) // 设置相机方向
    this.camera = camera

    // 渲染器对象
    this.renderer = new THREE.WebGLRenderer()
    this.renderer.setSize(width, height) // 设置渲染区域尺寸
    this.renderer.setClearColor(0xb9d3ff, 1) // 设置背景色
    document.body.appendChild(this.renderer.domElement)
    // this.renderer.render(this.scene, this.camera) // 指定渲染操作(场景和相机)
    this.render()
	}

  render() {
    const time = Date.now()
    const angle = (time - this.renderTime) * 0.001
    this.renderTime = time

    this.renderer.render(this.scene, this.camera)
    this.mesh.rotateY(angle)
    requestAnimationFrame(this.render.bind(this))
  }
}
