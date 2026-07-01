import { createContext, useState } from "react";

export const SongContext = createContext()

const defaultSong = {
    songUrl: "https://ik.imagekit.io/ayushkumar/moodify/songs/Haaye_Oye__Official_Remix__QARAN_ft._Ash_King_DJSathi__Mp2F9tNvG.mp3",
    coverUrl: "https://ik.imagekit.io/ayushkumar/moodify/posters/Haaye_Oye__Official_Remix__QARAN_ft._Ash_King_DJSathi__xptkpqzer.jpeg",
    title: "Haaye Oye (Official Remix) QARAN ft. Ash King(DJSathi)",
    mood: "happy",
}

export function SongContextProvider({ children }) {
    const [song, setsong] = useState(defaultSong)

    const [loading, setloading] = useState(false)

    return (
        <SongContext.Provider value={{ song, setsong, loading, setloading }}>
            {children}
        </SongContext.Provider>
    )
}