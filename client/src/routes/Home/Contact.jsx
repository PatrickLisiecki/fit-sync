import Memodified from "/Me-modified.png";
import Pat from "/Pat-modified.png";
import Andro from "/Andro-modified.png";
import John from "/John-modified.png";

export default function Contact() {
  return (
    <>
      <section className="mx-16 lg:mx-32">
        <h1 className="mb-4 pt-8 text-center text-4xl font-bold">
          Meet the Founders
        </h1>
        <p className="text-center font-semibold">
          Feel free to reach out! Happy to connect and meet you!
        </p>
        <div className="gap-10 lg:flex">
          <div className="my-10 flex-1 transform rounded-xl p-4  text-center shadow-lg transition-transform hover:scale-105 dark:bg-white">
            <img src={Pat} width={100} height={100} alt="Patrick" />
            <h3 className="pb-2 text-lg  font-medium  ">Patrick Lisiecki</h3>

            <h4 className="py-4 text-accent">Contact</h4>
            <p className="py-1 text-gray-800">
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
            <p className="py-1 text-gray-800">
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
            <p className="py-1 text-gray-800">
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
          <div className="my-10 flex-1 transform rounded-xl p-4  text-center shadow-lg transition-transform hover:scale-105 dark:bg-white">
            <img src={Andro} width={100} height={100} alt="Andro" />
            <h3 className="pb-2 text-lg  font-medium  ">Andro Rezkalla</h3>

            <h4 className="py-4 text-accent">Contact</h4>
            <p className="py-1 text-gray-800">
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
            <p className="py-1 text-gray-800">
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
            <p className="py-1 text-gray-800">
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
        <div className="gap-10 lg:flex">
          <div className="my-10 flex-1 transform rounded-xl p-4  text-center shadow-lg transition-transform hover:scale-105 dark:bg-white">
            <img src={John} width={100} height={100} alt="John" />
            <h3 className="pb-2 text-lg  font-medium  ">John Santiago</h3>

            <h4 className="py-4 text-accent">Contact</h4>
            <p className="py-1 text-gray-800">
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
            <p className="py-1 text-gray-800">
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
            <p className="py-1 text-gray-800">
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
          <div className="my-10 flex-1 transform rounded-xl p-4  text-center shadow-lg transition-transform hover:scale-105 dark:bg-white">
            <img src={Memodified} width={100} height={100} alt="Nicolas" />
            <h3 className="pb-2 text-lg  font-medium  ">Nicolas Talledo</h3>

            <h4 className="py-4 text-accent">Contact</h4>
            <p className="py-1 text-gray-800">
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
            <p className="py-1 text-gray-800">
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
            <p className="py-1 text-gray-800">
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
    </>
  );
}
