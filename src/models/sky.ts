import * as THREE from 'three';
import Cloud from './cloud';

export default class Sky {
    public mesh = Sky.createMesh();

    constructor(x: number, y: number, z: number) {
        this.mesh.position.set(x, y, z);
    }

    private static createMesh() {
        const mainMesh = new THREE.Object3D();
        const cloudsNumber = 20;
        const stepAngle = 2 * Math.PI / cloudsNumber;

        for ( let i = 0; i < cloudsNumber; i++) {
            const angle = i * stepAngle;
            const height = 750 + Math.random() * 200;
            const x = Math.cos(angle) * height ;
            const y = Math.sin(angle) * height;
            const z = -400 - Math.random() * 400;
            const cloud = new Cloud(x, y, z);
            const size = 1 + Math.random() * 2;

            cloud.mesh.scale.set(size, size, size);
            cloud.mesh.rotation.z = angle;

            mainMesh.add(cloud.mesh);
        }

        return mainMesh;
    }

    public animate() {
        this.mesh.rotation.z += .01
    }
}