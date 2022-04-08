/* eslint-disable react/no-unescaped-entities */
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notify, login } from "../redux/reducer/auth";
import { useRouter } from "next/router";
import Cookies from "cookie-cutter";
function Login() {
  const initial = { email: "", password: "" };
  const [userData, setUserData] = useState(initial);
  const { email, password } = userData;
  const { auth } = useSelector((state) => state);
  const router = useRouter();

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password)
      return dispatch(notify({ error: ["Please add all fields"] }));
    else if (password.length < 6)
      return dispatch(
        notify({ error: ["Password must be at least 6 characters."] })
      );

    const res = await dispatch(login(userData));
    // cái này sẽ lưu 7 ngày
    Cookies.set("refreshToken", res.payload.refresh_token, {
      path: "api/auth/accessToken",
      expires: "7d",
    });

    localStorage.setItem("firstLogin", true);
  };

  useEffect(() => {
    if (auth.token) {
      router.push("/");
    }
  }, [auth.token, router]);
  return (
    <div>
      <Head>
        <title>sign-in page</title>
      </Head>
      <form
        className="mx-auto my-4"
        style={{ maxWidth: "500px" }}
        onSubmit={handleSubmit}
      >
        <div className="form-group my-2">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            name="email"
            defaultValue={email}
            onChange={handleChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group my-2">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            name="password"
            defaultValue={password}
            onChange={handleChange}
          />
        </div>
        <div className="form-check my-2">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Save account ...
          </label>
        </div>
        <button type="submit " className="btn btn-primary w-100 btn-dark">
          Submit
        </button>
        <p>
          You don't have an account ? -
          <span>
            <Link href="/register ">
              <a className="text-decoration-underline text-danger">register</a>
            </Link>
          </span>
        </p>
      </form>
    </div>
  );
}

export default Login;
