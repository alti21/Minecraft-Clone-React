import { Sky } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

function App() {
  return (
    <>
      {/* We cannot put an HTML tag inside the Canvas, else we get an error */}
      <Canvas>
        <Sky sunPosition={[100, 100, 20]}/>
      </Canvas>
    </>
  );
}

export default App;
