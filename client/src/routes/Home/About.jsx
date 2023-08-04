export default function About() {
  return (
    <>
      <div className="container mx-auto py-8 flex flex-wrap">
        <div className="w-full lg:w-1/2 p-4 lg:pt-24">
          <img
            src="https://images.unsplash.com/photo-1528720208104-3d9bd03cc9d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8d29ya291dHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
            alt="steps"
          />
        </div>

        <div className="w-full lg:w-1/2 p-4">
          <h1 className="text-4xl font-bold mb-4">About Us</h1>

          <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
          <p className="mb-4">
            Flex Fusion was founded in 2023 by 4 college students - Patrick Lisiecki, Andro
            Rezkalla, John Santiago, and Nicolas Talledo. While pursuing computer science degrees,
            these 4 fitness enthusiasts saw an opportunity to combine their passions.
          </p>
          <p className="mb-4">
            They set out to create an app that provides free, quality workout programs to make
            fitness accessible to everyone. With combined skills in programming, design, and fitness
            training, they built FlexFusion from the ground up.
          </p>

          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="mb-4">
            FlexFusion&apos;s mission is to empower people to reach their fitness goals, regardless
            of financial or physical limitations. We want to democratize access to engaging,
            personalized workout plans.
          </p>
          <p className="mb-8">
            Our app makes it simple to get fit on your own terms, whether you&apos;re a beginner or
            expert. We&apos;re founded on the belief that fitness should be freely available to all.
          </p>
          <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
          <p className="mb-4">
            Our small but capable team combines specialized skills in mobile development, UI/UX
            design, and backend development.
          </p>
          <p className="mb-4">
            The whole team had interchangeable roles working on both frontend and backend
            development. Patrick and Nicolas focused some more on frontend development while Andro
            and John had a focus toward backend development.
          </p>
        </div>
      </div>
    </>
  );
}
