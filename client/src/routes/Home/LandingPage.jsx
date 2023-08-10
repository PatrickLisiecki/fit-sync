// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRobot,
  faDumbbell,
  faChartLine,
  faScrewdriverWrench,
} from "@fortawesome/free-solid-svg-icons";

export default function LandingPage() {
  return (
    <>
      <section className="relative h-screen bg-gray-800 bg-image bg-cover bg-blend-overlay">
        <div>
          <div className=" absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-center ">
            <h3 className="text-5xl font-semibold text-accent">
              Welcome to Flex Fusion
            </h3>
            <p className="mt-6 text-xl text-white">
              {" "}
              Here at Flex Fusion, we offer a wide variety of different workouts
              for every type of user. Whether you&apos;re just starting out and
              looking for some guidance or if you&apos;re an advanced user and
              you&apos;re looking for a challenge, you&apos;ve come to the right
              place!
            </p>
            <button className="mt-8 scale-125 rounded-full bg-accent px-4 py-2 text-2xl font-bold text-white hover:bg-orange-700">
              Workout Now!
            </button>
          </div>
        </div>
      </section>
      <section className=" inline-block w-full bg-white shadow-md">
        <div className="container mx-auto px-4 py-8">
          <h3 className="pt-8 text-center text-4xl font-semibold ">Features</h3>
          <p className="text-center  font-light">
            Everything you need to achieve your fitness goals, all in one place.
          </p>
          <div className="my-8 grid grid-cols-1 place-items-center lg:grid-cols-2">
            <div className="mt-8 flex flex-col items-center  ">
              <div className=" h-24 w-24 rounded-full bg-accent text-center ">
                <FontAwesomeIcon icon={faRobot} className="my-5 text-5xl" />
              </div>
              <h3 className="mt-2 text-center text-2xl font-semibold ">
                AI Generated Workouts
              </h3>
              <p className="mx-6 my-4 text-center text-sm text-secondary">
                Our app utilizes state-of-the-art AI technology to craft
                workouts based on your exact needs, goals, and preferences.
                Whether you&apos;re looking to build muscle, improve
                flexibility, burn calories, or enhance your overall fitness, our
                AI has got you covered. With workouts personalized to your
                liking, staying motivated and committed to your fitness journey
                has never been easier.
              </p>
            </div>
            <div className="mt-8 flex flex-col items-center">
              <div className="h-24 w-24 rounded-full bg-accent text-center ">
                <FontAwesomeIcon icon={faDumbbell} className="my-6 text-5xl" />
              </div>
              <h3 className="mt-2 text-center text-2xl font-semibold">
                Massive Workout Library
              </h3>
              <p className="mx-6  my-4 text-center text-sm text-secondary ">
                Whether you&apos;re a seasoned fitness enthusiast or a beginner
                just starting, our workout library has something for everyone.
                Our app lets you filter workouts based on your specific
                objectives, such as muscle building, weight loss, toning, or
                increasing flexibility. You&apos;re in control of your fitness
                journey, with the flexibility to mix and match workouts to
                create your personalized fitness plan.
              </p>
            </div>
            <div className="mt-8 flex flex-col items-center lg:mb-8">
              <div className=" h-24 w-24 rounded-full bg-accent text-center ">
                <FontAwesomeIcon icon={faChartLine} className="my-6 text-5xl" />
              </div>
              <h3 className="mt-2 text-center text-2xl font-semibold">
                Nutrition Analysis
              </h3>
              <p className="mx-6  my-4 text-center text-sm text-secondary ">
                As you log your daily meals and nutrition, our intelligent
                algorithm meticulously analyzes the nutritional content of your
                diet. Our user-friendly dashboard presents you with detailed
                data and visually engaging charts, providing insights into your
                meal choices. This personalized meal nutrition analysis empowers
                you to make informed dietary adjustments.
              </p>
            </div>
            <div className="mb-8 mt-8 flex flex-col items-center">
              <div className="h-24 w-24 rounded-full bg-accent text-center ">
                <FontAwesomeIcon
                  icon={faScrewdriverWrench}
                  className="my-6 text-5xl"
                />
              </div>
              <h3 className="mt-2 text-center text-2xl font-semibold">
                Create Workouts
              </h3>
              <p className="mx-6  my-4 text-center text-sm text-secondary">
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
      <section className="relative h-screen bg-gray-800 bg-image2 bg-cover bg-blend-overlay">
        <div>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-center ">
            <button className="my-8 scale-125 rounded-full bg-accent px-4 py-2 text-2xl font-bold text-white hover:bg-orange-700">
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
    </>
  );
}
