import { cn } from "../../utils/cn";

export const sharedDropdownContentStyles = cn(
  "min-w-[150px] p-2 bg-white rounded-lg max-h-[50vh] shadow-lg border border-gray-100 relative overflow-y-auto z-20",
  "origin-(--radix-dropdown-menu-content-transform-origin)",
  "animate-slide-up-and-fade",
);

export const sharedDropdownTriggerStyles = cn(
  "outline-hidden [data-disabled:opacity-50 data-disabled:cursor-not-allowed",
);

export const sharedDropdownItemStyles = cn(
  "flex items-center bg-white -mx-1! my-0 p-1 outline-hidden rounded-md cursor-pointer transition-colors",
  "hover:bg-slate-100 focus:bg-slate-100 data-disabled:opacity-50 data-disabled:cursor-not-allowed",
);

export const sharedDropdownGroupStyles = cn(
  "flex flex-col p-0 m-0 outline-hidden rounded-lg cursor-pointer  border-1 border-transparent",
  "transition-colors duration-150 ease-in-out",
);
