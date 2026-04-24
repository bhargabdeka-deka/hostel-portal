'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

interface Achievement {
  id: number;
  title: string;
  description: string;
  date: string;
}

const staticAchievements = [
  {
    id: 1,
    title: 'Cricket Champion',
    years: '2017–2019',
    description: 'Dominated the cricket field for three consecutive years, showcasing exceptional teamwork and sportsmanship.',
  },
  {
    id: 2,
    title: 'Volleyball Champion',
    years: '2018–2019',
    description: 'Back-to-back volleyball championships demonstrating our strength in team coordination and athletic excellence.',
  },
  {
    id: 3,
    title: 'Badminton Champion',
    years: '2018–2019',
    description: 'Two years of badminton supremacy, proving our prowess in individual and doubles competitions.',
  },
  {
    id: 4,
    title: 'Relay Champion',
    years: '2022',
    description: 'Speed, precision, and perfect coordination led us to victory in the relay championship.',
  },
  {
    id: 5,
    title: 'Kho-Kho Champion',
    years: '2022',
    description: 'Strategic gameplay and agility brought home the Kho-Kho championship title.',
  },
];

export default function Achievements() {
  const [dbAchievements, setDbAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAchievements();
  }, []);

  async function fetchAchievements() {
    try {
      const { data } = await supabase
        .from('achievements')
        .select('*')
        .order('date', { ascending: false });

      setDbAchievements(data || []);
    } catch (error) {
      console.error('Error fetching achievements:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-3">Achievements</h1>
      <p className="text-gray-600 mb-10">
        A legacy of excellence in sports and beyond
      </p>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Sports Championships</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {staticAchievements.map((achievement) => (
            <div
              key={achievement.id}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
            >
              <div className="mb-3">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {achievement.title}
                </h3>
                <p className="text-sm font-medium text-blue-600">{achievement.years}</p>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                {achievement.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {!loading && dbAchievements.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Recent Achievements</h2>
          <div className="space-y-6">
            {dbAchievements.map((achievement) => (
              <div
                key={achievement.id}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {achievement.title}
                </h3>
                <p className="text-gray-600 mb-3">{achievement.description}</p>
                <p className="text-sm text-gray-400">
                  {new Date(achievement.date).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
