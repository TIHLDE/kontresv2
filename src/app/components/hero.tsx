import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <div className='h-[calc(100vh-80px)] w-full flex flex-col justify-center items-center'>
      <h1 className='text-6xl font-bold md:mx-32 mx-16 text-center'>Lyst på noe for deg selv?</h1>
      <div className="flex flex-col justify-center items-center md:flex-row mt-8">
        <Button className='m-2 p-8 text-lg group'>
          Reserver kontoret{" "}
          <ArrowRight className='ml-2 group-hover:translate-x-1 transition-transform duration-150' />
        </Button>
        <Button className='m-2 p-8 text-lg group' variant='outline'>
          Reserver soundbox
          <ArrowRight className='ml-2 group-hover:translate-x-1 transition-transform duration-150' />
        </Button>
      </div>
    </div>
  );
}
