"use client";
import UserButton from "@/components/home"; // Assuming this button shows the user info

const Home = () => {

  return (
    <div>
      {/* Pass the session prop to UserButton */}
      <UserButton  />
    </div>
  );
};

export default Home;
