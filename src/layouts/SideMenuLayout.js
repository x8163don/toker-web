import {Outlet} from 'react-router-dom';
import SideMenu from '../components/LeftMenu';

function SideMenuLayout() {
    return (
        <>
            <SideMenu/>
            <Outlet/>
        </>
    );
}

export default SideMenuLayout;