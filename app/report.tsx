"use client";
import { getAllLeads } from "./network-calls";
import { useQuery } from "@tanstack/react-query";

const Report = () => {
	//fetch leads for download
	const { isLoading, data } = useQuery({
		queryKey: ["lead-list"],
		queryFn: () => getAllLeads(),
		enabled: false,
		staleTime: 1000 * 1, // 1min
		retry: false
	});
	console.log({ data });
	if (isLoading) return <div>Loading</div>;
	return <main className="fixed top-0 bottom-0 left-0 right-0 bg-red-300">Hello{isLoading ? "Loading" : JSON.stringify(data)}</main>;
};

export default Report;
