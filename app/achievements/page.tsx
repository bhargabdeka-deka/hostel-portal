'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

interface Achievement {
  id: number;
  title: string;
  description: string;
  date: string;
}

export default function Achievements() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
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

      setAchievements(data || []);
    } catch (error) {
      console.error('Error fetching achievements:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Achievements</h1>

      {loading ? (
        <p className="text-gray-500">Loading achievements...</p>
      ) : achievements.length > 0 ? (
        <div className="space-y-6">
          {achievements.map((achievement) => (
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
      ) : (
        <p className="text-gray-500">No achievements available</p>
      )}
    </div>
  );
}
