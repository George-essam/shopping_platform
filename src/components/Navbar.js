import React from 'react';
import { Button, Container,Nav, Navbar as NavbarBs } from 'react-bootstrap';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { NavLink , useNavigate} from 'react-router-dom';
import '../App.css';
import { useShoppingCart } from '../context/ShoppingCartContext';
import { STATUS } from './status';


const Navbar = () => {
  const logoutHandle = ()=>{
    STATUS.isLogged = false;
    //navigate('/login');
    navigate('/home');
 };

 const navigate = useNavigate()
  const{openCart,cartQuantity}=useShoppingCart();

  return (<NavbarBs sticky="top" className="bg-pistachio shadow-sm mb-3"> 
    <Container className="Navbar">
        <a class="navbar-brand fw-bold fs-4" href="#">
          LA COLLECTION
        </a>
        
        <Nav className='me-auto'>
            <Nav.Link to= "/" as={NavLink}>
                Home
                </Nav.Link>
            <Nav.Link to= "/store" as={NavLink}>
                Store
            </Nav.Link>  
        </Nav>
        <Nav>
      {STATUS.isLogged ? 
       (<Nav.Item>
        <Button variant="link" onClick={logoutHandle}>
          <a href="" className="btn btn-outline-dark me-2"><i className="fa fa-sign-in me-1"></i> Login</a>
        </Button> 
        </Nav.Item>
        ): (
        <Nav.Item>
      <Nav.Link to="/login" as={NavLink}>
              Login
            </Nav.Link>
            </Nav.Item>
            )}
            
    </Nav>

    <Button onClick={()=>navigate('/profile')} variant="transparent">            
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="blue" class="profile">
          <path  d="M16.5 7.063C16.5 10.258 14.57 13 12 13c-2.572 0-4.5-2.742-4.5-5.938C7.5 3.868 9.16 2 12 2s4.5 1.867 4.5 5.063zM4.102 20.142C4.487 20.6 6.145 22 12 22c5.855 0 7.512-1.4 7.898-1.857a.416.416 0 0 0 .09-.317C19.9 18.944 19.106 15 12 15s-7.9 3.944-7.989 4.826a.416.416 0 0 0 .091.317z" 
          fill="#000000"/></svg>
        
        </Button>
        
        
        <Button
            style={{ width: "3rem", height: "3rem", position: "relative"}}
            variant="outline-primary"
            className="rounded-circle"
            onClick={openCart}
          >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-shopping-cart">
            <circle cx="9" cy="21" r="1">
                </circle>
                <circle cx="20" cy="21" r="1">
                    </circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6">
                        </path>
                        </svg>
                        <div
              className="rounded-circle bg-danger d-flex justify-content-center align-item-center"
              style={{
                color: "white",
                position: "absolute",
                width: "1.5rem",
                height: "1.5rem",
                bottom: 0,
                right: 0,
                transform: "translate(25%, 25%)",
              }}
            >
            {cartQuantity}
            </div>
                        
        </Button>
    </Container>
  </NavbarBs>);
};

export default Navbar


// sticky to fix position of nav bar on top
//me-auto to put cart button at end of nav bar