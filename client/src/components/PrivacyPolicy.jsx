import Navbar from "./Navbar";
import Footer from "./Footer";

export default function PrivacyPolicy() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto pt-28">
        <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
        <p className="mb-8">
          Your privacy is important to us at FlexFusion. This policy outlines
          the information we collect and how we use it.
        </p>
        <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
        <p className="mb-4">
          We collect information you provide directly to us when you create an
          account, including your name, email address, gender, date of birth,
          and any other information you choose to add to your profile.
        </p>
        <p className="mb-4">
          We collect usage data when you interact with our mobile app, such as
          workout routines completed, progress tracking, and other analytics to
          improve our services.
        </p>

        <p className="mb-4">
          If you contact us directly, we may receive additional information
          about you such as phone number or mailing address.
        </p>
        <h2 className="text-2xl font-semibold mb-4">How We Use Information</h2>
        <ul className="list-disc pl-8 mb-4">
          <li>Provide, maintain and improve our app and services</li>
          <li>Respond to your questions and requests</li>
          <li>
            Send you technical notices, updates, security alerts and
            support/administrative messages
          </li>
          <li>Provide tailored content and workout recommendations</li>
          <li>
            Monitor and analyze usage and activity trends to improve our app
          </li>
        </ul>
        <p className="mb-8">
          We do not sell or rent your personal information to third parties. We
          do not share your information with third parties except in aggregate
          form.
        </p>
        <h2 className="text-2xl font-semibold mb-4">Your Choices</h2>
        <p className="mb-4">
          You can access and delete your profile information at any time by
          logging into your account. You can deactivate your account through app
          settings.
        </p>
        <p className="mb-4">
          You can opt-out of receiving promotional communications from us by
          following the unsubscribe instructions in those emails. You may not
          opt-out of receiving service-related communications.
        </p>

        <h2 className="text-2xl font-semibold mb-4">Security</h2>
        <p className="mb-4">
          We have security measures in place to prevent the loss, misuse or
          unauthorized access, disclosure, alteration or destruction of the
          information we hold. These measures include encryption, limited access
          rights and technical safeguards.
        </p>
        <p className="mb-8">
          While we strive to protect our systems and information, we cannot
          guarantee security of personal information for reasons outside of our
          control. We will promptly notify users if a security breach occurs.
        </p>
        <h2 className="text-2xl font-semibold mb-4">Changes to the Policy</h2>
        <p className="mb-8">
          FlexFusion may occasionally update this privacy policy as necessary to
          comply with relevant laws and regulations or to reflect changes in our
          practices. We will post any updates on this page and encourage you to
          review the policy periodically to stay informed about how we collect
          and use your information.
        </p>
        <h2 className="text-2xl font-semibold mb-4">Contact</h2>

        <p className="mb-8">
          If you have any questions or concerns about this privacy policy or the
          way we collect and use information, please do not hesitate to contact
          us at{" "}
          <a href="#" className="text-blue-400 hover:text-blue-800">
            privacy@flexfusion.com
          </a>
          . We are here to address any inquiries you may have.
        </p>
      </div>
      <Footer />
    </>
  );
}
