import {NavLink} from 'react-router-dom';

function LeftMenu() {
    return (
        <div>
            <nav>
                <ul>
                    <li><NavLink to="/" end>顧客管理</NavLink></li>
                    <li><NavLink to="/" end>設定</NavLink></li>
                </ul>
            </nav>
        </div>
    );
}

export default LeftMenu;