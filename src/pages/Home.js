import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Home() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  let userData = localStorage.getItem("userData");

  useEffect(() => {
    if (userData === null) {
      console.log(userData);
      navigate("/login");
    }
    fetch(
      "https://v2.jokeapi.dev/joke/any?format=json&blacklistFlags=nsfw,sexist&type=single&lang=EN&amount=10"
    )
      .then((resp) => resp.json())
      .then((data) => {
        setData(data?.jokes);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error while fetching");
      });
  }, [userData, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("userData");
    console.log(userData);
    toast.success("Logged Out");
    navigate("/login");
  };

  return (
    <div className="bg-success-subtle px-5 py-3">
      <table className="table caption-top">
        <caption
          style={{ fontFamily: "Roboto, sans-serif" }}
          className="text-black fs-4 text-center font-weight-bold"
        >
          Jokes
        </caption>
        <thead className="table-dark">
          <tr>
            <th scope="col">id</th>
            <th scope="col">Category</th>
            <th scope="col">Type</th>
            <th scope="col">Joke</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((ele) => {
            return (
              <tr key={ele.id}>
                <td>{ele.id}</td>
                <td>{ele.category}</td>
                <td>{ele.type}</td>
                <td className="w-50 text-wrap">{ele.joke}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="d-flex justify-content-center align-items-center mb-3">
        <button
          className="btn btn-danger btn-lg btn-block"
          onClick={handleLogout}
        >
          LogOut
        </button>
      </div>
    </div>
  );
}

export default Home;
