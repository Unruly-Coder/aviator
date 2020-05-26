import './static/styles/main.css';
import Sea from './models/sea';
import createLights from './models/light';
import Sky from './models/sky';
import Plane from './models/plane';
import Scene from './scene';
import initPlaneController from './modifiers/planeController';


function init() {
    const sea = new Sea(0, -600, 0);
    const sky = new Sky(0, -600, 0);
    const plane = new Plane(0, 100, 0);
    const lights = createLights();
    const scene = new Scene(document.getElementById('main'));
    const getNextPlanePosition = initPlaneController(scene.width, scene.height);

    const updatePlanePosition = (plane: Plane) => {
        const newPosition = getNextPlanePosition({
            position: {
                x: plane.mesh.position.x,
                y: plane.mesh.position.y,
                z: plane.mesh.position.z
            },
            rotation: {
                x: plane.mesh.rotation.x,
                y: plane.mesh.rotation.y,
                z: plane.mesh.rotation.z
            }
        });

        plane.mesh.position.x = newPosition.position.x;
        plane.mesh.position.y = newPosition.position.y;
        plane.mesh.position.z = newPosition.position.z;

        plane.mesh.rotation.z = newPosition.rotation.z;
        plane.mesh.rotation.x = newPosition.rotation.x;
    };


    lights.forEach(light => {
        scene.add(light);
    });

    scene.add(sea.mesh)
         .add(sky.mesh)
         .add(plane.mesh)
         .onEveryLoop(() => {
             plane.animate();
             sea.animate();
             sky.animate();

             updatePlanePosition(plane);

         })
         .startRendering();

}

window.addEventListener('load', init, false);
