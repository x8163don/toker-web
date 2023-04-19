import {NavLink} from 'react-router-dom';
import {Sidebar} from 'flowbite-react';
import {HiUser, HiUsers, HiInbox} from 'react-icons/hi/';
import {IoSettingsSharp} from 'react-icons/io5/';


function SideMenu() {
    return (
        <div className="w-fit">
            <Sidebar aria-label="Default sidebar example">
                <Sidebar.Items>
                    <Sidebar.ItemGroup>
                        {/*<Sidebar.Item icon={HiInbox}><NavLink to="/dashboard">Today</NavLink></Sidebar.Item>*/}
                        <Sidebar.Item icon={HiUsers}><NavLink to="/customers">客戶管理</NavLink></Sidebar.Item>
                    </Sidebar.ItemGroup>
                    <Sidebar.ItemGroup>
                        <Sidebar.Item icon={IoSettingsSharp}><NavLink to="">設定</NavLink></Sidebar.Item>
                        <Sidebar.Item icon={HiUser}><NavLink to="">帳戶</NavLink></Sidebar.Item>
                    </Sidebar.ItemGroup>
                </Sidebar.Items>
            </Sidebar>
        </div>
    );
}

export default SideMenu;