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

const SideBar = ({ collapsed, rtl, toggled, handleToggleSidebar }) => {

  const user = useSelector(state => state.user)

  return(
    <ProSidebar style={{position: "fixed"}}className="sidebar-container shadow"
      rtl={rtl}
      collapsed={collapsed}
      toggled={toggled}
      breakPoint="md"
      onToggle={handleToggleSidebar}
    >
      <SidebarHeader className="sidebar-header">
        <Link to="/" className="brewkeeper-logo" >BrewKeeper</Link>
      </SidebarHeader>

      <SidebarContent>
        <Menu iconShape="circle">
          <MenuItem icon={null}>
            <Link to="/" className="sidebar-link">RECIPES</Link>
          </MenuItem>
        </Menu>

        {user && 
        <><Menu>
          <MenuItem icon={null}>
            <Link to="/recipes/new" className="sidebar-link">CREATE A RECIPE</Link>
          </MenuItem>
        </Menu>
        <Menu>
          <MenuItem icon={null}>
            <Link to="/profile" className="sidebar-link">PROFILE</Link>
          </MenuItem>
        </Menu></>}

        <Menu>
          <MenuItem icon={null}>
            <Link to="/brewers" className="sidebar-link">BREWERS</Link>
            </MenuItem>
        </Menu>

        <Menu>
          <MenuItem icon={null}>
            <Link to="/styles" className="sidebar-link">STYLES</Link>
            </MenuItem>
        </Menu>
        
        <Menu iconShape="circle" >
          <SubMenu
            
            title={"INGREDIENTS"}
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
            padding: '10px 14px',
          }}
        >by Dave Wisecarver 
          <br></br>
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