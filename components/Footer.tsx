export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center text-sm text-gray-600">
          <p>&copy; {new Date().getFullYear()} Smart Hostel Portal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
