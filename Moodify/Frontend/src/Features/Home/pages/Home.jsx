import FaceExpression from '../../Expressions/Components/FaceExpression'
import SongPlayer from '../components/songPlayer'
import { useSong } from '../Hooks/useSong'

const Home = () => {
  const { handleGetSong } = useSong()
  return (
    <div style={{ display: 'grid', gap: '24px', padding: '24px', maxWidth: '1100px', margin: '0 auto' }}>
      <FaceExpression onClick={(expression) => { handleGetSong({ mood: expression }) }} />
      <SongPlayer />
    </div>
  )
}

export default Home
