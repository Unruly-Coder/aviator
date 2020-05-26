import * as THREE from 'three';
import {colors} from "../settings";

export default class Enemy {
    public mesh = Enemy.createMesh();
    public angle = 0;
    public dist = 0;

    constructor(x: number, y: number, z: number) {
        this.mesh.position.set(x, y, z);
    }

    private static createMesh() {
        const enemyGeometry = new THREE.TetrahedronGeometry(8,2);
        const enemyMaterial = new THREE.MeshPhongMaterial({
            color: colors.red,
            shininess: 0,
            specular: 0xffffff,
            flatShading: true
        });
        const mesh = new THREE.Mesh(enemyGeometry, enemyMaterial);
        mesh.castShadow = true;

        return mesh;
    }
}
