
import React, { useState } from 'react'
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
import { useAuthActions } from '@convex-dev/auth/react';

interface SignUpCardProps {
  setState: (state: SignInFlow) => void;
}

const SignUpCard = ({ setState }: SignUpCardProps) => {
  const { signIn } = useAuthActions();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pending, setPending] = useState(false)
  const [error, setError] = useState("");

  const onPasswordSignUp = (e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    if(password !== confirmPassword){
      return setError("Passwords do not match");
    }
    setPending(true);
    signIn("password", {name, email, password, flow: "signUp"})
    .catch(() => setError("Something went wrong"))
    .finally(() => setPending(false));
  }

  const onProviderSignUp = (value: "github" | "google") => {
    setPending(true);
    signIn(value).finally(() => setPending(false));
  }
  return (
    <Card className="h-full w-full p-8 rounded-xl">
      <CardHeader className='px-0 pt-0'>
        <CardTitle>
          Create your account
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
        <form className='space-y-2.5' onSubmit={onPasswordSignUp}>
          <Input
            disabled={pending}
            placeholder='Full Name'
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
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
          <Input
            disabled={pending}
            type='password'
            placeholder='Confirm Password'
            value={confirmPassword}
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
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
              onClick={()=> onProviderSignUp("google")}
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
              onClick={()=> onProviderSignUp("github")}
              variant="outline"
              size="lg"
              className="w-full relative"
            >
              <FaGithub 
                className="absolute top-3 left-2.5 size-5" 
              />
              Continue with GitHub
            </Button>
          </div>
          <p className='text-xs text-muted-foreground'>
             Already have an account? <span onClick={() => setState("signIn")} className='text-sky-700 hover:underline cursor-pointer'>Sign in</span>
          </p>
      </CardContent>
    </Card>
  )
}

export default SignUpCard