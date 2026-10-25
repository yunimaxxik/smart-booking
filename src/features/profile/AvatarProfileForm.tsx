import { useRef, useState } from 'react';

import { useAuthStore } from '@/shared/store/authStore';
import { updateAvatar } from '@/shared/api/authApi';
import type { User } from '@/shared/interfaces/User';

const AvatarProfileForm = ({ user }: { user: User }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const login = useAuthStore((store) => store.login);
  const token = useAuthStore((store) => store.token);

  const uploadAvatar = async (base64String: string) => {
    setIsUploading(true);
    setError('');
    setSuccessMessage('');
    try {
      const result = await updateAvatar(user.email, base64String);
      login(token!, result);
      setSuccessMessage('Аватар успешно обновлён');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
      setPreview(null);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 1024 * 1024) {
      setError('Файл слишком большой');
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      setPreview(base64);
      uploadAvatar(base64);
    };
    reader.readAsDataURL(file);
  };

  const initial =
    user?.userName?.[0]?.toUpperCase() ||
    user?.email?.[0]?.toUpperCase() ||
    '?';

  return (
    <div className="flex flex-col items-center gap-5">
      {/* Сообщения */}
      {error && (
        <div
          role="alert"
          className="w-full rounded-xl border border-[#D9A38A] bg-[#FBEFE8] px-4 py-3 text-center text-sm text-[#8A3B2A]"
        >
          {error}
        </div>
      )}
      {successMessage && (
        <div
          role="alert"
          className="w-full rounded-xl border border-green-300 bg-green-50 px-4 py-3 text-center text-sm text-green-800"
        >
          {successMessage}
        </div>
      )}

      {/* Аватар — крупный, по центру */}
      <div className="relative mx-auto">
        {preview ? (
          <img
            src={preview}
            alt="Превью аватара"
            className="h-40 w-40 rounded-full border-4 border-[#C49A6C] object-cover shadow-md sm:h-48 sm:w-48"
          />
        ) : user.avatar ? (
          <img
            src={user.avatar}
            alt="Аватар"
            className="h-40 w-40 rounded-full border-4 border-[#E4D5C1] object-cover shadow-md sm:h-48 sm:w-48"
          />
        ) : (
          <div className="flex h-40 w-40 items-center justify-center rounded-full border-4 border-[#C49A6C] bg-[#8B5E34] text-5xl font-semibold text-[#FAF6F0] shadow-md sm:h-48 sm:w-48 sm:text-6xl">
            {initial}
          </div>
        )}

        {isUploading && (
          <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 text-sm font-medium text-[#FAF6F0]">
            Загрузка…
          </div>
        )}
      </div>

      {/* Скрытый input */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Кнопка */}
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        disabled={isUploading}
        className="cursor-pointer rounded-xl bg-[#8B5E34] px-6 py-2.5 font-medium text-[#FAF6F0] shadow-sm transition-colors hover:bg-[#6F4A29] active:bg-[#5A3B20] focus:outline-none focus:ring-2 focus:ring-[#C49A6C]/60 disabled:cursor-not-allowed disabled:bg-[#C9B39A] disabled:text-[#FAF6F0]/70"
      >
        {isUploading ? 'Загружаем…' : 'Загрузить фото'}
      </button>

      <p className="text-center text-xs text-[#5A4432]/70">
        JPG, PNG или GIF, не больше 1 МБ
      </p>
    </div>
  );
};

export default AvatarProfileForm;
