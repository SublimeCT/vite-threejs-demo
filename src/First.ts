import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default class First {
	private renderer!: THREE.WebGLRenderer;
	private scene!: THREE.Scene;
	private camera!: THREE.PerspectiveCamera;

	private lightAmbient!: THREE.AmbientLight;
	private lightPoint!: THREE.PointLight;

	private controls!: OrbitControls;
	private stats!: any;

	private cube!: THREE.Mesh;
	private plane!: THREE.Mesh;

	constructor() {
		this.initScene();
	}

	initStats() {
		this.stats = new (Stats as any)();
		document.body.appendChild(this.stats.dom);
	}

	initScene() {
		this.scene = new THREE.Scene();
    const geometry = new THREE.BoxGeometry(100, 100, 100)
    const material = new THREE.MeshLambertMaterial({ color: 0x0000FF })
    const mesh = new THREE.Mesh(geometry, material)
    this.scene.add(mesh)

    // 点光源
    const point = new THREE.PointLight(0xFFFFFF)
    point.position.set(400, 200, 300)
    this.scene.add(point)

    // 环境光
    const ambient = new THREE.AmbientLight(0x444444)
    this.scene.add(ambient)

    const width = window.innerWidth
    const height = window.innerHeight
    const k = width / height
    const s = 200

    const camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000)
    camera.position.set(200, 300, 200)
    camera.lookAt(this.scene.position)

    this.renderer = new THREE.WebGLRenderer()
    this.renderer.setSize(width, height)
    this.renderer.setClearColor(0xb9d3ff, 1)
    document.body.appendChild(this.renderer.domElement)
    this.renderer.render(this.scene, camera)
	}

}
