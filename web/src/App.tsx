import './styles/app.css'
import Nav from './components/Nav'
import Hero from './sections/Hero'
import Sovereignty from './sections/Sovereignty'
import Federation from './sections/Federation'
import Architecture from './sections/Architecture'
import ArchitectureDiagram from './sections/ArchitectureDiagram'
import Aden from './sections/Aden'
import Governance from './sections/Governance'
import Platform from './sections/Platform'
import Contact from './sections/Contact'

export default function App() {
  return (
    <>
      <div className="aurora" aria-hidden />
      <div className="grain" aria-hidden />
      <Nav />
      <main>
        <Hero />
        <Sovereignty />
        <Federation />
        <Architecture />
        <ArchitectureDiagram />
        <Aden />
        <Governance />
        <Platform />
        <Contact />
      </main>
    </>
  )
}
