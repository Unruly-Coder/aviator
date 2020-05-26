import scaleVale from "./../utils/scaleValue";
import checkIfMobileOrTablet from "./../utils/checkIfMobileOrTablet";

const planeTargetPosition: ObjectPosition = {
    position: {
        x: 0,
        y: 0,
        z: 0
    },
    rotation: {
        x: 0,
        y: 0,
        z: 0
    }};

type ObjectPosition = {
    position: {
        x: number,
        y: number,
        z: number
    },
    rotation: {
        x: number,
        y: number,
        z: number,
    }
}

export default function initPlaneController(sceneWidth: number, sceneHeight: number): typeof getNextPlanePosition {
    let tx: number = 0;
    let ty: number = 0;
    // @ts-ignore
    if (checkIfMobileOrTablet() && window.DeviceOrientationEvent ) {
        console.info("Mobile detected");
        window.addEventListener('deviceorientation', (event: DeviceOrientationEvent) => {
            ty = (-1 + (Math.abs(event.beta) / 180 * 2)) * -1;
            tx = (Math.abs(event.alpha) / 90);

            planeTargetPosition.position.y = scaleVale(ty, -1, 1, 25, 175);
        });
    } else {
        console.info("Desktop detected");

        document.addEventListener('mousemove', (event: MouseEvent) => {
            ty = 1 - event.clientY / sceneHeight;
            tx = event.clientX / sceneWidth;

            planeTargetPosition.position.y = scaleVale(ty, 0, 1, 25, 175);
        });
    }



    return getNextPlanePosition;
}


function getNextPlanePosition(currentPosition: ObjectPosition): ObjectPosition {
    const y = (currentPosition.position.y + ((planeTargetPosition.position.y - currentPosition.position.y) * .1));
    const x = planeTargetPosition.position.x;

    const rotationZ =  (planeTargetPosition.position.y - currentPosition.position.y) * 0.01;
    const rotationX = (currentPosition.position.y - planeTargetPosition.position.y) * 0.006;

    return {
        position: {
            x: x,
            y: y,
            z: planeTargetPosition.position.z
        },
        rotation: {
            x: rotationX,
            y: planeTargetPosition.rotation.y,
            z: rotationZ
        }
    }
}
