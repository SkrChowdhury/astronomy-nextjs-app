import React from 'react'
import FavoriteMedia from '../FavoriteMedia/FavoriteMedia'
import { Favorite } from '@/app/utils/interfaces/Favourite.interface'

export default function FavoriteCard({ favorite }: { favorite: Favorite }) {
  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
    <FavoriteMedia url={favorite.url} media_type={favorite.media_type} title={favorite.title} />
    <h2 className="text-lg font-semibold">{favorite.title}</h2>
  </div>
  )
}
