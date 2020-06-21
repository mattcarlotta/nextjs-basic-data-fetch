import axios from "axios";
import Head from "next/head";
import Link from "next/link";

function Users({ error, users }) {
  if (error) return <p>{error.toString()}</p>;
  if (users.length === 0) return <p>Loading...</p>;

  return (
    <>
      <Head>
        <title>👤 - Users</title>
      </Head>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link href="/users/[id]" as={`/users/${user.id}`}>
              <a>
                <h2>{user.name}</h2>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

/* 
 Use getStaticProps if the requested data won't change and
 it will be used to construct the page layout during BUILDTIME; 
 when the project is being built for production (next build), 
 this will called ONCE and only ONCE. It will NOT be called 
 again when the project is RUNNING in production (next start).
*/
export async function getStaticProps() {
  let users = [];
  let error = "";
  try {
    const res = await axios.get("https://jsonplaceholder.typicode.com/users");
    users = res.data;
  } catch (err) {
    error = err.toString();
  }

  return {
    props: {
      error,
      users,
    },
  };
}

export default Users;
