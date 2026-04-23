'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import AlumniCard from '@/components/AlumniCard';
import FormInput from '@/components/FormInput';

interface Alumni {
  id: number;
  name: string;
  batch: string;
  job_role: string;
  company?: string;
  linkedin?: string;
  instagram?: string;
}

export default function AlumniPage() {
  const [alumni, setAlumni] = useState<Alumni[]>([]);
  const [filteredAlumni, setFilteredAlumni] = useState<Alumni[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    batch: '',
    job_role: '',
    company: '',
    instagram: '',
    linkedin: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchAlumni();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = alumni.filter(
        (alum) =>
          alum.batch.toLowerCase().includes(searchTerm.toLowerCase()) ||
          alum.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          alum.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredAlumni(filtered);
    } else {
      setFilteredAlumni(alumni);
    }
  }, [searchTerm, alumni]);

  async function fetchAlumni() {
    try {
      const { data } = await supabase
        .from('alumni')
        .select('*')
        .eq('status', 'approved')
        .order('batch', { ascending: false });

      setAlumni(data || []);
      setFilteredAlumni(data || []);
    } catch (error) {
      console.error('Error fetching alumni:', error);
    } finally {
      setLoading(false);
    }
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');

    try {
      const { error } = await supabase.from('alumni').insert([
        {
          ...formData,
          status: 'pending',
        },
      ]);

      if (error) throw error;

      setMessage('Your profile has been submitted for approval!');
      setFormData({
        name: '',
        phone: '',
        batch: '',
        job_role: '',
        company: '',
        instagram: '',
        linkedin: '',
      });
      setShowForm(false);
    } catch (error) {
      console.error('Error submitting form:', error);
      setMessage('Error submitting form. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Alumni Network</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          {showForm ? 'Cancel' : 'Add Your Profile'}
        </button>
      </div>

      {message && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
          {message}
        </div>
      )}

      {showForm && (
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Add Alumni Profile</h2>
          <form onSubmit={handleSubmit}>
            <FormInput
              label="Name"
              name="name"
              required
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Your full name"
            />
            <FormInput
              label="Phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Your phone number"
            />
            <FormInput
              label="Batch"
              name="batch"
              required
              value={formData.batch}
              onChange={handleInputChange}
              placeholder="e.g., 2020"
            />
            <FormInput
              label="Job Role"
              name="job_role"
              required
              value={formData.job_role}
              onChange={handleInputChange}
              placeholder="e.g., Software Engineer"
            />
            <FormInput
              label="Company"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              placeholder="Your company name"
            />
            <FormInput
              label="LinkedIn"
              name="linkedin"
              type="url"
              value={formData.linkedin}
              onChange={handleInputChange}
              placeholder="https://linkedin.com/in/yourprofile"
            />
            <FormInput
              label="Instagram"
              name="instagram"
              type="url"
              value={formData.instagram}
              onChange={handleInputChange}
              placeholder="https://instagram.com/yourprofile"
            />
            <button
              type="submit"
              disabled={submitting}
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
            >
              {submitting ? 'Submitting...' : 'Submit Profile'}
            </button>
          </form>
        </div>
      )}

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name, batch, or company..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {loading ? (
        <p className="text-gray-500">Loading alumni...</p>
      ) : filteredAlumni.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-3">
          {filteredAlumni.map((alum) => (
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
        <p className="text-gray-500">No alumni found</p>
      )}
    </div>
  );
}
