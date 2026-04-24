'use client'

import * as React from 'react'
import { Dialog as DialogPrimitive } from 'radix-ui'

import { cn } from '@/lib/utils'

function Sheet({ ...props }: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="sheet" {...props} />
}

function SheetTrigger({ ...props }: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="sheet-trigger" {...props} />
}

function SheetPortal({ ...props }: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="sheet-portal" {...props} />
}

function SheetClose({ ...props }: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="sheet-close" {...props} />
}

function SheetOverlay({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return <DialogPrimitive.Overlay data-slot="sheet-overlay" className={cn('fixed inset-0 z-50 bg-black/55 backdrop-blur-[2px]', className)} {...props} />
}

type SheetContentProps = React.ComponentProps<typeof DialogPrimitive.Content> & {
  side?: 'top' | 'right' | 'bottom' | 'left'
}

function SheetContent({ className, children, side = 'right', ...props }: SheetContentProps) {
  const sideClassName =
    side === 'top'
      ? 'inset-x-0 top-0 border-b'
      : side === 'bottom'
        ? 'inset-x-0 bottom-0 border-t'
        : side === 'left'
          ? 'inset-y-0 left-0 h-full w-full max-w-sm border-r'
          : 'inset-y-0 right-0 h-full w-full max-w-sm border-l'

  return (
    <SheetPortal>
      <SheetOverlay />
      <DialogPrimitive.Content
        data-slot="sheet-content"
        className={cn('fixed z-50 bg-[#050811] p-6 text-white shadow-2xl', 'border-white/10 backdrop-blur-xl', sideClassName, className)}
        {...props}
      >
        {children}
      </DialogPrimitive.Content>
    </SheetPortal>
  )
}

function SheetHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="sheet-header" className={cn('flex flex-col gap-1.5', className)} {...props} />
}

function SheetTitle({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return <DialogPrimitive.Title data-slot="sheet-title" className={cn('font-serif text-lg font-semibold', className)} {...props} />
}

function SheetDescription({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return <DialogPrimitive.Description data-slot="sheet-description" className={cn('text-sm text-white/65', className)} {...props} />
}

export { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetOverlay, SheetPortal, SheetTitle, SheetTrigger }
