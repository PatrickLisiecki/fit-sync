export default function About() {
  return (
    <div className="container mx-auto flex flex-wrap py-8">
      <section className="w-full p-4 lg:w-1/2 lg:pt-24">
        <img
          src="https://images.unsplash.com/photo-1528720208104-3d9bd03cc9d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8d29ya291dHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
          alt="Training Image"
          className="rounded-lg"
        />
      </section>

      <section className="w-full p-4 lg:w-1/2">
        <h1 className="mb-4 text-4xl font-bold">About Us</h1>

        <article>
          <h2 className="text-2xl font-semibold">Our Story</h2>
          <p className="mb-4">
            Flex Fusion was founded in 2023 by 4 college students - Patrick
            Lisiecki, Andro Rezkalla, John Santiago, and Nicolas Talledo. While
            pursuing computer science degrees, these 4 fitness enthusiasts saw
            an opportunity to combine their passions.
          </p>
          <p className="mb-4">
            They set out to create an app that provides free, quality workout
            programs to make fitness accessible to everyone. With combined
            skills in programming, design, and fitness training, they built Flex
            Fusion from the ground up.
          </p>
        </article>

        <article>
          <h2 className="text-2xl font-semibold">Our Mission</h2>
          <p className="mb-4">
            Flex Fusion&apos;s mission is to empower people to reach their
            fitness goals, regardless of financial or physical limitations. We
            want to democratize access to engaging, personalized workout plans.
          </p>
          <p className="mb-8">
            Our app makes it simple to get fit on your own terms, whether
            you&apos;re a beginner or expert. We&apos;re founded on the belief
            that fitness should be freely available to all.
          </p>
        </article>

        <article>
          <h2 className="text-2xl font-semibold">Our Team</h2>
          <p className="mb-4">
            Our small but capable team combines specialized skills in full-stack
            development and UI/UX design.
          </p>
          <p className="mb-4">
            The whole team had interchangeable roles working on both frontend
            and backend development. Everybody played an integral role in the
            creation of this project.
          </p>
        </article>
      </section>
    </div>
  );
}
