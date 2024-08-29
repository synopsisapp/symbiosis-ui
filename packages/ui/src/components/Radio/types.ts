import type { RadioGroupProps } from "@radix-ui/react-radio-group";

import type { Sizes } from "../../designSystemTokens";

export type RadioRootProps = {
	name: string;
	id?: string;
	required?: boolean;
	children: React.ReactNode;
	onChange?: (value: string) => void;
	defaultValue?: string;
	className?: string;
	orientation?: RadioGroupProps["orientation"];
};

export type RadioDotProps = {
	value: string;
	size?: Sizes;
	required?: boolean;
	className?: string;
	disabled?: boolean;
};

export type RadioItemProps = RadioDotProps & {
	label?: string;
};

export type RadioProps = {
	Root: RadioRootProps;
	Item: RadioItemProps;
};


