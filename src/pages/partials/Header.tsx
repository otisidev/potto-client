/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { authService } from "../../services/Auth.Service";
import Image from "./Image";

const Header = () => {
  const user = authService.GetUser();
  return (
    <div id="header" className="top-bar color-scheme-transparent">
      <div className="top-menu-controls">
        <div className="element-search autosuggest-search-activator">
          <input placeholder="Search..." />
        </div>
        <div className="logged-user-w avatar-inline">
          <div className="logged-user-i">
            <Image alt={user.name} src={user.image} width={40} />
            <div
              className="logged-user-info-w"
              style={{ display: "inline-block" }}
            >
              <div className="logged-user-name">{user?.name}</div>
              <div className="logged-user-role">{user?.email}</div>
            </div>

            <div className="logged-user-menu color-style-bright">
              <div className="logged-user-avatar-info">
                <img className="avatar" alt={user.name} src={user.image} />
                <div className="logged-user-info-w">
                  <div className="logged-user-name">{user?.name}</div>
                  <div className="logged-user-role">{user?.email}</div>
                </div>
              </div>
              <ul>
                <li>
                  <a
                    onClick={() => {
                      authService.Logout();
                      document.location.href = "/login";
                    }}
                  >
                    <i className="os-icon os-icon-signs-11"></i>
                    <span>Logout</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
