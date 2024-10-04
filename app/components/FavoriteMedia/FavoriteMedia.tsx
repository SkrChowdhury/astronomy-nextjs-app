import React from 'react'

export default function FavoriteMedia ({ url, media_type, title }: { url: string; media_type: string; title: string }) {
    return media_type === 'image' ? (
        <img src={url} alt={title} className="w-full h-48 object-cover rounded-md mb-2" />
      ) : (
        <iframe
          width="100%"
          height="200"
          src={url}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="rounded-md mb-2"
        />
      );
}
