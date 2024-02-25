import styles from './animations.module.css'

import { AnimationHookType, RunType } from "./types"

export const usePop: AnimationHookType = () => {
    return { run }
}

const run: RunType = ({ ref }) => {
    const element = ref.current;
    if (!element) return;

    element.classList.add(styles.buttonPop);
    element.addEventListener('animationend', () => {
        element.classList.remove(styles.buttonPop);
    });
}