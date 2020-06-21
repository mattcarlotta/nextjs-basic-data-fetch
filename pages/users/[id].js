import axios from "axios";
import Head from "next/head";
import Link from "next/link";

function User({ error, user }) {
  if (error) return <p>{error.toString()}</p>;
  if (user.length === 0) return <p>Loading...</p>;

  return (
    <>
      <Head>
        <title>👤 - {user.name}</title>
      </Head>
      <ul>
        <li>
          <h2>Name: {user.name}</h2>
        </li>
        <li>
          <h2>Username: {user.username}</h2>
        </li>
        <li>
          <h2>Email: {user.email}</h2>
        </li>
        <li>
          <h2>
            Address: {user.address.street} {user.address.city}
            {", "}
            {user.address.zipcode}
          </h2>
        </li>
        <li>
          <h2>Phone: {user.phone}</h2>
        </li>
      </ul>
      <Link href="/">
        <a>
          <h2>Go Home</h2>
        </a>
      </Link>
    </>
  );
}

/* 
 Use getServerSideProps if the requested data needs to change
 the page layout during RUNTIME -- when the project is running 
 in production (next start), this will be called every time this 
 page is loaded.
*/
export async function getServerSideProps({ query }) {
  let user = [];
  let error = "";
  try {
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${query.id}`
    );
    user = res.data;
  } catch (err) {
    error = err.toString();
  }

  return {
    props: {
      error,
      user,
    },
  };
}

export default User;
