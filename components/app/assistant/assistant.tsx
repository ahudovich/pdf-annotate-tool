import { cn } from '@/lib/utils'

export function Assistant({ className }: { className?: string }) {
  return <div className={cn('bg-background w-64', className)}>AIAssistant</div>
}
