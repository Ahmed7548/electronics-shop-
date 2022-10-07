import React, { useCallback, useEffect, useMemo, useRef } from "react";
import useGoogleScript from "../../hooks/useGoogleScript";

interface PropType extends GsiButtonConfiguration {
	client_id: string;
	onSuccsess: (credential:string|undefined) => Promise<void>;
}

const GoogleButton = (props: PropType) => {
  const { client_id,onSuccsess } = props; 

	const buttonOptions = useMemo(
		() => ({ ...props, client_id: null, onSuccess: null }),
		[props]
	);

	const isGoogleScriptLoaded = useGoogleScript();
  const divRef = useRef<HTMLDivElement>(null);

	const successHandle = useCallback(onSuccsess, [onSuccsess]);

	useEffect(() => {
		if (typeof window === "undefined" || !window.google || !divRef.current)
			return;

		try {
			window.google.accounts.id.initialize({
				client_id: client_id,
				callback: async (res) => {
					// RESPONSE RETURNED FROM GOOGLE AUTH API;
					console.log(res)
					await successHandle(res.credential);
				},
			});
			window.google.accounts.id.renderButton(divRef.current, buttonOptions);
		} catch (err) {
			console.log(err);
		}
	}, [isGoogleScriptLoaded, buttonOptions, client_id, successHandle]);

	return <div ref={divRef} />;
};

export default GoogleButton;
