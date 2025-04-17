// components/Logo.tsx

import Image from "next/image"; // Importing the Next.js Image component for optimized image loading

const Logo = () => {
  return (
    <div className="flex justify-center items-center mb-2 rounded-lg bg-gray-500/30">
      <Image src={"/logo.png"}     
        alt="Universal Motors Logo"
        width={100}
        height={0}
        className="mb-4 rounded-lg"
      />
    </div>
  );
};

export default Logo;
