export default function Rules() {
  const rules = [
    {
      category: 'General Conduct',
      items: [
        'All residents must maintain discipline and decorum within the hostel premises.',
        'Ragging in any form is strictly prohibited and punishable by law.',
        'Residents must treat hostel property with care and report any damages immediately.',
        'Smoking, consumption of alcohol, and use of any intoxicating substances are strictly prohibited.',
        'Gambling and any form of betting are not allowed within the hostel.',
      ],
    },
    {
      category: 'Timings & Entry',
      items: [
        'Hostel gates close at 10:00 PM on weekdays and 11:00 PM on weekends.',
        'Late entry requires prior permission from the Superintendent.',
        'Visitors are allowed only in designated areas and during specified hours.',
        'All visitors must register at the entrance with valid identification.',
        'Overnight guests are not permitted without prior approval.',
      ],
    },
    {
      category: 'Room & Facilities',
      items: [
        'Rooms must be kept clean and tidy at all times.',
        'Room inspections may be conducted periodically by hostel authorities.',
        'Electrical appliances like heaters and cooking equipment are not allowed in rooms.',
        'Residents are responsible for their personal belongings; hostel is not liable for losses.',
        'Room changes require approval from the hostel administration.',
      ],
    },
    {
      category: 'Mess & Dining',
      items: [
        'Mess timings must be strictly followed.',
        'Food wastage should be avoided.',
        'Residents must maintain cleanliness in the dining area.',
        'Outside food delivery is allowed only during specified hours.',
        'Complaints regarding mess food should be directed to the mess committee.',
      ],
    },
    {
      category: 'Safety & Security',
      items: [
        'Keep your room locked when not present.',
        'Do not share room keys or hostel access cards with outsiders.',
        'Report any suspicious activity to the hostel authorities immediately.',
        'Fire safety equipment should not be tampered with.',
        'Emergency exits must be kept clear at all times.',
      ],
    },
    {
      category: 'Academic & Discipline',
      items: [
        'Maintain a minimum attendance as per college requirements.',
        'Noise levels must be kept low, especially during study hours and night time.',
        'Music and entertainment systems should not disturb other residents.',
        'Participation in hostel activities and events is encouraged.',
        'Any violation of rules may result in disciplinary action including expulsion.',
      ],
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-3">Rules & Regulations</h1>
      <p className="text-gray-600 mb-10">
        Guidelines for a harmonious and disciplined hostel life
      </p>

      <div className="space-y-8">
        {rules.map((section, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-8 shadow-sm border border-gray-100"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {section.category}
            </h2>
            <ul className="space-y-3">
              {section.items.map((rule, ruleIndex) => (
                <li key={ruleIndex} className="flex items-start gap-3">
                  <span className="text-blue-600 mt-1 flex-shrink-0">•</span>
                  <span className="text-gray-700 leading-relaxed">{rule}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-blue-50 border border-blue-100 rounded-xl p-6">
        <p className="text-sm text-gray-700 leading-relaxed">
          <span className="font-semibold text-gray-900">Note:</span> These rules are designed 
          to ensure a safe, comfortable, and conducive environment for all residents. Violation 
          of any rule may result in disciplinary action. For any clarifications, please contact 
          the Hostel Superintendent.
        </p>
      </div>
    </div>
  );
}
