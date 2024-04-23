import { Link, NavLink, Outlet } from "react-router-dom";
import "../App.css"
import "../stylesheet/Header.css"


const Root = () => (
	<div className="app">
		<header>
            <div className="logoContainer">
            <h1 className="toy">Toy  </h1>
            <h1 className="wave">Wave</h1>
            </div>
            <div className="sloganContainer">
            <p>SPLASHING FUN</p>
            </div>
			<nav className="navMenu">
				<NavLink to="/" className="nav-login">Store</NavLink>	
				<NavLink to="/Cart" className="nav-login">Cart</NavLink>	
				<NavLink to="/ContactForm" className="nav-login">ContactForm</NavLink>	
			</nav>
            
		</header>
		<main>
			<Outlet />
		</main>
	</div>
)

export default Root;