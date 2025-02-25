import React from 'react';

interface NameListProps {
  names: string[];
}

export default function NameList({ names }: NameListProps) {
  if (names.length === 0) return null;
  return (
    <div className="w-full max-w-md mx-auto mt-5 bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-bold mb-3">✨ Nombres Generados:</h2>
      <ul className="list-disc pl-5 space-y-2">
        {names.map((name, index) => (
          <li key={index} className="text-lg">
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
}
