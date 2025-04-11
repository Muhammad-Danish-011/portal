import React from 'react';

type StatCardProps = {
  title: string;
  value: string;
  fromColor?: string;
  toColor?: string;
};

export default function StatCard({
  title,
  value,
  fromColor = "blue-500",
  toColor = "purple-500",
}: StatCardProps) {
  // If both colors are "black", use plain bg-black
  const isBlack = fromColor === "black" && toColor === "black";
  const backgroundClass = isBlack
    ? "bg-black"
    : `bg-gradient-to-r from-${fromColor} to-${toColor}`;

  return (
    <div className={`${backgroundClass} text-white p-6 rounded-2xl shadow-md`}>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}
