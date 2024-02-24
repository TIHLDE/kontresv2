import styles from './animations.module.css'

import { AnimationHookType, RunType } from "./types"

export const useButtonPop: AnimationHookType = () => {
    return { run }
}

const run: RunType = ({ ref }) => {
    const button = ref.current;
    if (!button) return;

    button.classList.add(styles.buttonPop);
    button.addEventListener('animationend', () => {
        button.classList.remove(styles.buttonPop);
    });
}