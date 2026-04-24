interface NoticeCardProps {
  title: string;
  content: string;
  date?: string;
}

export default function NoticeCard({ title, content, date }: NoticeCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm mb-3">{content}</p>
      {date && (
        <p className="text-xs text-gray-400">{new Date(date).toLocaleDateString()}</p>
      )}
    </div>
  );
}
