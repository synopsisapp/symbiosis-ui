import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { Icon } from "../Icon";
import { text } from "../Text/styles";
import { cn } from "../../utils/cn";

const BreadcrumbRoot = React.forwardRef<HTMLElement, React.ComponentPropsWithoutRef<"nav">>(({ ...props }, ref) => (
  <nav ref={ref} aria-label="breadcrumb" {...props} />
));
BreadcrumbRoot.displayName = "Breadcrumb.Root";

const BreadcrumbList = React.forwardRef<HTMLOListElement, React.ComponentPropsWithoutRef<"ol">>(
  ({ className, ...props }, ref) => (
    <ol
      ref={ref}
      className={cn(
        "flex flex-wrap items-center gap-1.5 break-words text-gray-400 sm:gap-2.5",
        text({ variant: "body-small-100" }),
        className,
      )}
      {...props}
    />
  ),
);

BreadcrumbList.displayName = "Breadcrumb.List";

const BreadcrumbItem = React.forwardRef<HTMLLIElement, React.ComponentPropsWithoutRef<"li">>(
  ({ className, ...props }, ref) => (
    <li ref={ref} className={cn("inline-flex items-center gap-1.5", className)} {...props} />
  ),
);
BreadcrumbItem.displayName = "Breadcrumb.Item";

const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<"a"> & {
    asChild?: boolean;
  }
>(({ asChild, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a";

  return <Comp ref={ref} className={cn("transition-colors hover:text-mainColors-base", className)} {...props} />;
});
BreadcrumbLink.displayName = "Breadcrumb.Link";

const BreadcrumbPage = React.forwardRef<HTMLSpanElement, React.ComponentPropsWithoutRef<"span">>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn("text-black", text({ weight: "base" }), className)}
      {...props}
    />
  ),
);
BreadcrumbPage.displayName = "Breadcrumb.Page";

const BreadcrumbSeparator = ({ children, className, ...props }: React.ComponentProps<"li">) => (
  <li role="presentation" aria-hidden="true" className={cn("[&>svg]:size-3.5", className)} {...props}>
    {children ?? <Icon name="symbiosis-chevron-right" />}
  </li>
);
BreadcrumbSeparator.displayName = "Breadcrumb.Separator";

export const Breadcrumb = {
  Root: BreadcrumbRoot,
  List: BreadcrumbList,
  Item: BreadcrumbItem,
  Link: BreadcrumbLink,
  Page: BreadcrumbPage,
  Separator: BreadcrumbSeparator,
};
