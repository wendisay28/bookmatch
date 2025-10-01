import React, { useState } from 'react';
import { Heart, X, Bookmark, Share2, Star, MapPin, Book } from 'lucide-react';

interface Book {
  title: string;
  author: string;
}

export interface UserProfile {
  name: string;
  age: number;
  location: string;
  distance: number;
  photo?: string;
  compatibility: number;
  rating: number;
  interests?: string[];
  favoriteBook?: Book;
  bio?: string;
}

interface ProfileCardProps {
  profile: UserProfile;
  onLike?: () => void;
  onDislike?: () => void;
  onBookmark?: () => void;
  onShare?: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  profile,
  onLike = () => {},
  onDislike = () => {},
  onBookmark = () => {},
  onShare = () => {}
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike();
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    onBookmark();
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:shadow-3xl">
      {/* Imagen principal con overlay */}
      <div className="relative h-96 overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100">
        <img
          src={profile.photo || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=800&fit=crop'}
          alt={profile.name}
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-700 ${
            imageLoaded ? 'scale-100 opacity-100' : 'scale-110 opacity-0'
          }`}
        />
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {/* Badge de compatibilidad */}
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg flex items-center gap-2 animate-pulse">
          <div className="w-2 h-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full animate-ping absolute" />
          <span className="text-2xl">✨</span>
          <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 text-lg">
            {profile.compatibility}%
          </span>
        </div>

        {/* Información principal sobre la imagen */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="space-y-2">
            <h2 className="text-4xl font-bold text-white drop-shadow-lg">
              {profile.name}, {profile.age}
            </h2>
            <div className="flex items-center gap-3 text-white/95">
              <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md rounded-full px-3 py-1">
                <MapPin size={14} />
                <span className="text-sm font-medium">{profile.location}</span>
              </div>
              <span className="text-sm">•</span>
              <span className="text-sm font-medium">{profile.distance} km</span>
            </div>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={i < Math.floor(profile.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-white/40'}
                />
              ))}
              <span className="text-white/90 text-sm ml-1 font-semibold">{profile.rating}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-6 space-y-4">
        {/* Intereses */}
        <div className="flex flex-wrap gap-2">
          {profile.interests?.slice(0, 5).map((interest, index) => (
            <span
              key={index}
              className="px-3 py-1.5 bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 rounded-full text-xs font-semibold border border-purple-100 hover:scale-105 transition-transform cursor-default"
            >
              {interest}
            </span>
          ))}
          {profile.interests && profile.interests.length > 5 && (
            <span className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full text-xs font-semibold">
              +{profile.interests.length - 5}
            </span>
          )}
        </div>

        {/* Libro favorito */}
        {profile.favoriteBook && (
          <div className="relative bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4 rounded-2xl border border-purple-100 overflow-hidden group hover:shadow-md transition-shadow">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-200/30 rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
            <div className="relative flex gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg">
                <Book size={20} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-purple-600 mb-1">LIBRO FAVORITO</p>
                <p className="font-bold text-gray-900 text-sm line-clamp-1">
                  "{profile.favoriteBook.title}"
                </p>
                <p className="text-xs text-gray-600 mt-0.5">
                  por {profile.favoriteBook.author}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Bio */}
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
          {profile.bio}
        </p>

        {/* Botones de acción */}
        <div className="flex gap-3 pt-2">
          <button
            onClick={onDislike}
            className="flex-1 h-14 bg-red-50 text-red-500 rounded-2xl font-semibold hover:bg-red-100 active:scale-95 transition-all duration-200 flex items-center justify-center shadow-sm hover:shadow-md group"
          >
            <X size={28} className="group-hover:rotate-90 transition-transform duration-300" />
          </button>

          <button
            onClick={handleBookmark}
            className={`flex-1 h-14 rounded-2xl font-semibold active:scale-95 transition-all duration-200 flex items-center justify-center shadow-sm hover:shadow-md ${
              isBookmarked
                ? 'bg-amber-50 text-amber-600 hover:bg-amber-100'
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Bookmark
              size={24}
              className={`transition-all duration-300 ${isBookmarked ? 'fill-amber-600 scale-110' : ''}`}
            />
          </button>

          <button
            onClick={onShare}
            className="flex-1 h-14 bg-blue-50 text-blue-500 rounded-2xl font-semibold hover:bg-blue-100 active:scale-95 transition-all duration-200 flex items-center justify-center shadow-sm hover:shadow-md group"
          >
            <Share2 size={24} className="group-hover:rotate-12 transition-transform duration-300" />
          </button>

          <button
            onClick={handleLike}
            className={`flex-[1.5] h-14 rounded-2xl font-semibold active:scale-95 transition-all duration-200 flex items-center justify-center shadow-md hover:shadow-lg ${
              isLiked
                ? 'bg-gradient-to-r from-pink-500 to-red-500 text-white'
                : 'bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700'
            }`}
          >
            <Heart
              size={28}
              className={`transition-all duration-300 ${
                isLiked ? 'fill-white scale-125 animate-pulse' : ''
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;