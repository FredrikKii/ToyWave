import { Link, NavLink, Outlet } from "react-router-dom";
import "../App.css"
import "../stylesheet/Header.css"
import { FaBasketShopping } from "react-icons/fa6";
import Footer from '../components/Footer.jsx'


const Root = () => (
	<div className="app">
		<header>
            <NavLink to="/Cart" className="cart"><FaBasketShopping /></NavLink>	 
            <div className="logoContainer">
            <h1 className="toy">Toy  </h1>
            <h1 className="wave">Wave</h1>
          
            </div>
            <div className="sloganContainer">
            <p>SPLASHING FUN</p>
            </div>
			<nav className="navMenu">
				<NavLink to="/" className="nav-login">Store</NavLink>	
				
				<NavLink to="/ContactForm" className="nav-login">Contact</NavLink>	
			</nav>
            
		</header>
		<main>
			<Outlet />
		</main>
        <Footer/>
	</div>
)

export default Root;