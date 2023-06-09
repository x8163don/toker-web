import {Link} from 'react-router-dom';
import {Button, Navbar, Footer} from 'flowbite-react';

function HomePage() {
    return (
        <div className="flex flex-col justify-center items-center max-w-7xl">
            <div className="container">
                <Navbar container fluid rounded>
                    <Navbar.Brand href="/">
                        <img
                            src="./logo512.png"
                            className="mr-3 h-6 sm:h-9"
                            alt="Tokert Logo"
                        />
                    </Navbar.Brand>

                    <div className="flex md:order-2">
                        <Link to="/login">
                            <Button>
                                登入
                            </Button>
                        </Link>
                        <Navbar.Toggle/>
                    </div>
                    <Navbar.Collapse>
                    </Navbar.Collapse>
                </Navbar>
            </div>

            <Footer container>
                <div className="w-full">
                    <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
                        <div>
                            <Footer.Brand
                                alt="Tokert Logo"
                                name="拓客"
                                src="./logo512.png"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
                            <div>
                                <Footer.Title title="關於"/>
                                <Footer.LinkGroup col>
                                    <Footer.Link href="#">
                                        拓客
                                    </Footer.Link>
                                </Footer.LinkGroup>
                            </div>
                            <div>
                                <Footer.Title title="法律"/>
                                <Footer.LinkGroup col>
                                    <Footer.Link href="#">
                                        隱私權政策
                                    </Footer.Link>
                                    <Footer.Link href="#">
                                        服務使用條款
                                    </Footer.Link>
                                </Footer.LinkGroup>
                            </div>
                        </div>
                    </div>
                    <Footer.Divider/>
                    <div className="w-full sm:flex sm:items-center sm:justify-between">
                        <Footer.Copyright
                            by="拓客"
                            href="#"
                            year={2023}
                        />
                    </div>
                </div>
            </Footer>
        </div>
    );
}

export default HomePage;