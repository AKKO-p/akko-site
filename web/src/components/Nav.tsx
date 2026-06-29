import { motion } from 'framer-motion'
import Blason from './Blason'

export default function Nav() {
  return (
    <motion.header
      className="nav"
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
    >
      <div className="shell nav__inner">
        <a className="nav__brand" href="#top" aria-label="AKKO, accueil">
          <Blason size={30} mode="static" breathe={false} />
          <span className="nav__word">AKKO</span>
        </a>
        <nav className="nav__links" aria-label="Navigation principale">
          <a href="#plateforme">Plateforme</a>
          <a href="#architecture">Architecture</a>
          <a href="#ia">IA gouvernée</a>
          <a href="#produit">En action</a>
        </nav>
        <a className="btn btn-primary nav__cta" href="#contact">Nous contacter</a>
      </div>
    </motion.header>
  )
}
