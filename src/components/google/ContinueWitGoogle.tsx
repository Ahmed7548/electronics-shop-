import React from 'react'
import GoogleButton from './GoogleButton'
import { authApi } from "../../API/api";
import { AxiosResponse, AxiosError } from "axios";
import { SignInResponse } from "../../utils/types";

interface PropType {
  setError: React.Dispatch<React.SetStateAction<string>>;
  text:"signin_with" | "signup_with" | "continue_with" | undefined
}

const ContinueWitGoogle = ({setError,text}:PropType) => {

  const handleGoogleSuccess = async (credentials: string | undefined) => {
		try {
			if (typeof credentials === "undefined")
				throw new Error("failed to sign in with google");
			const { data } = await authApi.post<
				SignInResponse,
				AxiosResponse<SignInResponse, { credentials: string }>
			>("/google", {
				credentials: credentials,
			});
			console.log(data);
		} catch (err) {
			let errorMessage = `unknown error`;
			if (err instanceof AxiosError) {
				console.log(err);
				if (err?.response?.data?.message) {
					errorMessage = err?.response?.data.message;
				}
			}
			setError(errorMessage);
		}
	};
  return (
    <div>
      		<GoogleButton
								client_id={process.env.REACT_APP_GOOGLE_CLIENT_ID as string}
								theme="outline"
								type="standard"
        size="medium"
        text={text}
								onSuccsess={handleGoogleSuccess}
							/>
    </div>
  )
}

export default ContinueWitGoogle