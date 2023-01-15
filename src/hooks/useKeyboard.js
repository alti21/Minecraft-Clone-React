import { useCallback, useEffect, useState } from "react";

// each key of keyActionMap represents e.code or event.code of the 
// keyboard key that is pressed
function actionByKey(key) {
    const keyActionMap = {
        KeyW: 'moveForward',
        KeyA: 'moveLeft',
        KeyS: 'moveBackward',
        KeyD: 'moveRight',
        Space: 'jump',
        Digit1: 'dirt',
        Digit2: 'grass',
        Digit3: 'glass',
        Digit4: 'wood',
        Digit5: 'log',
    }
    return keyActionMap[key];
}

export const useKeyboard = () => {
    const [actions, setActions] = useState({
        moveForward: false,
        moveBackward: false,
        moveLeft: false,
        moveRight: false,
        jump: false,
        texture1: false,
        texture2: false,
        texture3: false,
        texture4: false,
        texture5: false,
    })

    // will set the action to true since the action occurs once the player
    // presses down on a key
    const handleKeyDown = useCallback((e) => {
        const action = actionByKey(e.code);
        if(action) {
            setActions((prev) => {
                return ({
                    ...prev,
                    [action]: true,
                })
            })
        }
    }, []) // empty array means callback is memoized once and callback is returned

    // will set the action to false since the action occurs once the player
    // releases a key
    const handleKeyUp = useCallback((e) => {
        const action = actionByKey(e.code);
        if(action) {
            setActions((prev) => {
                return ({
                    ...prev,
                    [action]: false,
                })
            })
        }        
    }, [])

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);
        // clean up function
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
        }
    }, [handleKeyDown, handleKeyUp])
    // this useEffect will only run once, on component's 1st render, since
    // that is the only time when handleKeyDown and handleKeyUp are changed

    return actions;
}