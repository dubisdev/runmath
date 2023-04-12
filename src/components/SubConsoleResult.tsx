import { useBiggerScreen } from "../hooks/useBiggerScreen";
import styles from "./console.module.css";

export const shouldDisplayInSubconsole = (input: string, result: string) => {
    return input.length + 3 + result.length > 34;
};

export const SubConsoleResult = ({ value }: { value: string }) => {
    useBiggerScreen()
    return <input
        className={styles.subconsoleResult}
        disabled
        value={value}
    />
}
