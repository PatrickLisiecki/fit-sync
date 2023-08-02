// Components
import Navbar from "../../components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRobot,
  faDumbbell,
  faChartLine,
  faScrewdriverWrench,
} from "@fortawesome/free-solid-svg-icons";
import Footer from "../../components/Footer";

export default function Root() {
  return (
    <>
      <Navbar />
      <div className="pt-16"></div>
      <section className="bg-image bg-cover h-screen relative bg-blend-overlay bg-gray-800">
        <div>
          <div className=" absolute top-1/2 transform -translate-y-1/2 text-center left-1/2 -translate-x-1/2 ">
            <h3 className="text-5xl font-semibold text-accent">
              Welcome to Flex Fusion
            </h3>
            <p className="text-xl mt-6 text-white">
              {" "}
              Here at Flex Fusion, we offer a wide variety of different workouts
              for every type of user. Whether you&apos;re just starting out and
              looking for some guidance or if you&apos;re an advanced user and
              you&apos;re looking for a challenge, you&apos;ve come to the right
              place!
            </p>
            <button className="bg-accent scale-125 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-full mt-8 text-2xl">
              Workout Now!
            </button>
          </div>
        </div>
      </section>
      <section
        className=" bg-white shadow-bs inline-block w-full"
        id="features"
      >
        <div className="container mx-auto px-4 py-8">
          <h3 className="text-4xl font-semibold text-center pt-8 ">Features</h3>
          <p className="text-center  font-light">
            Everything you need to achieve your fitness goals, all in one place.
          </p>
          <div className="grid lg:grid-cols-2 grid-cols-1 place-items-center my-8">
            <div className="flex flex-col items-center mt-8  ">
              <div className=" w-24 h-24 bg-accent rounded-full text-center ">
                <FontAwesomeIcon icon={faRobot} className="text-5xl my-5" />
              </div>
              <h3 className="text-2xl font-semibold text-center mt-2 ">
                AI Generated Workouts
              </h3>
              <p className="my-4 text-center mx-6 text-secondary text-sm">
                Our app utilizes state-of-the-art AI technology to craft
                workouts based on your exact needs, goals, and preferences.
                Whether you&apos;re looking to build muscle, improve
                flexibility, burn calories, or enhance your overall fitness, our
                AI has got you covered. With workouts personalized to your
                liking, staying motivated and committed to your fitness journey
                has never been easier.
              </p>
            </div>
            <div className="flex flex-col items-center mt-8">
              <div className="w-24 h-24 bg-accent rounded-full text-center ">
                <FontAwesomeIcon icon={faDumbbell} className="text-5xl my-6" />
              </div>
              <h3 className="text-2xl font-semibold text-center mt-2">
                Massive Workout Library
              </h3>
              <p className="my-4  text-center mx-6 text-secondary text-sm ">
                Whether you&apos;re a seasoned fitness enthusiast or a beginner
                just starting, our workout library has something for everyone.
                Our app lets you filter workouts based on your specific
                objectives, such as muscle building, weight loss, toning, or
                increasing flexibility. You&apos;re in control of your fitness
                journey, with the flexibility to mix and match workouts to
                create your personalized fitness plan.
              </p>
            </div>
            <div className="flex flex-col items-center mt-8 lg:mb-8">
              <div className=" w-24 h-24 bg-accent rounded-full text-center ">
                <FontAwesomeIcon icon={faChartLine} className="text-5xl my-6" />
              </div>
              <h3 className="text-2xl font-semibold text-center mt-2">
                Nutrition Tracker
              </h3>
              <p className="my-4  text-center mx-6 text-secondary text-sm ">
                As you track your nutrition and record your daily intake, our
                intelligent algorithm carefully analyzes your dietary habits.
                Our user-friendly dashboard provides you with informative data
                and visually appealing charts, showcasing your nutritional
                progress over time. This personalized insight helps you make
                informed dietary adjustments to maximize your health and
                wellness effectively.
              </p>
            </div>
            <div className="flex flex-col items-center mt-8 mb-8">
              <div className="w-24 h-24 bg-accent rounded-full text-center ">
                <FontAwesomeIcon
                  icon={faScrewdriverWrench}
                  className="text-5xl my-6"
                />
              </div>
              <h3 className="text-2xl font-semibold text-center mt-2">
                Create Workouts
              </h3>
              <p className="my-4  text-center mx-6 text-secondary text-sm">
                Creating your custom workout is as simple as it is empowering.
                Mix and match strength training, cardio, yoga, and more to
                design a routine that suits your unique needs. Adjust sets,
                reps, and rest periods to tailor the intensity to your liking.
                Feeling up for a challenge? Amp up the difficulty with advanced
                variations. Prefer a quick, high-energy session? Opt for a
                fast-paced circuit. The power is in your hands.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-image2 bg-cover h-screen relative bg-blend-overlay bg-gray-800">
        <div>
          <div className="absolute top-1/2 transform -translate-y-1/2 text-center left-1/2 -translate-x-1/2 ">
            <button className="bg-accent scale-125 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-full my-8 text-2xl">
              Join our Community Now!
            </button>
            <p className="text-xl text-white">
              {" "}
              Unlock the Best Version of Yourself! Join our workout community
              today and embark on a transformative journey towards a healthier,
              stronger, and more confident you. Let&apos;s crush goals together
              and make every step count! Your fitness success story starts here.
              Join now and let&apos;s sweat, smile, and succeed together!
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
