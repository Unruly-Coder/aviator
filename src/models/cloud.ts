import * as THREE from 'three';
import {colors} from "../settings";

export default class Cloud {
    public mesh = Cloud.createMesh();

    constructor(x: number, y: number, z: number) {
        this.mesh.position.set(x, y, z);
    }

    private static createMesh() {
        // Create an empty container that will hold the different parts of the cloud
        const mainMesh = new THREE.Object3D();
        const boxGeometry = new THREE.BoxGeometry(20, 20, 20);
        const material = new THREE.MeshPhongMaterial({ color: colors.white });

        // duplicate the geometry a random number of times
        const nBlocs = 3 + Math.floor(Math.random() * 3);
        for (let i = 0; i < nBlocs; i++ ) {

            // create the mesh by cloning the geometry
            const mesh = new THREE.Mesh(boxGeometry, material);

            // set the position and the rotation of each cube randomly
            mesh.position.y = i * 15;
            mesh.position.x = Math.random() * 10;
            mesh.position.z = Math.random() * 10;
            mesh.rotation.z = Math.random() * Math.PI * 2;
            mesh.rotation.y = Math.random() * Math.PI * 2;

            // set the size of the cube randomly
            const scale = .1 + Math.random() * .9;
            mesh.scale.set(scale, scale, scale);

            // allow each cube to cast and to receive shadows
            mesh.castShadow = true;
            mesh.receiveShadow = true;

            // add the cube to the container we first created
            mainMesh.add(mesh);
        }

        return mainMesh;
    }
}
