import { Button } from '@/components/ui/button';
import { Nunito } from "next/font/google";
import { cn } from '@/lib/utils';

import { LoginButton } from '@/components/auth/loginButton';

const font = Nunito({
  subsets: ['latin'],
  weight: ["600"]
})

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
      <div className="space-y-6">
        <h1 className={cn(
          "text-6xl font-semibold text-white drop-shadow-md",
          font.className,
        )}>
          Auth
        </h1>
        <div>
          <LoginButton mode="modal">
            <Button variant="secondary" size="lg">
              Get Started
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}

