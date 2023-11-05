"use server";
const BASE_URL_MONGO = process.env.NEXT_BASE_URL_MONGO;
const BASE_URL_SERVER = process.env.NEXT_BASE_URL_SERVER;
const API_KEY_MONGO = process.env.NEXT_API_KEY_MONGO as string;
const API_KEY_SERVER = process.env.NEXT_API_KEY_SERVER as string;

export async function GET(apiUrl: any, cacheData: any = { cache: "force-cache" }) {
	var myHeaders = new Headers();

	myHeaders.append("api-key", API_KEY_SERVER);

	const requestOptions: any = {
		method: "GET",
		headers: myHeaders,
		maxBodyLength: Infinity,
		timeout: Infinity,
		...cacheData
	};

	try {
		const res = await fetch(`${BASE_URL_SERVER}${apiUrl}`, requestOptions);
		if (res.ok) {
			const data = await res?.json();
			return data;
		}
		throw { status: res?.status, message: res?.statusText };
	} catch (error: any) {
		console.log(error);
	}
}
export async function POST(apiUrl: any, payload: any) {
	var myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/JSON");
	myHeaders.append("Accept", "application/json");
	myHeaders.append("Access-Control-Request-Headers", "*");
	myHeaders.append("api-key", API_KEY_MONGO);
	const requestOptions: any = {
		method: "POST",
		headers: myHeaders,
		body: JSON.stringify(payload),
		cache: "no-store",
		maxBodyLength: Infinity,
		timeout: Infinity
	};

	try {
		console.log("fetching");
		const res = await fetch(`${BASE_URL_MONGO}${apiUrl}`, requestOptions);
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

export async function getLeadList() {
	let url = `/leads?limit=3000&skip=0`;

	const cacheConfig = { cache: "no-store" };
	try {
		const leadList = await GET(url, cacheConfig);
		return leadList?.data;
	} catch (error) {}
}

export const getAllUsers = async (): Promise<any> => {
	const payload = {
		dataSource: "HRMcluster",
		database: "fair_future_crm_prod",
		collection: "users"
	};
	const URL = "/action/aggregate";
	return POST(URL, payload);
};
