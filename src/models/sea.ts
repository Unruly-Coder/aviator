import * as THREE from 'three';
import {colors} from "../settings";
import {Geometry} from "three";

type WaveProps = {
    x: number;
    y: number;
    z: number;
    angle: number;
    amplitude: number;
    speed: number;
};

export default class Sea {
    public mesh: THREE.Mesh = this.createMesh();
    private wavesProps: WaveProps[] = this.getWavesProps();

    constructor(x: number, y: number, z: number) {
        this.mesh.position.set(x, y, z);
    }

    private getWavesProps(): WaveProps[] {
        const geometry = this.mesh.geometry as Geometry;

        return  geometry.vertices.map(vertex => ({
            y: vertex.y,
            x: vertex.x,
            z: vertex.z,
            angle: Math.random() * Math.PI * 2,  // a random angle
            amplitude: 5 + Math.random() * 15, // a random distance
            speed: 0.016 + Math.random() * 0.032  // a random speed between 0.016 and 0.048 radians / frame
        }));
    }

    private  createMesh() {
        const geometry = new THREE.CylinderGeometry(600, 600, 800, 40, 10);
        geometry.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI / 2));

        const material = new THREE.MeshPhongMaterial({
            color: colors.blue,
            transparent: true,
            opacity: .6,
            flatShading: true,

        });

        const mesh = new THREE.Mesh(geometry, material);
        mesh.receiveShadow = true;

        return mesh;
    }

    public animate() {
        this.mesh.rotation.z += .005;

        const geometry = this.mesh.geometry as Geometry;
        geometry.vertices.forEach((vertex, index, vertices) => {
            const props = this.wavesProps[index];
            vertices[index].x = props.x + Math.cos(props.angle) * props.amplitude;
            vertices[index].y = props.y + Math.sin(props.angle) * props.amplitude;

            props.angle += props.speed;

            geometry.verticesNeedUpdate = true;
        });
    }
}
