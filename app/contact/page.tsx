export default function Contact() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Contact Us</h1>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Get in Touch</h2>
          
          <div className="space-y-5">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Hostel</h3>
              <p className="text-gray-900 font-medium">ORION Hostel (Hostel No. 7)</p>
              <p className="text-gray-600">Jorhat Engineering College</p>
              <p className="text-gray-600">Jorhat, Assam</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Superintendent</h3>
              <p className="text-gray-900 font-medium">Mr. Jiten Borgohain</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Contact Number</h3>
              <p className="text-gray-900 font-medium">+91 9101481714</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Established</h3>
              <p className="text-gray-600">28–29 February 1982</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Capacity</h3>
              <p className="text-gray-600">75 Residents</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Send a Message</h2>
          
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your message"
              />
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
