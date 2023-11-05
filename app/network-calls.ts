"use server";
const BASE_URL = process.env.NEXT_BASE_URL;
const API_KEY = process.env.NEXT_API_KEY as string;

export async function POST(apiUrl: any, payload: any) {
	var myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/JSON");
	myHeaders.append("Accept", "application/json");
	myHeaders.append("Access-Control-Request-Headers", "*");
	myHeaders.append("api-key", API_KEY);
	const requestOptions: any = {
		method: "POST",
		headers: myHeaders,
		body: JSON.stringify(payload),
		cache: "no-store",
		maxBodyLength: Infinity
	};

	try {
		console.log("fetching");
		const res = await fetch(`${BASE_URL}${apiUrl}`, requestOptions);
		if (res.ok) {
			const data = await res?.json();
			return data?.documents;
		}
		throw { status: res?.status, message: res?.statusText };
	} catch (error: any) {
		console.log({ error });
		throw error;
	}
}
export const getAllLeads = async (): Promise<any> => {
	const payload = {
		dataSource: "HRMcluster",
		database: "fair_future_crm_prod",
		collection: "leads"
	};
	const URL = "/action/aggregate";
	return POST(URL, payload);
};
export const getAllUsers = async (): Promise<any> => {
	const payload = {
		dataSource: "HRMcluster",
		database: "fair_future_crm_prod",
		collection: "users"
	};
	const URL = "/action/aggregate";
	return POST(URL, payload);
};
