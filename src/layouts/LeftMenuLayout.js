import {Outlet} from 'react-router-dom';
import LeftMenu from '../components/LeftMenu';

function LeftMenuLayout() {
    return (
        <>
            <LeftMenu/>
            <Outlet/>
        </>
    );
}

export default LeftMenuLayout;