export default function ReportIssue() {
  return (
    <>
      <div className="container mx-auto py-4">
        <h1 className="mb-4 text-4xl font-bold">Report an Issue</h1>
        <div className="rounded bg-white px-8 py-4 shadow-md">
          <form>
            <div className="mb-4">
              <label htmlFor="issue-type" className="mb-2 block font-semibold">
                Issue Type
              </label>
              <select
                id="issue-type"
                name="issue-type"
                className="w-full rounded border p-2"
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
                className="mb-2 block font-semibold"
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
              <label htmlFor="user-email" className="mb-2 block font-semibold">
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
