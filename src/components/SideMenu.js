import {NavLink} from 'react-router-dom';
import {Sidebar} from 'flowbite-react';
import {HiUser, HiUsers} from 'react-icons/hi/';


function SideMenu() {
    return (
        <Sidebar aria-label="Default sidebar example">
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    <Sidebar.Item icon={HiUsers}><NavLink to="/customers">客戶管理</NavLink></Sidebar.Item>
                </Sidebar.ItemGroup>
                <Sidebar.ItemGroup>
                    <Sidebar.Item icon={HiUser}><NavLink to="/account">帳戶</NavLink></Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    );
}

export default SideMenu;