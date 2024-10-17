import { type AnimationHookType, type RunType } from "./types"
import styles from './animations.module.css'

export const useShake: AnimationHookType = () => {
    return {
        run
    }
}

const run: RunType = ({ ref }) => {
    const element = ref.current;
    if (!element) return;

    element.classList.add(styles.shake);
    element.addEventListener('animationend', () => {
        element.classList.remove(styles.shake);
    });
}