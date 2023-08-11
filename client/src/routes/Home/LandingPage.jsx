// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRobot,
  faCalendarDays,
  faChartLine,
  faAppleWhole,
} from "@fortawesome/free-solid-svg-icons";

export default function LandingPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen bg-primary pt-8 sm:grid sm:place-items-center">
        {/* Background Image for Hero Section */}
        <img
          src="https://images.unsplash.com/photo-1581009137042-c552e485697a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
          alt="Background Image"
          className="absolute left-0 top-0 h-full w-full object-cover brightness-50"
        />

        {/* Welcome */}
        <div className="flex min-w-[300px] max-w-[800px] flex-col items-center justify-center pt-24 brightness-100 sm:pt-0">
          <span className="h2 mb-0 text-center font-semibold uppercase tracking-wide text-accent">
            Welcome to Flex Fusion
          </span>
          <p className="mb-8 mt-3 max-w-[300px] text-center text-xl text-white sm:max-w-[600px]">
            Here at Flex Fusion, we offer a wide variety of different workouts
            for every type of user. Whether you&apos;re just starting out and
            looking for some guidance or if you&apos;re an advanced user and
            you&apos;re looking for a challenge, you&apos;ve come to the right
            place!
          </p>
          <button className="min-w-[300px] rounded bg-accent px-6 py-5 text-white hover:bg-accent/90">
            <span className="h3 mb-0 uppercase tracking-wide">Workout Now</span>
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full bg-primary text-white shadow-md">
        <div className="container mx-auto px-4 py-8">
          {/* Features header */}
          <div className="flex flex-col items-center justify-center">
            <span className="h2 mb-0 font-semibold">Features</span>
            <p className="text-center font-light text-white">
              Everything you need to achieve your fitness goals, all in one
              place.
            </p>
          </div>

          {/* Features */}
          <div className="my-8 grid grid-cols-1 place-items-center lg:grid-cols-2">
            {/* AI Feature */}
            <div className="mt-8 flex flex-col items-center">
              <div className="grid h-24 w-24 place-items-center rounded-full bg-accent">
                <FontAwesomeIcon icon={faRobot} className="text-5xl" />
              </div>
              <span className="h3 mb-0 mt-2 text-center font-semibold">
                AI Generated Workouts
              </span>
              <p className="mx-6 my-4 text-center text-sm text-white">
                Our app utilizes state-of-the-art AI technology to craft
                workouts based on your exact needs, goals, and preferences.
                Whether you&apos;re looking to build muscle, improve
                flexibility, burn calories, or enhance your overall fitness, our
                AI has got you covered. With workouts personalized to your
                liking, staying motivated and committed to your fitness journey
                has never been easier.
              </p>
            </div>

            {/* Exercise API */}
            <div className="mt-8 flex flex-col items-center">
              <div className="grid h-24 w-24 place-items-center rounded-full bg-accent">
                <FontAwesomeIcon icon={faCalendarDays} className="text-5xl" />
              </div>
              <span className="h3 mb-0 mt-2 text-center font-semibold">
                Workout Plan
              </span>
              <p className="mx-6 my-4 text-center text-sm text-white ">
                Whether you&apos;re a seasoned fitness enthusiast or a beginner
                just starting, our workout library has something for everyone.
                Our app lets you filter workouts based on your specific
                objectives, such as muscle building, weight loss, toning, or
                increasing flexibility. You&apos;re in control of your fitness
                journey, with the flexibility to mix and match workouts to
                create your personalized fitness plan.
              </p>
            </div>

            {/* Nutrition Facts Feature */}
            <div className="mt-8 flex flex-col items-center lg:mb-8">
              <div className="grid h-24 w-24 place-items-center rounded-full bg-accent">
                <FontAwesomeIcon icon={faAppleWhole} className="text-5xl" />
              </div>
              <span className="h3 mb-0 mt-2 text-center font-semibold">
                Nutrition Analysis
              </span>
              <p className="mx-6  my-4 text-center text-sm text-white ">
                As you log your daily meals and nutrition, our intelligent
                algorithm meticulously analyzes the nutritional content of your
                diet. Our user-friendly dashboard presents you with detailed
                data and visually engaging charts, providing insights into your
                meal choices. This personalized meal nutrition analysis empowers
                you to make informed dietary adjustments.
              </p>
            </div>

            {/* Workout Plan Feature */}
            <div className="mb-8 mt-8 flex flex-col items-center">
              <div className="grid h-24 w-24 place-items-center rounded-full bg-accent">
                <FontAwesomeIcon icon={faChartLine} className="text-5xl" />
              </div>
              <span className="h3 mb-0 mt-2 text-center font-semibold">
                Progress Tracker
              </span>
              <p className="mx-6  my-4 text-center text-sm text-white">
                With our innovative tracker, you can effortlessly log your
                workout sessions, recording every exercise completed. Stay on
                top of your fitness journey by conveniently tracking each
                session&apos;s date, helping you monitor your progress over
                time. Whether you&apos;re aiming to build strength, increase
                endurance, or simply stay active, our Progress Tracker empowers
                you to set and achieve your fitness goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Section */}
      <section className="relative grid h-screen place-items-center bg-primary">
        {/* Background Image for Bottom Section */}
        <img
          src="https://images.unsplash.com/photo-1556817411-31ae72fa3ea0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
          alt="Background Image Two"
          className="absolute left-0 top-0 h-full w-full object-cover brightness-50"
        />

        {/* Info */}
        <div className="relative flex flex-col items-center justify-center gap-y-4">
          <button className="mb-0 min-w-[300px] rounded bg-accent px-6 py-5 text-base font-semibold uppercase tracking-wide text-white hover:bg-accent/90 sm:text-lg">
            Join our community now
          </button>
          <p className="max-w-[300px] text-center text-base text-white sm:max-w-[500px] sm:text-lg md:max-w-[700px]">
            Unlock the best version of yourself! Join our workout community
            today and embark on a transformative journey towards a healthier,
            stronger, and more confident you. Let&apos;s crush goals together
            and make every step count! Your fitness success story starts here.
            Join now and let&apos;s sweat, smile, and succeed together!
          </p>
        </div>
      </section>
    </>
  );
}
