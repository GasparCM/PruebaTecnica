'use client';
import React, { useState } from 'react';

interface InputFormProps {
  onGenerate: (description: string) => void;
}

export default function InputForm({ onGenerate }: InputFormProps) {
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (description.trim()) {
      onGenerate(description);
      setDescription('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto p-4">
      <textarea
        className="w-full p-3 border rounded-md resize-none"
        rows={3}
        placeholder="Describe tu idea de startup..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded-lg mt-3 hover:bg-blue-700 transition"
      >
        Generar Nombres 🚀
      </button>
    </form>
  );
}
