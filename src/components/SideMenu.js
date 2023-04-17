import {NavLink} from 'react-router-dom';
import {Sidebar} from 'flowbite-react';

function SideMenu() {
    return (
        <div className="w-fit">
            <Sidebar aria-label="Default sidebar example">
                <Sidebar.Items>
                    <Sidebar.ItemGroup>
                        <Sidebar.Item
                            href="#"
                        >
                            <NavLink to="">客戶管理</NavLink>
                        </Sidebar.Item>
                    </Sidebar.ItemGroup>
                    <Sidebar.ItemGroup>
                        <Sidebar.Item><NavLink to="">設定</NavLink></Sidebar.Item>
                        <Sidebar.Item><NavLink to="">帳戶</NavLink></Sidebar.Item>
                    </Sidebar.ItemGroup>
                </Sidebar.Items>
            </Sidebar>
        </div>
    );
}

export default SideMenu;