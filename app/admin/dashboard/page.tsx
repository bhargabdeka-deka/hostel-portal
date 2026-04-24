'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import FormInput from '@/components/FormInput';

interface PendingAlumni {
  id: number;
  name: string;
  batch: string;
  job_role: string;
  company?: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [pendingAlumni, setPendingAlumni] = useState<PendingAlumni[]>([]);
  const [activeTab, setActiveTab] = useState<'notices' | 'achievements' | 'gallery' | 'alumni'>('notices');
  
  const [noticeForm, setNoticeForm] = useState({ title: '', content: '' });
  const [achievementForm, setAchievementForm] = useState({ title: '', description: '', date: '' });
  const [galleryForm, setGalleryForm] = useState({ image_url: '', caption: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    checkAuth();
    fetchPendingAlumni();
  }, []);

  async function checkAuth() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.push('/admin/login');
        return;
      }

      const { data: userData } = await supabase
        .from('users')
        .select('role')
        .eq('id', user.id)
        .single();

      if (userData?.role !== 'admin' && userData?.role !== 'superadmin') {
        router.push('/admin/login');
      }
    } catch (error) {
      router.push('/admin/login');
    } finally {
      setLoading(false);
    }
  }

  async function fetchPendingAlumni() {
    const { data } = await supabase
      .from('alumni')
      .select('*')
      .eq('status', 'pending');
    setPendingAlumni(data || []);
  }

  async function handleNoticeSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const { error } = await supabase.from('notices').insert([noticeForm]);
      if (error) throw error;
      setMessage('Notice added successfully!');
      setNoticeForm({ title: '', content: '' });
    } catch (error) {
      setMessage('Error adding notice');
    }
  }

  async function handleAchievementSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const { error } = await supabase.from('achievements').insert([achievementForm]);
      if (error) throw error;
      setMessage('Achievement added successfully!');
      setAchievementForm({ title: '', description: '', date: '' });
    } catch (error) {
      setMessage('Error adding achievement');
    }
  }

  async function handleGallerySubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const { error } = await supabase.from('gallery').insert([galleryForm]);
      if (error) throw error;
      setMessage('Image added successfully!');
      setGalleryForm({ image_url: '', caption: '' });
    } catch (error) {
      setMessage('Error adding image');
    }
  }

  async function approveAlumni(id: number) {
    try {
      const { error } = await supabase
        .from('alumni')
        .update({ status: 'approved' })
        .eq('id', id);
      if (error) throw error;
      setMessage('Alumni approved!');
      fetchPendingAlumni();
    } catch (error) {
      setMessage('Error approving alumni');
    }
  }

  async function rejectAlumni(id: number) {
    try {
      const { error } = await supabase
        .from('alumni')
        .delete()
        .eq('id', id);
      if (error) throw error;
      setMessage('Alumni rejected');
      fetchPendingAlumni();
    } catch (error) {
      setMessage('Error rejecting alumni');
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push('/admin/login');
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
        >
          Logout
        </button>
      </div>

      {message && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
          {message}
        </div>
      )}

      <div className="mb-6 flex gap-4 border-b border-gray-200">
        {['notices', 'achievements', 'gallery', 'alumni'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-4 py-2 font-medium capitalize ${
              activeTab === tab
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'notices' && (
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Add Notice</h2>
          <form onSubmit={handleNoticeSubmit}>
            <FormInput
              label="Title"
              name="title"
              required
              value={noticeForm.title}
              onChange={(e) => setNoticeForm({ ...noticeForm, title: e.target.value })}
            />
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                value={noticeForm.content}
                onChange={(e) => setNoticeForm({ ...noticeForm, content: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Add Notice
            </button>
          </form>
        </div>
      )}

      {activeTab === 'achievements' && (
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Add Achievement</h2>
          <form onSubmit={handleAchievementSubmit}>
            <FormInput
              label="Title"
              name="title"
              required
              value={achievementForm.title}
              onChange={(e) => setAchievementForm({ ...achievementForm, title: e.target.value })}
            />
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                value={achievementForm.description}
                onChange={(e) => setAchievementForm({ ...achievementForm, description: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
              />
            </div>
            <FormInput
              label="Date"
              name="date"
              type="date"
              required
              value={achievementForm.date}
              onChange={(e) => setAchievementForm({ ...achievementForm, date: e.target.value })}
            />
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Add Achievement
            </button>
          </form>
        </div>
      )}

      {activeTab === 'gallery' && (
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Add Gallery Image</h2>
          <form onSubmit={handleGallerySubmit}>
            <FormInput
              label="Image URL"
              name="image_url"
              type="url"
              required
              value={galleryForm.image_url}
              onChange={(e) => setGalleryForm({ ...galleryForm, image_url: e.target.value })}
              placeholder="https://example.com/image.jpg"
            />
            <FormInput
              label="Caption"
              name="caption"
              value={galleryForm.caption}
              onChange={(e) => setGalleryForm({ ...galleryForm, caption: e.target.value })}
            />
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Add Image
            </button>
          </form>
        </div>
      )}

      {activeTab === 'alumni' && (
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Pending Alumni Approvals</h2>
          {pendingAlumni.length > 0 ? (
            <div className="space-y-4">
              {pendingAlumni.map((alum) => (
                <div key={alum.id} className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900">{alum.name}</h3>
                  <p className="text-sm text-gray-600">Batch: {alum.batch}</p>
                  <p className="text-sm text-gray-600">{alum.job_role}</p>
                  {alum.company && <p className="text-sm text-gray-600">{alum.company}</p>}
                  <div className="flex gap-3 mt-3">
                    <button
                      onClick={() => approveAlumni(alum.id)}
                      className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => rejectAlumni(alum.id)}
                      className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No pending approvals</p>
          )}
        </div>
      )}
    </div>
  );
}
