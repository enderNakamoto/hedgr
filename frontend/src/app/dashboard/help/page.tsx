import Link from "next/link";

const Help = () => {
  return (
    <div className="mt-10 ml-10">
      COMING SOON!
      <Link
        href="/dashboard/markets"
        className="px-5 py-3 mx-4 bg-blue-500 text-white"
      >
        Go Back
      </Link>
    </div>
  );
};

export default Help;
