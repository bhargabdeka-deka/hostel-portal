export default function About() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">About Us</h1>
      
      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
        <p className="text-gray-700 mb-4 leading-relaxed">
          Smart Hostel is a premier residential facility dedicated to providing a comfortable
          and enriching living experience for students. Our mission is to create a supportive
          community that fosters academic excellence and personal growth.
        </p>
        
        <p className="text-gray-700 mb-4 leading-relaxed">
          With modern amenities, dedicated staff, and a vibrant community, we strive to make
          your hostel experience memorable and productive.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-blue-600 mb-2">500+</h3>
            <p className="text-gray-600">Residents</p>
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-bold text-blue-600 mb-2">1000+</h3>
            <p className="text-gray-600">Alumni</p>
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-bold text-blue-600 mb-2">15+</h3>
            <p className="text-gray-600">Years</p>
          </div>
        </div>
      </div>
    </div>
  );
}
