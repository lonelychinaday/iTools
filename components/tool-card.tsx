import type React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface ToolCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}

export function ToolCard({ icon, title, description, href }: ToolCardProps) {
  return (
    <Card className='flex flex-col h-full transition-all hover:shadow-md'>
      <CardHeader>
        <div className='rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center text-primary mb-4'>
          {icon}
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter className='mt-auto'>
        <Button variant='ghost' className='gap-2' asChild>
          <Link href={href}>
            Try it now <ArrowRight className='h-4 w-4' />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
