"use client"
import toast, { Toaster } from 'react-hot-toast';
import 'animate.css';

export default function Home() {
  const notify = () => toast('Here is your toast.');
  return (
    <div>
      <button onClick={notify}>click me</button>
      <Toaster />
    </div>
  );
}
