import React from 'react'
import { ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent} from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { connect, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Icon from '@material-ui/core/Icon';
import tinyHop from '../assets/images/tiny-hop-icon.png'
import { OverlayTrigger, Tooltip, Popover } from 'react-bootstrap';


const SideBar = ({ collapsed, rtl, toggled, handleToggleSidebar }) => {

  const user = useSelector(state => state.user)

  const renderTooltip = (props) => (
    <Popover className="ingredient-tooltip" {...props}>Must be logged in first!</Popover>
  )

  return(
    <ProSidebar style={{position: "fixed"}}className="sidebar-container shadow"
      rtl={rtl}
      collapsed={collapsed}
      toggled={toggled}
      breakPoint="xs"
      onToggle={handleToggleSidebar}
    >
      <SidebarHeader className="sidebar-header">
        <img src={tinyHop} alt="hop-icon"></img>
        <Link to="/" className="brewkeeper-logo" > BrewKeeper </Link> 
      </SidebarHeader>

      <SidebarContent>
        <Menu iconShape="circle">
          <MenuItem icon={null}>
            <Link to="/" className="sidebar-link">Recipes</Link>
          </MenuItem>
        </Menu>

         
        <Menu>
          <MenuItem icon={null}>
            {user ? <Link to="/recipes/new" className="sidebar-link">Create a Recipe</Link> :
            <OverlayTrigger
              placement="right"
              delay={{show: 250, hide: 400}}
              overlay={renderTooltip}>
                <h3 className="sidebar-link">Create a Recipe</h3>
              </OverlayTrigger>
             }
          </MenuItem>
        </Menu>
        <Menu>
          <MenuItem icon={null}>
            {user ? <Link to="/profile" className="sidebar-link">Profile</Link> :
            <OverlayTrigger
              placement="right"
              delay={{show: 250, hide: 400}}
              overlay={renderTooltip}>
                <h3 className="sidebar-link" >Profile</h3>
            </OverlayTrigger>}
          </MenuItem>
        </Menu>

        <Menu>
          <MenuItem icon={null}>
            <Link to="/brewers" className="sidebar-link">Brewers</Link>
            </MenuItem>
        </Menu>

        <Menu>
          <MenuItem icon={null}>
            <Link to="/styles" className="sidebar-link">Styles</Link>
            </MenuItem>
        </Menu>
        
        <Menu iconShape="circle" >
          <SubMenu
            
            title={"Ingredients"}
            icon={null}
          >
            <MenuItem><Link to="/fermentables">Fermentables</Link></MenuItem>
            <MenuItem><Link to="/hops">Hops</Link></MenuItem>
            <MenuItem><Link to="/yeast">Yeast</Link></MenuItem>
          </SubMenu>
        </Menu>
      </SidebarContent>

      <SidebarFooter style={{ textAlign: 'center' }}>
        <div
          className="sidebar-btn-wrapper"
          style={{
            padding: '14px 14px',
          }}
        >by Dave Wisecarver 
          <a href="https://github.com/dwisecar">
            <Icon className="fa fa-github"></Icon>
          </a><span> </span>
          <a href="https://www.linkedin.com/in/david-wisecarver-15197814a/">
            <Icon className="fa fa-linkedin"></Icon>
          </a>
        </div>
      </SidebarFooter>
    </ProSidebar>
    
  )
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}
export default connect(mapStateToProps)(SideBar)