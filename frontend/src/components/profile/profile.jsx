import { useSelector } from "react-redux";

function Profile() {
  const user = useSelector((state) => state.auth.user);

  return (
    <div>
      <h1>Profile Page</h1>
      <p>Username: {user?.username}</p>
      <p>Email: {user?.email}</p>
    </div>
  );
}

export default Profile;
