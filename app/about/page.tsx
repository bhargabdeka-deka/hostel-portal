export default function About() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">About ORION Hostel</h1>
      
      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 mb-8">
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Our Identity</h2>
            <p className="text-gray-700 leading-relaxed">
              ORION Hostel, also known as Hostel No. 7, stands as a cornerstone of student life at 
              Jorhat Engineering College. Established on 28–29 February 1982, we have been home to 
              generations of engineers who have gone on to make their mark in the world.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">The ORIONITE Spirit</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              <span className="font-medium text-gray-900">
                "We are not known by names but by a race — ORIONITE"
              </span>
            </p>
            <p className="text-gray-700 leading-relaxed">
              This isn't just a tagline; it's our identity. Every resident who walks through our doors 
              becomes part of a legacy that transcends individual achievements. We are a brotherhood, 
              a community bound by shared experiences, challenges, and triumphs.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Our Legacy</h2>
            <p className="text-gray-700 leading-relaxed">
              Over four decades, ORION has been more than just accommodation. It's where friendships 
              are forged, where late-night study sessions turn into lifelong memories, and where young 
              engineers learn the values of teamwork, discipline, and excellence.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-4">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-blue-600 mb-2">1982</h3>
            <p className="text-gray-600 text-sm">Established</p>
          </div>
          <div className="text-center">
            <h3 className="text-3xl font-bold text-blue-600 mb-2">75</h3>
            <p className="text-gray-600 text-sm">Capacity</p>
          </div>
          <div className="text-center">
            <h3 className="text-3xl font-bold text-blue-600 mb-2">40+</h3>
            <p className="text-gray-600 text-sm">Years of Legacy</p>
          </div>
          <div className="text-center">
            <h3 className="text-3xl font-bold text-blue-600 mb-2">1000+</h3>
            <p className="text-gray-600 text-sm">Alumni</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Hostel Administration</h2>
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-700 mb-1">Superintendent</p>
              <p className="text-lg text-gray-900">Mr. Jiten Borgohain</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-700 mb-1">Contact</p>
              <p className="text-lg text-gray-900">+91 9101481714</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-700 mb-1">Location</p>
              <p className="text-lg text-gray-900">Jorhat Engineering College Campus</p>
              <p className="text-sm text-gray-600">Jorhat, Assam</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
