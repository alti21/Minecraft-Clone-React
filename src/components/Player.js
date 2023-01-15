import { useSphere } from "@react-three/cannon";
import { useFrame, useThree } from "@react-three/fiber"
import { useEffect, useRef } from "react";
import { Vector3 } from "three";
import { useKeyboard } from "../hooks/useKeyboard";

const JUMP_FORCE = 4;
const SPEED = 4;

export const Player = () => {
    // we can use the actions for keyboard presses to control the player's 
    // movements
    const { moveForward, moveBackward, moveRight, moveLeft, jump } = useKeyboard();
    // desctructure so we only use the properties we need

    // the player needs a camera
    const { camera } = useThree(); 
    // geometry to represent the player (geometry that can collide with other
    // geometries). Here our player will be a sphere
    const [ref, api] = useSphere(() => ({
        mass: 1,
        type: 'Dynamic',
        position: [0, 1, 0]
    }))
    // the api lets you apply positions, rotations, velocities, forces and 
    // impulses. it allows us to interact with the object (the sphere in this case)

    // store the position of the player
    const pos = useRef([0, 0, 0]); // this ref tracks the sphere (the player)

    // we want pos to follow the position of the sphere, which will be affected
    // by gravity and physics
    // useEffect will run whenever the sphere api position changes
    useEffect(() => {
        // sphere's position will subscribe to position pos
        // p is a triplet of x, y, and z
        // we basically subscribe to api.position changes of the sphere
        api.position.subscribe((p) => pos.current = p);
    }, [api.position])

    const vel = useRef([0, 0, 0]);
    useEffect(() => {
        api.velocity.subscribe((v) => vel.current = v);
    }, [api.velocity])


    // we want to attach the camera to position pos that we give to the player
    // useFrame hook runs on every frame
    useFrame(() => {
        // we basically glue the camera to our position referencne pos
        camera.position.copy(new Vector3(pos.current[0], pos.current[1], pos.current[2]));
        
        const direction = new Vector3();

        // vector for forward/backward speed and another vector for side 
        // (left/right) speed
        // here, if we press forward and backward movement keys at the same time,
        // the movement will cancel out, so the player will not move in that case
        const frontVector = new Vector3(
                    0, 
                    0, 
                    (moveBackward ? 1 : 0) - (moveForward ? 1 : 0)
        );
        // same with side vector, if we hold left and right movement keys at same 
        // time, the player will not move at all (the movements cancel out)
        const sideVector = new Vector3(
                    (moveLeft ? 1 : 0) - (moveRight ? 1 : 0), 
                    0, 
                    0
        );

        // make sure front and side vectors are correct
        // in relation to the camera
        direction
        .subVectors(frontVector, sideVector)
        .normalize()
        .multiplyScalar(SPEED) // determine player speed
        .applyEuler(camera.rotation)

        // player can only move in x direction and z direction
        api.velocity.set(direction.x, vel.current[1], direction.z)

        // make the player jump on space bar press
        if(jump && Math.abs(vel.current[1]) < 0.05) {
            api.velocity.set(vel.current[0], JUMP_FORCE, vel.current[2]);
        }
    
    })
    // now we have a camera that follows pos (the reference to the player's position)

    return (
        <mesh ref={ref}></mesh>
    )
}