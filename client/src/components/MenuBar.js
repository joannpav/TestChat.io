import React, { useContext, useState } from 'react';
import { Menu, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth';

function MenuBar() {
    const { user, logout } = useContext(AuthContext);
    const pathname = window.location.pathname;
    
    const path = pathname === '/' ? 'home' : pathname.substr(1);
    const [activeItem, setActiveItem] = useState(path);

    const handleItemClick = (e, { name }) => setActiveItem(name);        
    // console.log(`what is the user in here? ${JSON.stringify(user)}`);
    // const userAndOrg = `${user.orgName}: ${user.username}`;

    const menuBar = user ? (
        <Menu pointing secondary size="massive" color="teal">            
            <Menu.Item data-cy="loggedInUsername" name={user.username} active as={Link} to="/" />
            <Menu.Item><Label color='black' horizontal>{user.orgName}</Label></Menu.Item>
            <Menu.Menu position="right">
                <Menu.Item name="logout" onClick={logout} />               
            </Menu.Menu>
        </Menu>
    ) : (
        <Menu pointing secondary size="massive" color="teal">
            <Menu.Item 
                name="home"
                active={activeItem === 'home'}
                onClick={handleItemClick}
                as={Link}
                to="/"
            />
            <Menu.Menu position="right">
                <Menu.Item
                    name="login"
                    active={activeItem === "login"}
                    onClick={handleItemClick}
                    as={Link}
                    to="/login"
                />
                <Menu.Item
                    name="register"
                    active={activeItem === "register"}
                    onClick={handleItemClick}
                    as={Link}
                    to="/register"
                />
            </Menu.Menu>
        </Menu>
    );
    
    return menuBar;            
}

export default MenuBar;