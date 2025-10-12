// Home *does* export `metadata`, so mirror it
import Home, { metadata as _metadata } from '../page'
export default Home
export const metadata = _metadata
