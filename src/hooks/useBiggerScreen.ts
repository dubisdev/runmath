import { useEffect } from "react"
import { getCurrentWindow, LogicalSize } from "@tauri-apps/api/window"

export const useBiggerScreen = () => {
    useEffect(() => {
        getCurrentWindow().setSize(new LogicalSize(700, 88))

        return () => {
            getCurrentWindow().setSize(new LogicalSize(700, 46))
        }
    }, [])
}
