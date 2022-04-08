/* eslint-disable react/no-unescaped-entities */
import Head from "next/head";
import Link from "next/link";
import valid from "../utils/valid";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createUser, notify } from "../redux/reducer/auth";

function Register() {
  const initialData = { name: "", email: "", password: "", cf_password: "" };
  const [data, setData] = useState(initialData);
  const { name, email, password, cf_password } = data;
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = valid(name, email, password, cf_password);
    if (err.length > 0) {
      return dispatch(notify({ error: err }));
    } else {
      await dispatch(createUser(data));
    }
    // setData(initialData);
  };
  return (
    <div>
      <Head>
        <title>Register - page</title>
      </Head>
      <form
        className="mx-auto my-4"
        style={{ maxWidth: "500px" }}
        onSubmit={handleSubmit}
      >
        <div className="form-group my-2">
          <label htmlFor="name">YourName</label>
          <input
            type="text"
            className="form-control"
            id="name"
            aria-describedby="emailHelp"
            placeholder="Enter Your Name"
            name="name"
            defaultValue={name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group my-2">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
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
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            name="password"
            defaultValue={password}
            onChange={handleChange}
          />
        </div>
        <div className="form-group my-2">
          <label htmlFor="CF-password">Comfirm-Password</label>
          <input
            type="password"
            className="form-control"
            id="CF-password"
            placeholder="Comfirm-Password"
            name="cf_password"
            defaultValue={cf_password}
            onChange={handleChange}
          />
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Check me out
          </label>
        </div>
        <button type="submit " className="btn btn-primary w-100 btn-dark">
          Submit
        </button>
        <p>
          Already have an acount ? -
          <span>
            <Link href="/login">
              <a className="text-decoration-underline text-danger">Login now</a>
            </Link>
          </span>
        </p>
      </form>
    </div>
  );
}

export default Register;
