import {Outlet} from 'react-router-dom';
import SideMenu from '../components/SideMenu';

function SideMenuLayout() {
    return (
        <main className="flex h-full overflow-hidden bg-white dark:bg-gray-900">
            <SideMenu className="fixed hidden z-20 h-full top-0 left-0 pt-16 flex lg:flex flex-shrink-0 flex-col w-64 transition-width duration-75"/>
            <Outlet className="fixed hidden z-80 h-full top-0 left-0 pt-16"/>
        </main>
    );
}

export default SideMenuLayout;