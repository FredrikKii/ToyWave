import { createHashRouter } from "react-router-dom";
import Root from "./Root.jsx";
import StoreGrid from "../components/StoreGrid.jsx"
import Cart from "../components/Cart.jsx"
import ContactForm from "../components/ContactForm.jsx"



const router = createHashRouter([
	{
		path: "/",

		element: <Root/>,

		children: [
			
			{
				path: "/",
				element: <StoreGrid/>
			},

			{
				path: "/Cart",
				element: <Cart/>
			},

			{
				path: "/ContactForm",
				element: <ContactForm/>
			}

		]
	}
]);

export { router }