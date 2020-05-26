import * as THREE from 'three'

// @ts-ignore
import * as orbitControl from 'three-orbit-controls';

const CameraOrbitControl = orbitControl(THREE);

export default class Scene {
    public readonly width: number = 0;
    public readonly height: number = 0;
    private scene: THREE.Scene;
    private camera: THREE.PerspectiveCamera;
    private renderer: THREE.WebGLRenderer;
    private onEveryLoopHandler: () => void = () => {};

    constructor(container: HTMLElement) {
        const axes = new THREE.AxesHelper(50);
        const grid = new THREE.GridHelper(1000, 10);

        this.width = container.offsetWidth;
        this.height = container.offsetHeight;
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.Fog(0xf7d9aa, 100, 950);
        this.camera = this.createCamera();
        this.renderer = this.createRenderer();

       // this.scene.add(axes);
       // this.scene.add(grid);

        // new CameraOrbitControl(this.camera, this.renderer.domElement);
        container.appendChild(this.renderer.domElement);
    }

    private createCamera(): THREE.PerspectiveCamera {
        const aspectRatio = this.width / this.height;
        const fieldOfView = 60;
        const nearPlane = 1;
        const farPlane = 10000;

        const camera = new THREE.PerspectiveCamera(
            fieldOfView,
            aspectRatio,
            nearPlane,
            farPlane,
        );

        camera.position.set(0, 100, 200);

        return camera
    }

    private createRenderer(): THREE.WebGLRenderer {
        const renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
        });

        renderer.setSize(this.width, this.height);
        renderer.shadowMap.enabled = true;

        return renderer;
    }

    private loop = (): void => {
        this.onEveryLoopHandler();
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.loop);
    };

    public add(mesh: THREE.Object3D): Scene {
        this.scene.add(mesh);
        return this;
    }

    public onEveryLoop(handler: () => void): Scene {
        this.onEveryLoopHandler = handler;
        return this;
    }

    public startRendering(): Scene {
        this.loop();
        return this;
    }
}
