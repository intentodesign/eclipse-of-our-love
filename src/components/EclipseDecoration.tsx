import { cn } from "@/lib/utils";

interface EclipseDecorationProps {
  className?: string;
}

export const EclipseDecoration = ({ className }: EclipseDecorationProps) => {
  return (
    <div className={cn("absolute pointer-events-none", className)}>
      {/* Overlapping circles for eclipse effect */}
      <div className="relative w-32 h-32 md:w-48 md:h-48">
        <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl animate-float" />
        <div className="absolute inset-0 rounded-full bg-accent/30 blur-xl animate-float" 
             style={{ animationDelay: '1s' }} />
        <div className="absolute inset-2 rounded-full bg-secondary/20 blur-lg shimmer" />
      </div>
      
      {/* Scattered stars */}
      <div className="absolute -top-8 -left-8 w-2 h-2 rounded-full bg-secondary animate-pulse" />
      <div className="absolute -bottom-4 -right-4 w-1.5 h-1.5 rounded-full bg-accent animate-pulse" 
           style={{ animationDelay: '0.5s' }} />
      <div className="absolute top-1/2 -left-12 w-1 h-1 rounded-full bg-primary animate-pulse" 
           style={{ animationDelay: '1.5s' }} />
    </div>
  );
};
