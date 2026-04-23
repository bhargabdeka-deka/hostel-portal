export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-1">
            &copy; {new Date().getFullYear()} ORION Hostel, Jorhat Engineering College
          </p>
          <p className="text-xs text-gray-500 italic">
            "We are not known by names but by a race — ORIONITE"
          </p>
        </div>
      </div>
    </footer>
  );
}
