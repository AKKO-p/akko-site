import './styles/app.css'
import Nav from './components/Nav'
import Hero from './sections/Hero'
import Sovereignty from './sections/Sovereignty'
import Flagships from './sections/Flagships'
import Filmstrip from './sections/Filmstrip'
import Architecture from './sections/Architecture'
import ArchitectureDiagram from './sections/ArchitectureDiagram'
import Contact from './sections/Contact'

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Sovereignty />
        <Flagships />
        <Filmstrip />
        <Architecture />
        <ArchitectureDiagram />
        <Contact />
      </main>
    </>
  )
}
