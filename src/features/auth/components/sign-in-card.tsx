
import React, { useState } from 'react'
import { useAuthActions } from "@convex-dev/auth/react";

import { 
  Card, 
  CardHeader, 
  CardDescription, 
  CardContent,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { SignInFlow } from '../types';
import { TriangleAlert } from 'lucide-react';

interface SignInCardProps {
  setState: (state: SignInFlow) => void;
}

const SignInCard = ({ setState }: SignInCardProps) => {
  const { signIn } = useAuthActions();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false)
  const [error, setError] = useState("");

  const onPasswordSignIn = (e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    setPending(true);
    signIn("password", {email, password, flow: "signIn"})
    .catch(() => setError("Invalid email or password"))
    .finally(() => setPending(false));
  }

  const onProviderSignIn = (value: "github" | "google") => {
    setPending(true);
    signIn(value).finally(() => setPending(false));
  }


  return (
    <Card className="h-full w-full p-8 rounded-xl">
      <CardHeader className='px-0 pt-0'>
        <CardTitle>
          Login to continue
        </CardTitle>
        <CardDescription>
          Use your email or another service to continue
        </CardDescription>
      </CardHeader>
      {!!error && (
        <div 
          className='bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 mb-6 text-destructive text-sm'
        >
          <TriangleAlert className='size-4' />
          <p className=''>{error}</p>
        </div>
      )}
      <CardContent className="space-y-5 px-0 pb-0">
        <form className='space-y-2.5' onSubmit={onPasswordSignIn}>
          <Input
            disabled={pending}
            type='email'
            placeholder='Email'
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            disabled={pending}
            type='password'
            placeholder='Password'
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button 
            type='submit'
            className='w-full'
            size="lg"
            disabled={pending}
          >
            Continue
          </Button>
        </form>
        <Separator />
          <div className="flex flex-col gap-y-2.5">
            <Button
              disabled={pending}
              onClick={()=> onProviderSignIn("google")}
              variant="outline"
              size="lg"
              className="w-full relative"
            >
              <FcGoogle 
                className="absolute top-3 left-2.5 size-5" 
              />
              Continue with Google
            </Button>
            <Button
              disabled={pending}
              variant="outline"
              size="lg"
              className="w-full relative"
              onClick={()=> onProviderSignIn("github")}
            >
              <FaGithub 
                className="absolute top-3 left-2.5 size-5" 
              />
              Continue with GitHub
            </Button>
          </div>
          <p className='text-xs text-muted-foreground'>
            Don&apos;t have an account? <span onClick={() => setState("signUp")} className='text-sky-700 hover:underline cursor-pointer'>Sign up</span>
          </p>
      </CardContent>
    </Card>
  )
}

export default SignInCard