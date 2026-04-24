interface AlumniCardProps {
  name: string;
  batch: string;
  job_role: string;
  company?: string;
  linkedin?: string;
  instagram?: string;
}

export default function AlumniCard({
  name,
  batch,
  job_role,
  company,
  linkedin,
  instagram,
}: AlumniCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-1">{name}</h3>
      <p className="text-sm text-gray-500 mb-3">Batch {batch}</p>
      <p className="text-sm text-gray-700 mb-1">{job_role}</p>
      {company && <p className="text-sm text-gray-600 mb-3">{company}</p>}
      
      {(linkedin || instagram) && (
        <div className="flex gap-3 mt-4">
          {linkedin && (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-600 hover:underline"
            >
              LinkedIn
            </a>
          )}
          {instagram && (
            <a
              href={instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-600 hover:underline"
            >
              Instagram
            </a>
          )}
        </div>
      )}
    </div>
  );
}
