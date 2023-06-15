import {Outlet} from 'react-router-dom';
import SideMenu from '../components/SideMenu';

function SideMenuLayout() {
    return (
        <main className="flex h-full overflow-hidden bg-white dark:bg-gray-900">
            <SideMenu className="fixed w-1/3 hidden z-20 h-full top-0 left-0 pt-16 flex lg:flex flex-shrink-0 flex-col w-64 transition-width duration-75 fixed inset-0 z-30 h-full w-64 flex-none lg:static lg:block lg:h-auto lg:overflow-y-visible lg:pt-0"/>
            <Outlet/>
        </main>
    );
}

export default SideMenuLayout;