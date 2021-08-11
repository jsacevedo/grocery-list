import Link from 'next/link';

const Success = () => {
  return (
    <>
      <p>Data sent to DB</p>
      <Link href="/">
        <a>Home</a>
      </Link>
    </>
  );
};

export default Success;
