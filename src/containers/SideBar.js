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
import { Link, withRouter } from 'react-router-dom';
import hops from "../images/hops.jpg"

const SideBar = ({ collapsed, rtl, toggled, handleToggleSidebar }) => {

  const user = useSelector(state => state.user)

  return(
    <ProSidebar className="sidebar-container"
      image={hops}
      rtl={rtl}
      collapsed={collapsed}
      toggled={toggled}
      breakPoint="md"
      onToggle={handleToggleSidebar}
    >
      <SidebarHeader className="sidebar-header">
        <Link to="/">BrewKeeper</Link>
      </SidebarHeader>

      <SidebarContent>
        <Menu iconShape="circle">
          <MenuItem icon={null}>
            <Link to="/">RECIPES</Link>
          </MenuItem>
        </Menu>

        {user && 
        <><Menu>
          <MenuItem icon={null}>
            <Link to="/recipes/new">CREATE A RECIPE</Link>
          </MenuItem>
        </Menu>
        <Menu>
          <MenuItem icon={null}>
            <Link to="/profile">PROFILE</Link>
          </MenuItem>
        </Menu></>}

        <Menu>
          <MenuItem icon={null}>
            <Link to="/brewers">BREWERS</Link>
            </MenuItem>
        </Menu>

        <Menu>
          <MenuItem icon={null}>
            <Link to="/styles">STYLES</Link>
            </MenuItem>
        </Menu>
        
        <Menu iconShape="circle">
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
            padding: '20px 24px',
          }}
        >
          <a
            href="https://github.com/dwisecar"
            target="_blank"
            className="sidebar-btn"
            rel="noopener noreferrer"
          >
            
            <span>github</span>
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