import { usePlane } from "@react-three/cannon";
import { NearestFilter, RepeatWrapping } from "three";
import { groundTexture } from "../images/textures";

export const Ground = () => {
    // pick a shape i.e., plane, that suits your objects contact surface.
    // the reference will be placed on the mesh that Cannon will control
    const [ref] = usePlane(() => ({
        // this callback has properties of the plane
        // unit is radians, not degrees, here we rotate plane by -45 degrees
        // since Pi / 4 is 45 degrees
        rotation: [ -Math.PI / 4 , 0, 0], 
        position: [0,0,0]
    }))

    // get rid of smearing
    // magfilter: How the texture is sampled when a texel (texture pixel)
    //  covers more than one pixel. 
    groundTexture.magFilter = NearestFilter;
    // the texture is originally stretched out, so we make it repeat
    // to properly display the texture
    groundTexture.wrapS = RepeatWrapping; // how texture is wrapped horizontally
    groundTexture.wrapT = RepeatWrapping; // how texture is wrapped vertically
    // how many times the texture is repeated accross the surface both
    // horizontally and vertically
    groundTexture.repeat.set(100, 100); 

    // we will tie the ref of the plane to a mesh, so that the plane will be
    // affected by gravity and/or other objects inside the physics world.
    // args is the size of the plane ([length, width])
    return (
        <mesh ref={ref}>
            <planeBufferGeometry attach="geometry" args={[100, 100]} />
            <meshStandardMaterial attach="material" map={groundTexture} />
        </mesh>
    )
}