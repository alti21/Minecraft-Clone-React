import { Physics } from '@react-three/cannon';
import { Sky } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Ground } from './components/Ground';
import { Player } from './components/Player';

function App() {
  return (
    <>
      {/* We cannot put an HTML tag inside the Canvas, else we get an error */}
      <Canvas>
        <Sky sunPosition={[100, 100, 20]}/>
        {/* ambientLight lights up every 3d surface */}
        <ambientLight intensity={0.5} />
        <Physics>
          <Player />
          <Ground />
        </Physics>
      </Canvas>
    </>
  );
}

export default App;
