import { useContext } from "react";
import { SongContext } from "../song.context";
import { getSong } from "../services/song.service";

export function useSong() {
    const context = useContext(SongContext)
    if (!context) {
        throw new Error("useSong must be used within a SongContextProvider")
    }

    const { loading, setloading, song, setsong } = context

    async function handleGetSong({ mood }) {
        setloading(true)
        const data = await getSong({ mood })
        setsong(data.song)
        setloading(false)
    }

    return { loading, song, handleGetSong }

}