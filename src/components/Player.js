import { useSphere } from "@react-three/cannon";
import { useFrame, useThree } from "@react-three/fiber"
import { useEffect, useRef } from "react";
import { Vector3 } from "three";

export const Player = () => {
    // the player needs a camera
    const { camera } = useThree(); 
    // geometry to represent the player (geometry that can collide with other
    // geometries). Here our player will be a sphere
    const [ref, api] = useSphere(() => ({
        mass: 1,
        type: 'Dynamic',
        position: [0, 0, 0]
    }))
    // the api lets you apply positions, rotations, velocities, forces and 
    // impulses. it allows us to interact with the object (the sphere in this case)

    // store the position of the player
    const pos = useRef([0, 0, 0]);

    // we want pos to follow the position of the sphere, which will be affected
    // by gravity and physics
    // useEffect will run whenever the sphere api position changes
    useEffect(() => {
        // sphere's position will subscribe to position pos
        // p is a triplet of x, y, and z
        api.position.subscribe((p) => pos.current = p);
    }, [api.position])


    // we want to attach the camera to position pos that we give to the player
    // useFrame hook runs on every frame
    useFrame(() => {
        camera.position.copy(new Vector3(pos.current[0], pos.current[1], pos.current[2]));
    })
    // now we have a camera that follows pos (the reference to the player's position)

    return (
        <mesh ref={ref}></mesh>
    )
}