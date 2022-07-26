import React from "react";

export const changeHandlerCreator = <T extends { target: { value: string } }>(
	stateSetter: React.Dispatch<React.SetStateAction<string>>,
	setValidity?: React.Dispatch<React.SetStateAction<boolean>>,
	limiter?: (value: string) => boolean
) => {
	return (e: T) => {
		if (limiter && limiter(e.target.value)) return;
		stateSetter(e.target.value);
		if (setValidity) setValidity(true);
	};
};
