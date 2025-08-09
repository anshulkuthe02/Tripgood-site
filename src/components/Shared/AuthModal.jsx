import React, { useState } from 'react';
import LoginForm from '../Auth/LoginForm';
import SignupForm from '../Auth/SignupForm';

const AuthModal = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md animate-fadeIn">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {isLogin ? "Login to TripGood" : "Create your TripGood Account"}
      </h2>
      {isLogin ? <LoginForm /> : <SignupForm />}
      <div className="text-center mt-4">
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="text-blue-500 hover:underline transition-all"
        >
          {isLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}
        </button>
      </div>
    </div>
  );
};

export default AuthModal;
