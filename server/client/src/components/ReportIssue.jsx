import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

export default function ReportIssue() {
  const form = useRef();
  const [messageSent, setMessageSent] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_454w19l",
        "template_3nqus2k",
        form.current,
        "hW6HC8gNXO79znJSf",
      )
      .then(
        (result) => {
          console.log(result.text);
          e.target.reset();
          setMessageSent(true);
        },
        (error) => {
          console.log(error.text);
        },
      );
  };

  return (
    <>
      <div className="container mx-auto py-4 ">
        <h1 className="mb-4 text-3xl font-bold dark:text-white">
          Report an Issue
        </h1>
        <div className="rounded bg-white px-8 py-4 shadow-md dark:bg-gray-700">
          {messageSent ? (
            <p className="mb-4 font-semibold text-green-500">
              Message sent successfully!
            </p>
          ) : null}
          <form ref={form} onSubmit={sendEmail}>
            <div className="mb-4">
              <label
                htmlFor="issue-type"
                className="mb-2 block font-semibold dark:text-white"
              >
                Issue Type
              </label>
              <select
                id="issue-type"
                name="issue-type"
                className="w-full rounded border p-2 "
                required
              >
                <option value="bug">Bug</option>
                <option value="feature-request">Feature Request</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor="issue-description"
                className="mb-2 block font-semibold dark:text-white"
              >
                Issue Description
              </label>
              <textarea
                id="issue-description"
                name="issue-description"
                rows="4"
                className="w-full rounded border p-2"
                required
              ></textarea>
            </div>
            <div className="mb-4">
              <label
                htmlFor="user-email"
                className="mb-2 block font-semibold dark:text-white"
              >
                Your Email
              </label>
              <input
                type="email"
                id="user-email"
                name="user-email"
                className="w-full rounded border p-2"
                required
              />
            </div>
            <div className=" justify-center">
              <button
                type="submit"
                value="Send"
                className="rounded bg-accent px-4 py-2 font-semibold text-white hover:bg-accent/90"
              >
                Submit Issue
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
