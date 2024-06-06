import React from "react";
import { CiSearch } from "react-icons/ci";
import { useGlobalContext } from "../context";
import { useNavigate } from "react-router-dom";
import { Bars } from "./FaBars";
const url =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5Rn1K8AVJHTGGtnb28OMCICGsnl-VuJDOrS8pIblXVA&s";

export const Navbar = () => {
  const { profile, searchKeyword, setSearchKeyword } = useGlobalContext();

  const navigate = useNavigate();
  function handleChange(e) {
    setSearchKeyword(e.target.value);
  }
  const handleClick = (e) => {
    e.preventDefault();

    navigate("/search", { state: { searchKeyword } });
  };
  return (
    <>
      <div className="navbar">
        <Bars prop="sidebar-btn"></Bars>
        <div id="image-id">
          <h2 id="imageText">Y-CLONE</h2>
        </div>

        <form className="navbar-search">
          <input
            type="text"
            id="search"
            className="searchMain"
            onChange={handleChange}
            placeholder="Search"
            value={searchKeyword}
          ></input>

          <label htmlFor="search">
            <button type="submit" className="btn search" onClick={handleClick}>
              <CiSearch></CiSearch>
            </button>
          </label>
        </form>
        <div id="profile">
          <div className="userImage">
            <img src={profile.img} alt="" id="profile-pic"></img>
          </div>
          <div id="user">
            <h2>{profile.name}</h2>
          </div>
        </div>
      </div>
    </>
  );
};
