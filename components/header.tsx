import Link from 'next/link';
import { signIn, signout, useSession } from 'next-auth/client';
import { GoogleIcon } from './icons/google-icon';

const Header = () => {
  const [session, loading] = useSession();
  // function signGoogle() {
  //   signIn('google')
  // }

  function signOut() {
    signout()
  }
  return (
    <header>
      <nav>
        <Link href="/">
          <a className="logo">
            Comtel Inventory
          </a>
        </Link>


        <div>
          {!session && (
            <button onClick={() => signIn('google')} className="btn btn-punch">
              <div className='sign-with-google'>
                <GoogleIcon />
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
      </nav>
    </header>
  );
};

export default Header;
