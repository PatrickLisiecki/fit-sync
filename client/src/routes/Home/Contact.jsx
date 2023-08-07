import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import Memodified from "/Me-modified.png";
import Pat from "/Pat-modified.png";
import Andro from "/Andro-modified.png";
import John from "/John-modified.png";

const Contact = () => {
    return (
        <>
            <Navbar />
            <div className="pt-24"></div>
            <section className="lg:mx-32 mx-16">
                <h1 className="text-4xl font-bold mb-4 text-center pt-8">Meet the Founders</h1>
                <p className="text-center font-semibold">
                    Feel free to reach out! Happy to connect and meet you!
                </p>
                <div className="lg:flex gap-10">
                    <div className="text-center shadow-lg p-4 rounded-xl my-10  dark:bg-white flex-1 transition-transform transform hover:scale-105">
                        <img src={Pat} width={100} height={100} alt="Patrick" />
                        <h3 className="text-lg font-medium  pb-2  ">Patrick Lisiecki</h3>

                        <h4 className="py-4 text-accent">Contact</h4>
                        <p className="text-gray-800 py-1">
                            Portfolio:{" "}
                            <a
                                href="https://patricklisiecki.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-orange-500 hover:text-orange-700"
                            >
                                patricklisiecki.com
                            </a>{" "}
                        </p>
                        <p className="text-gray-800 py-1">
                            Social Media:{" "}
                            <a
                                href="https://www.linkedin.com/in/patricklisiecki/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-orange-500 hover:text-orange-700"
                            >
                                LinkedIn.com
                            </a>
                        </p>
                        <p className="text-gray-800 py-1">
                            Projects:{" "}
                            <a
                                href="https://github.com/PatrickLisiecki"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-orange-500 hover:text-orange-700"
                            >
                                GitHub.com
                            </a>{" "}
                        </p>
                    </div>
                    <div className="text-center shadow-lg p-4 rounded-xl my-10  dark:bg-white flex-1 transition-transform transform hover:scale-105">
                        <img src={Andro} width={100} height={100} alt="Andro" />
                        <h3 className="text-lg font-medium  pb-2  ">Andro Rezkalla</h3>

                        <h4 className="py-4 text-accent">Contact</h4>
                        <p className="text-gray-800 py-1">
                            Portfolio:{" "}
                            <a
                                href="https://www.androrezkalla.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-orange-500 hover:text-orange-700"
                            >
                                androrezkalla.com
                            </a>{" "}
                        </p>
                        <p className="text-gray-800 py-1">
                            Social Media:{" "}
                            <a
                                href="https://www.linkedin.com/in/androrezkalla/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-orange-500 hover:text-orange-700"
                            >
                                LinkedIn.com
                            </a>
                        </p>
                        <p className="text-gray-800 py-1">
                            Projects:{" "}
                            <a
                                href="https://github.com/androrezkalla"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-orange-500 hover:text-orange-700"
                            >
                                GitHub.com
                            </a>{" "}
                        </p>
                    </div>
                </div>
                <div className="lg:flex gap-10">
                    <div className="text-center shadow-lg p-4 rounded-xl my-10  dark:bg-white flex-1 transition-transform transform hover:scale-105">
                        <img src={John} width={100} height={100} alt="John" />
                        <h3 className="text-lg font-medium  pb-2  ">John Santiago</h3>

                        <h4 className="py-4 text-accent">Contact</h4>
                        <p className="text-gray-800 py-1">
                            Portfolio:{" "}
                            <a
                                href="https://johnsantiago.dev/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-orange-500 hover:text-orange-700"
                            >
                                johnsantiago.com
                            </a>{" "}
                        </p>
                        <p className="text-gray-800 py-1">
                            Social Media:{" "}
                            <a
                                href="https://www.linkedin.com/in/john-santiago00/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-orange-500 hover:text-orange-700"
                            >
                                LinkedIn.com
                            </a>
                        </p>
                        <p className="text-gray-800 py-1">
                            Projects:{" "}
                            <a
                                href="https://github.com/JohnSantiago00"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-orange-500 hover:text-orange-700"
                            >
                                GitHub.com
                            </a>{" "}
                        </p>
                    </div>
                    <div className="text-center shadow-lg p-4 rounded-xl my-10  dark:bg-white flex-1 transition-transform transform hover:scale-105">
                        <img src={Memodified} width={100} height={100} alt="Nicolas" />
                        <h3 className="text-lg font-medium  pb-2  ">Nicolas Talledo</h3>

                        <h4 className="py-4 text-accent">Contact</h4>
                        <p className="text-gray-800 py-1">
                            Portfolio:{" "}
                            <a
                                href="https://www.nicktalledo.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-orange-500 hover:text-orange-700"
                            >
                                nicktalledo.com
                            </a>{" "}
                        </p>
                        <p className="text-gray-800 py-1">
                            Social Media:{" "}
                            <a
                                href="https://www.linkedin.com/in/nicolas-talledo/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-orange-500 hover:text-orange-700"
                            >
                                LinkedIn.com
                            </a>
                        </p>
                        <p className="text-gray-800 py-1">
                            Projects:{" "}
                            <a
                                href="https://github.com/NickTalledo"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-orange-500 hover:text-orange-700"
                            >
                                GitHub.com
                            </a>{" "}
                        </p>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default Contact;
