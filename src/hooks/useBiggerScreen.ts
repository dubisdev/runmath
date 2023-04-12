import { useEffect } from "react"
import { appWindow, LogicalSize } from "@tauri-apps/api/window"

export const useBiggerScreen = () => {
    useEffect(() => {
        appWindow.setSize(new LogicalSize(700, 88))

        return () => {
            appWindow.setSize(new LogicalSize(700, 44))
        }
    }, [])
}
