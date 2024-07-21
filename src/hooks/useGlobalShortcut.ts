import { register, unregisterAll } from "@tauri-apps/plugin-global-shortcut"
import { toggleWindowVisibility } from "@utils/toggleWindowView"
import { useEffect } from "react"

const registerGlobalShortcut = async () => {
    await unregisterAll()

    await register("Alt+m", (s) => {
        if (s.state === "Released") toggleWindowVisibility()
    })
}

export const useGlobalShortcut = () => {
    useEffect(() => {
        registerGlobalShortcut()
    }, [])
}
