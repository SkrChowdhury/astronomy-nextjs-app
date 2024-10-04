import Image from 'next/image';
import React from 'react'

export default function APOMedia({ media_type, url, title }: { media_type: string; url: string; title: string }) {
  return (
    <div className="flex justify-center">
    {media_type === 'image' ? (
      // Render image if media type is 'image'
      <Image
        src={url}
        alt={title}
        width={600}
        height={400}
        className="rounded-lg"
      />
    ) : (
      // Render iframe for video if media type is 'video'
      <iframe
        width="600"
        height="400"
        src={url}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="rounded-lg"
      />
    )}
  </div>
  )
}
