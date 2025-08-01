import axios, { AxiosRequestConfig } from "axios";

export async function handleApiRequest<T>(
	config: AxiosRequestConfig
): Promise<T> {
	try {
		const response = await axios(config);
		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			if (error.response) {
				console.error("Response Error:", error.response.data);
				throw new Error(
					error.response.data.error?.message ||
						"An error occurred while processing the request."
				);
			} else if (error.request) {
				console.error("Request Error: No response received.");
				throw new Error(
					"No response from the server. Please check your network connection."
				);
			}
		}
		console.error("Unexpected Error:", error);
		throw new Error("An unexpected error occurred.");
	}
}
