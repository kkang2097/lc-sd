import * as Tooltip from '@radix-ui/react-tooltip';
import { ReactNode } from 'react';

const KBD_STYLES = "px-1.5 py-0.5 bg-gray-700 rounded text-xs font-mono";

interface ShortcutTooltipProps {
  children: ReactNode;
  shortcut: string;
}

export const ShortcutTooltip = ({ children, shortcut }: ShortcutTooltipProps) => {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          {children}
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm shadow-lg"
            sideOffset={5}
            side="left"
            align="start"
            alignOffset={-10}
          >
            Press <kbd className={KBD_STYLES}>Shift</kbd> + <kbd className={KBD_STYLES}>Tab</kbd> to toggle
            <Tooltip.Arrow className="fill-gray-900" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};
