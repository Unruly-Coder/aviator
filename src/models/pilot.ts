import * as THREE from 'three';
import {colors} from "../settings";

export default class Pilot {

    private topHair: THREE.Object3D;
    private angleHairs: number = 0;
    public mesh: THREE.Object3D = this.createPilotMesh();

    private createGlassesMesh() {
        const glasses = new THREE.Object3D();
        const glassGeometry = new THREE.BoxGeometry(5, 5, 5);
        const glassMaterial = new THREE.MeshLambertMaterial({color: colors.brown});
        const glassRight = new THREE.Mesh(glassGeometry, glassMaterial);
        glassRight.position.set(4, 12, 3);

        const glassLeft = glassRight.clone();
        glassLeft.position.z = -glassRight.position.z;

        const glassConnectorGeometry = new THREE.BoxGeometry(11, 1, 11);
        const glassConnector = new THREE.Mesh(glassConnectorGeometry, glassMaterial);
        glassConnector.position.set(0, 12, 0);

        glasses.add(glassLeft);
        glasses.add(glassRight);
        glasses.add(glassConnector);

        return glasses;
    }

    private createHairMesh() {
        const hairs = new THREE.Object3D();

        const hairGeometry = new THREE.BoxGeometry(4, 4, 4);
        const hairMaterial = new THREE.MeshLambertMaterial({color: colors.brown});
        const hair = new THREE.Mesh(hairGeometry, hairMaterial);
        hair.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 2 , 0));

        this.topHair = new THREE.Object3D();

        for (let i = 0; i < 12; i++) {
            const h = hair.clone();
            const col = i % 3;
            const row = Math.floor(i / 3);
            const startPosZ = -4;
            const startPosX = -4;
            h.position.set(startPosX + row * 4, 0, startPosZ + col * 4);
            this.topHair.add(h);
        }

        hairs.add(this.topHair);

        const hairSideGeometry = new THREE.BoxGeometry(12, 4, 2);
        hairSideGeometry.applyMatrix(new THREE.Matrix4().makeTranslation(-6, 0, 0));
        const hairSideR = new THREE.Mesh(hairSideGeometry, hairMaterial);
        const hairSideL = hairSideR.clone();

        hairSideR.position.set(8, -2, 6);
        hairSideL.position.set(8, -2, -6);

        hairs.add(hairSideR);
        hairs.add(hairSideL);

        const hairBackGeom = new THREE.BoxGeometry(2, 8, 10);
        const hairBack = new THREE.Mesh(hairBackGeom, hairMaterial);
        hairBack.position.set(-1, -4, 0);
        hairs.add(hairBack);

        return hairs;
    }

    private createPilotMesh() {
        const mesh = new THREE.Object3D();

        const bodyGeometry = new THREE.BoxGeometry(15, 15, 15);
        const bodyMaterial = new THREE.MeshPhongMaterial({color: colors.brown, flatShading: true});
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);

        mesh.add(body);

        const faceGeometry = new THREE.BoxGeometry(10, 10, 10);
        const faceMaterial = new THREE.MeshLambertMaterial({color: colors.pink});
        const face = new THREE.Mesh(faceGeometry, faceMaterial);
        face.position.set(-2, 12, 0);
        mesh.add(face);

        const hairs  = this.createHairMesh();
        hairs.position.set(-7, 17, 0);
        mesh.add(hairs);

        const glasses = this.createGlassesMesh();
        mesh.add(glasses);

        return mesh;
    }

    public animate() {
        this.topHair.children.forEach((hair, index) => {
            this.topHair.children[index].scale.y = .75 + Math.cos(this.angleHairs + index / 3) * .25;
        });

        this.angleHairs += 0.16;
    }
}