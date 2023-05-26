import { FaLinkedin } from "react-icons/fa"
import { Link } from "react-router-dom"
import './Footer.css'

function Footer() {
  return (
    <div className="footer-container">
        <div className="footer-links">
            <Link to="/about" className="footer-link">About</Link>
            <Link to="/contact" className="footer-link">Contact</Link>
            <a href="https://www.linkedin.com/in/ionut-catalin-luca-b4938924b/" target="_blank" rel="noreferrer" ><FaLinkedin size={30}></FaLinkedin></a>
        </div>
        <p className="copyright">@Copyrighted Ionut Luca </p>
       </div>
  )
}

export default Footer
