'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Image from 'next/image';

interface GalleryImage {
  id: number;
  image_url: string;
  caption?: string;
}

export default function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchImages();
  }, []);

  async function fetchImages() {
    try {
      const { data } = await supabase
        .from('gallery')
        .select('*')
        .order('created_at', { ascending: false });

      setImages(data || []);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Gallery</h1>

      {loading ? (
        <p className="text-gray-500">Loading images...</p>
      ) : images.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-3">
          {images.map((image) => (
            <div
              key={image.id}
              className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100"
            >
              <div className="relative h-64">
                <Image
                  src={image.image_url}
                  alt={image.caption || 'Gallery image'}
                  fill
                  className="object-cover"
                />
              </div>
              {image.caption && (
                <div className="p-4">
                  <p className="text-sm text-gray-600">{image.caption}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No images available</p>
      )}
    </div>
  );
}
