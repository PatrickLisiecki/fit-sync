import Memodified from "/Me-modified.png";
import Pat from "/Pat-modified.png";
import Andro from "/Andro-modified.png";
import John from "/John-modified.png";

const contactData = [
  {
    name: "Patrick Lisiecki",
    image: Pat,
    portfolio: "https://patricklisiecki.com/",
    linkedin: "https://www.linkedin.com/in/patricklisiecki/",
    github: "https://github.com/PatrickLisiecki",
  },
  {
    name: "Andro Rezkalla",
    image: Andro,
    portfolio: "https://www.androrezkalla.com/",
    linkedin: "https://www.linkedin.com/in/androrezkalla/",
    github: "https://github.com/androrezkalla",
  },
  {
    name: "John Santiago",
    image: John,
    portfolio: "https://johnsantiago.dev/",
    linkedin: "https://www.linkedin.com/in/john-santiago00/",
    github: "https://github.com/JohnSantiago00",
  },
  {
    name: "Nicolas Talledo",
    image: Memodified,
    portfolio: "https://www.nicktalledo.com/",
    linkedin: "https://www.linkedin.com/in/nicolas-talledo/",
    github: "https://github.com/NickTalledo",
  },
];

export default function Contact() {
  return (
    <section className="container mx-auto">
      <h1 className="mb-4 pt-8 text-center text-4xl font-bold">
        Meet the Founders
      </h1>
      <p className="text-center font-semibold">
        Feel free to reach out! Happy to connect with you!
      </p>

      {/* Contact cards */}
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 ">
        {contactData.map((contact, index) => {
          return (
            <div
              key={index}
              className="my-10 flex transform flex-col items-center justify-center rounded-xl p-4 shadow-lg transition-transform hover:scale-105 dark:bg-white"
            >
              <img
                src={contact.image}
                width={100}
                height={100}
                alt={contact.name}
              />
              <h3 className="pb-2 text-lg font-semibold">{contact.name}</h3>

              <h4 className="py-4 text-accent">Contact</h4>
              <p className="py-1">
                Portfolio:{" "}
                <a
                  href={contact.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:text-accent/90"
                >
                  {contact.portfolio.substring(8, contact.portfolio.length - 1)}
                </a>{" "}
              </p>
              <p className="py-1">
                Social Media:{" "}
                <a
                  href={contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:text-accent/90"
                >
                  LinkedIn
                </a>
              </p>
              <p className="t py-1">
                Projects:{" "}
                <a
                  href={contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:text-accent/90"
                >
                  GitHub
                </a>{" "}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
