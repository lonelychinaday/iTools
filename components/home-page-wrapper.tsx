'use client';

import { ClientHomePage } from '@/components/client-home-page';
import { commandPaletteController } from '@/lib/command-palette-controller';

export function HomePageWrapper() {
  const handleCommandPalette = () => {
    commandPaletteController.open();
  };

  return <ClientHomePage onCommandPaletteTrigger={handleCommandPalette} />;
}
