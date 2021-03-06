import React, { useContext, useEffect } from "react";
import Layout from "../components/Layout";
import Alert from "../components/Alert";
import authContext from "../context/auth/authContext";
import Link from "next/link";
import Dropzone from "../components/Dropzone";
import appContext from "../context/app/appContext";

const Index = () => {
  const { authUser } = useContext(authContext);

  const { fileMessage, url } = useContext(appContext);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      authUser();
    }
  }, []);

  const fullUrl = () => (`${process.env.frontendURL}/links/${url}`)

  return (
    <Layout>
      <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
        {url ? (
          <>
          <p className="text-center text-2xl mt-10">
            <span className="font-bold text-red-700 text-3xl uppercase">
              Tu url es
            </span>{" "}
            {fullUrl()}
          </p>
          <button
            type="button"
            className="bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase mt-10 font-bold"
            onClick={() => navigator.clipboard.writeText(fullUrl())}
          >Copy Link</button>
          </>
        ) : (
          <>
            {fileMessage && <Alert />}
            <div className="lg:flex md:shadow-lg p-5 bg-white rounded-lg py-10">
              <Dropzone />

              <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0">
                <h2 className="text-4xl font-sans font-bold text-gray-800 my-4">
                  Share your files the simple way
                </h2>
                <p className="text-lg leading-loose">
                  <span className="text-red-500 font-bold">React-Send</span>{" "}
                  allows you to share files the simple way ever possible! Just
                  drag your files and we'll do the rest for you!
                </p>
                <Link href="/newaccount">
                  <a className="text-red-500 font-bold text-lg hover:text-red-700">
                    Create an account for extra features
                  </a>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Index;
