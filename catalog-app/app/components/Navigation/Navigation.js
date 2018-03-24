import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  googleAuthButton,
  buttonText,
  authIcon,
  navLink,
  navBar,
  navWrapper,
  dropdown,
  dropdownContent,
  dropdownImage,
} from './styles.css';

Navigation.propTypes = {
  isAuthed: PropTypes.bool.isRequired,
};

function HomeLink() {
  return (
    <Link className={navLink} to="/">
      {'Catalog App'}
    </Link>
  );
}

function AuthButton({ isAuthed, onAuth }) {
  return (
    <button className={googleAuthButton} onClick={onAuth}>
      <span className={authIcon} />
      <span className={buttonText}>Google</span>
    </button>
  );
}

function LoggedUserMenu({ userInfo }) {
  return (
    <div className={dropdown}>
      <img className={dropdownImage} src={userInfo.photoURL} />
      <div className={dropdownContent}>
        <Link className={navLink} to="/logout">
          {'Logout'}
        </Link>
      </div>
    </div>
  );
}

export default function Navigation({ isAuthed, onAuth, userInfo }) {
  return (
    <header className={navBar}>
      <div className={navWrapper}>
        <HomeLink />
        {isAuthed ? (
          <LoggedUserMenu userInfo={userInfo} />
        ) : (
          <AuthButton isAuthed={isAuthed} onAuth={onAuth} />
        )}
      </div>
    </header>
  );
}
