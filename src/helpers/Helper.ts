const ResponseData = (status: number, message: string | null, error: any | null, data: any | null) => {
	if (error != null && error instanceof Error) {
		const response = {
			status: status,
			message: error.message,
			errors: error,
			data: null
		}

		return response;
	}

	const res = {
		status,
		message,
		errors: error,
		data: data
	};

	return res;
}

export default { ResponseData };