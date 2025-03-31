import styles from "./style.module.scss"

interface NavigateButton {
    prev: boolean;
}

export function NavigateButton ({prev}: NavigateButton) {
    return <button className={styles.button}>{prev ? "<" : ">"}</button>
}