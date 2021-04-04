import Link from 'next/link';
import { signIn, signout, useSession } from 'next-auth/client';
import { GoogleIcon } from './icons/google-icon';
import React from 'react';
import cn from 'classnames'
import { LocationsList } from './locations-list';
import { ToggleMenuIcon } from './icons/toggle-menu-icon';

const Header = () => {
  const [session, loading] = useSession();
  const [showSideMenu, setShowSideMenu] = React.useState(false)
  // function signGoogle() {
  //   signIn('google')
  // }



  function signOut() {
    signout()
  }
  return (
    <>
      <header>
        <nav>
          <Link href="/">
            <a className="logo">
              Comtel Inventory
          </a>
          </Link>

          <div className='auth'>
            {!session && (
              <button onClick={() => signIn('google')} className="btn btn-punch">
                <div className='sign-with-google'>
                  <div className='google-icon'>
                    <GoogleIcon />
                  </div>
                  <span>Sign with Google</span>
                </div>
              </button>
            )}
            {session && (
              <div className='profile'>

                <span
                  style={{ backgroundImage: `url(${session.user.image})` }}
                  className="avatar"
                />

                <span className="email">{session.user.email}</span>

                <button className="btn btn-ocean" onClick={signOut}>Sign out</button>

              </div>
            )}
          </div>
          <div className='toggle-menu-button' onClick={() => setShowSideMenu(!showSideMenu)}>
            <ToggleMenuIcon />
          </div>
        </nav>
      </header>
      <div className={cn('toggle-menu', { 'toggle-menu-show': showSideMenu })} onClick={() => setShowSideMenu(false)}>
        <LocationsList />
      </div>
    </>

  );
};

export default Header;
