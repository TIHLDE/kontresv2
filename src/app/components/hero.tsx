import { Button } from '@/components/ui/button';



import styles from './welcometitle.module.css';
import WelcomeTitle from '@/app/components/welcometitle';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function Hero() {
  return (
    <div className="h-[100vh] w-full flex flex-col justify-center items-center relative overflow-x-hidden">
      <WelcomeTitle />

      <div className={`flex flex-col ${styles.action}`}>
        <p className="text-lg md:text-xl mt-8 mb-12 text-center text-muted-foreground">
          Her kan du booke kontoret, soundbox og utstyr, <br />
          om du er medlem i TIHLDE.
        </p>
        <div className="flex items-center flex-col md:flex-row">
          <Button className="m-2 p-8 text-lg group">
            <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform duration-150" />
            Reserver kontoret{' '}
          </Button>
          <Button className="m-2 p-8 text-lg group" variant="outline">
            Reserver soundbox
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-150" />
          </Button>
        </div>
      </div>
    </div>
  );
}