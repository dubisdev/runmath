import { useEffect } from "react"
import { getCurrent, LogicalSize } from "@tauri-apps/api/window"

export const useBiggerScreen = () => {
    useEffect(() => {
        getCurrent().setSize(new LogicalSize(700, 88))

        return () => {
            getCurrent().setSize(new LogicalSize(700, 46))
        }
    }, [])
}
