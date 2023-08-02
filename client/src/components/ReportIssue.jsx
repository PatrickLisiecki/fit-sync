const ReportIssue = () => {
  return (
    <>
      <div className="container mx-auto py-4">
        <h1 className="text-4xl font-bold mb-4">Report an Issue</h1>
        <div className="bg-white shadow-md rounded px-8 py-4">
          <form>
            <div className="mb-4">
              <label htmlFor="issue-type" className="block font-semibold mb-2">
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
                className="block font-semibold mb-2"
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
              <label htmlFor="user-email" className="block font-semibold mb-2">
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
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded "
              >
                Submit Issue
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ReportIssue;
