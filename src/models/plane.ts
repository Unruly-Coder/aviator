import * as THREE from 'three';
import {colors} from "../settings";
import Pilot from './pilot';

export default class Plane {
    private propeller: THREE.Object3D;
    private pilot = new Pilot();
    public mesh = this.createPlaneMesh();


    constructor(x: number, y: number, z: number) {
        this.mesh.position.set(x, y, z);
    }

    private createWheel() {
        const mesh = new THREE.Object3D();

        const  wheelProtectorGeometry = new THREE.BoxGeometry(30, 15, 10, 1, 1, 1);
        const  wheelProtectorMaterial = new THREE.MeshPhongMaterial({color: colors.red, flatShading: true});
        const  wheelProtector = new THREE.Mesh(wheelProtectorGeometry, wheelProtectorMaterial);

        mesh.add(wheelProtector);

        const tireGeometry = new THREE.BoxGeometry(24, 24, 4);
        const tireMaterial = new THREE.MeshPhongMaterial({color: colors.brownDark, flatShading: true});
        const tire = new THREE.Mesh(tireGeometry, tireMaterial);

        tire.position.set(0, -8, 0);
        mesh.add(tire);

        const wheelAxisGeometry = new THREE.BoxGeometry(10, 10, 6);
        const wheelAxisMaterial = new THREE.MeshPhongMaterial({color: colors.brown, flatShading: true});
        const wheelAxis = new THREE.Mesh(wheelAxisGeometry, wheelAxisMaterial);
        wheelAxis.position.set(0, -8, 0);
        mesh.add(wheelAxis);

        return mesh;
    }

    private createPlaneMesh() {
        const mesh = new THREE.Object3D();

        // Create the cockpit
        const cockpitGeometry = new THREE.BoxGeometry(80, 50, 50, 1, 1);
        const cockpitMaterial = new THREE.MeshPhongMaterial({ color: colors.red, flatShading: true });

        cockpitGeometry.vertices[4].y -= 10;
        cockpitGeometry.vertices[4].z += 20;
        cockpitGeometry.vertices[5].y -= 10;
        cockpitGeometry.vertices[5].z -= 20;
        cockpitGeometry.vertices[6].y += 30;
        cockpitGeometry.vertices[6].z += 20;
        cockpitGeometry.vertices[7].y += 30;
        cockpitGeometry.vertices[7].z -= 20;

        const cockpit = new THREE.Mesh(cockpitGeometry, cockpitMaterial);

        cockpit.castShadow = true;
        cockpit.receiveShadow = true;

        mesh.add(cockpit);

        // Create the engine
        const engineGeometry = new THREE.BoxGeometry(20, 50, 50, 1, 1, 1);
        const engineMaterial = new THREE.MeshPhongMaterial({ color: colors.white, flatShading: true });
        const engine = new THREE.Mesh(engineGeometry, engineMaterial);

        engine.position.x = 40;
        engine.castShadow = true;
        engine.receiveShadow = true;

        mesh.add(engine);

        // Create the tail
        const tailGeometry = new THREE.BoxGeometry(15, 20, 5, 1, 1, 1);
        const tailMaterial = new THREE.MeshPhongMaterial({ color: colors.red, flatShading: true });
        const tail = new THREE.Mesh(tailGeometry, tailMaterial);

        tail.position.set(-40, 20, 0);
        tail.castShadow = true;
        tail.receiveShadow = true;

        mesh.add(tail);

        // Create the wing
        const wingGeometry = new THREE.BoxGeometry(30, 5, 120, 1, 1, 1);
        const wingMaterial = new THREE.MeshPhongMaterial({color: colors.red, flatShading: true});
        const wing = new THREE.Mesh(wingGeometry, wingMaterial);
        wing.position.set(0, 15, 0);
        wing.castShadow = true;
        wing.receiveShadow = true;

        mesh.add(wing);

        // Create the propeller
        this.propeller = new THREE.Object3D();

        const screwGeometry = new THREE.BoxGeometry(20, 10, 10, 1, 1, 1);
        const screwMaterial = new THREE.MeshPhongMaterial({color: colors.brown, flatShading: true});
        const screw = new THREE.Mesh(screwGeometry, screwMaterial);

        screwGeometry.vertices[4].y -= 5;
        screwGeometry.vertices[4].z += 5;
        screwGeometry.vertices[5].y -= 5;
        screwGeometry.vertices[5].z -= 5;
        screwGeometry.vertices[6].y += 5;
        screwGeometry.vertices[6].z += 5;
        screwGeometry.vertices[7].y += 5;
        screwGeometry.vertices[7].z -= 5;


        screw.castShadow = true;
        screw.receiveShadow = true;

        this.propeller.add(screw);

        const bladeGeometry = new THREE.BoxGeometry(1, 80, 10, 1, 1, 1);
        const bladeMaterial = new THREE.MeshPhongMaterial({color: colors.brownDark, flatShading: true});
        const blade = new THREE.Mesh(bladeGeometry, bladeMaterial);

        blade.position.set(8, 0, 0);
        blade.castShadow = true;
        blade.receiveShadow = true;

        this.propeller.add(blade);
        this.propeller.position.set(50, 0, 0);

        mesh.add(this.propeller);

        const wheelRight = this.createWheel();
        const wheelLeft = this.createWheel();
        const wheelBack = this.createWheel();

        wheelRight.position.set(25, -20, 25);
        wheelLeft.position.set(25, -20, -25);
        wheelBack.position.set(-26, -10, 0);
        wheelBack.scale.set(.5, .5, .5);
        wheelBack.rotation.set(0, 0, -.4);

        mesh.add(wheelRight);
        mesh.add(wheelLeft);
        mesh.add(wheelBack);

        const suspensionGeometry = new THREE.BoxGeometry(5, 20, 4);
        suspensionGeometry.applyMatrix(new THREE.Matrix4().makeTranslation(15, 10, 0));

        const suspensionMaterial = new THREE.MeshPhongMaterial({color: colors.red, flatShading: true});
        const suspension = new THREE.Mesh(suspensionGeometry, suspensionMaterial);
        suspension.position.set(-40, -5, 0);
        suspension.rotation.z = -.5;
        mesh.add(suspension);

        mesh.scale.set(.25, .25, .25);

        this.pilot.mesh.position.set(-8, 15 , 0);
        mesh.add(this.pilot.mesh);

        return mesh;
    }

    public animate() {
        this.propeller.rotation.x += .3;
        this.pilot.animate();
    }
}
