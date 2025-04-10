// components/functional/statCard.tsx

import React from 'react';

type StatCardProps = {
  title: string;
  value: string;
  fromColor?: string; // Make optional to allow default values
  toColor?: string;
};

export default function StatCard({
  title,
  value,
  fromColor = "blue-500",
  toColor = "purple-500",
}: StatCardProps) {
  const gradientClass = `bg-gradient-to-r from-${fromColor} to-${toColor}`;

  return (
    <div className={`${gradientClass} text-white p-6 rounded-2xl shadow-md`}>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}
