import React, { useEffect, useContext } from "react";
import Link from "next/link";
import authContext from '../context/auth/authContext';
import appContext from '../context/app/appContext';
import {useRouter} from 'next/router';

const Header = () => {

  const router = useRouter();

  const { authUser, user, logOut } = useContext(authContext);
  const { cleanState } = useContext(appContext);

  useEffect(() => {
    authUser();
  }, []);

  const redirect = () => {
    router.push('/');
    cleanState()
  }

  return (
    <header className="py-8 flex flex-col md:flex-row items-center justify-between">
        <img 
          className="w-64 mb-8 md:mb-0 cursor-pointer" src="/logo.svg" alt="" 
          onClick={() => redirect()}
        />
      <div className="">
        {user ? (
          <div className="flex items-center">
            <p className="mr-2">Hola {user.name}</p>
            <button
              type="button"
              className="bg-black px-5 py-3 rounded-lg text-white uppercase" 
              onClick={logOut}
            >Log out</button>
          </div>
        ) : (
          <>
            <Link href="/login">
              <a className="bg-red-500 px-5 py-3 rounded-lg text-white uppercase mr-2">
                Log in
              </a>
            </Link>
            <Link href="/newaccount">
              <a className="bg-black px-5 py-3 rounded-lg text-white uppercase">
                New Account
              </a>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
