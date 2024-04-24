import Textra from "react-textra";
import styles from "./console.module.css";

const dateAsSum = new Date().toLocaleDateString();

const placeHolderContents = [
  dateAsSum,
  "alt + q = quit",
  "alt + s = settings",
  "alt + m = toggle visibility",
  "enter = copy to clipboard",
  "tab = select all",
];

export const InputPlaceholder = () => {
  return (
    <Textra
      data={placeHolderContents}
      stopDuration={6000}
      effect="scale"
      className={styles.placeholder}
    />
  );
};
