'use client';
import React, { useState } from 'react';
import InputForm from '@/app/components/InputForm';
import NameList from '@/app/components/NameList';

export default function Home() {
  const [names, setNames] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const generateNames = async (description: string) => {
    setLoading(true);
    try {
      const res = await fetch('/api/generate-names', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description }),
      });
      const data = await res.json();
      setNames(data.names || []);
    } catch (error) {
      console.error('Error generando nombres:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-5">
      <h1 className="text-4xl font-bold mb-6 text-center">
        🚀 Generador Inteligente de Nombres para Startups
      </h1>
      <InputForm onGenerate={generateNames} />
      {loading ? (
        <p className="mt-5 text-lg text-gray-500">✨ Generando nombres...</p>
      ) : (
        <NameList names={names} />
      )}
    </main>
  );
}
