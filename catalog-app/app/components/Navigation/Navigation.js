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

function AuthButton({ isAuthed }) {
  return (
    <button className={googleAuthButton}>
      <span className={authIcon} />
      <span className={buttonText}>Google</span>
    </button>
  );
}

export default function Navigation({ isAuthed }) {
  return (
    <header className={navBar}>
      <div className={navWrapper}>
        <HomeLink />
        <AuthButton isAuthed={isAuthed} />
      </div>
    </header>
  );
}
