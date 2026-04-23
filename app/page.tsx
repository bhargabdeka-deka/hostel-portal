'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import NoticeCard from '@/components/NoticeCard';
import AlumniCard from '@/components/AlumniCard';

interface Notice {
  id: number;
  title: string;
  content: string;
  created_at: string;
}

interface Alumni {
  id: number;
  name: string;
  batch: string;
  job_role: string;
  company?: string;
  linkedin?: string;
  instagram?: string;
}

export default function Home() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [alumni, setAlumni] = useState<Alumni[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const { data: noticesData } = await supabase
        .from('notices')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3);

      const { data: alumniData } = await supabase
        .from('alumni')
        .select('*')
        .eq('status', 'approved')
        .limit(3);

      setNotices(noticesData || []);
      setAlumni(alumniData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to Smart Hostel
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          A modern platform connecting current residents with our vibrant alumni network
        </p>
      </section>

      {/* Notices Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Latest Notices</h2>
        {loading ? (
          <p className="text-gray-500">Loading notices...</p>
        ) : notices.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-3">
            {notices.map((notice) => (
              <NoticeCard
                key={notice.id}
                title={notice.title}
                content={notice.content}
                date={notice.created_at}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No notices available</p>
        )}
      </section>

      {/* Alumni Preview */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Featured Alumni</h2>
        {loading ? (
          <p className="text-gray-500">Loading alumni...</p>
        ) : alumni.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-3">
            {alumni.map((alum) => (
              <AlumniCard
                key={alum.id}
                name={alum.name}
                batch={alum.batch}
                job_role={alum.job_role}
                company={alum.company}
                linkedin={alum.linkedin}
                instagram={alum.instagram}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No alumni profiles available</p>
        )}
      </section>
    </div>
  );
}
