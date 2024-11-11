"use client";

import React, { useState } from 'react'
import { SignInFlow } from '../types';
import SignUpCard from './sign-up-card';
import SignInCard from './sign-in-card';

const AuthScreen = () => {
  const [state, setState] = useState<SignInFlow>("signIn")
  return (
    <div 
    className='h-full flex items-center justify-center bg-[#5c3b58] w-full'>
      <div className="md:h-auto md:w-[420px]">
        {state === "signIn" ? <SignInCard setState={setState} /> : <SignUpCard setState={setState}/>}
      </div>
    </div>
  )
}

export default AuthScreen