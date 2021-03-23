import Link from 'next/link';
import { signIn, signin, signout, useSession } from 'next-auth/client';
import { GoogleIcon } from './icons/google-icon';

const Header = () => {
  const [session, loading] = useSession();

  function signGoogle() {
    signin('google', { callbackUrl: 'http://localhost:3000' })
  }

  function signOut() {
    signout()
  }

  // (session?.user?.admin);



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
            <button onClick={signGoogle} className="btn btn-punch">
              <GoogleIcon />
              <span className='ml-1'>Sign with Google</span>
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
