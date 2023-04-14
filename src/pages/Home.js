import {Link} from 'react-router-dom';

function HomePage() {
    return (
        <div>
            <Link to="/login">Login</Link>
            <h1>The Home Page</h1>
        </div>
    );
}

export default HomePage;