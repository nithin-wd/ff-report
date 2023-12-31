"use client";
import { useEffect, useMemo, useState } from "react";
import { getAllLeads, getAllUsers, getLeadList } from "./network-calls";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

const Main = () => {
	const [updatedAt, setUpdatedAt] = useState(dayjs().format("DD-MM-YYYY:hh-mm"));
	//fetch leads for download
	const {
		isLoading,
		data: leads,
		isFetching,
		refetch
	} = useQuery({
		queryKey: ["lead-list"],
		queryFn: () => getLeadList(),

		staleTime: 1000 * 60, // 1min
		retry: false,
		refetchInterval: 1000 * 60 //1min
	});
	//fetch users
	const { data: usersRes } = useQuery({
		queryKey: ["executive-list"],
		queryFn: () => getAllUsers(),

		staleTime: 1000 * 60, // 1min
		retry: false
	});

	useEffect(() => {
		if (!isFetching) setUpdatedAt(dayjs().format("DD-MM-YYYY:hh-mm-ss"));
	}, [isFetching]);

	const kitCollectedID = "654417820bc14a7147a694da";
	const expoAttendedID = "654417ba0bc14a7147a6951a";
	const seminarAttendedID = "6544179f0bc14a7147a694fa";

	const roleExecutiveID = "645b78ff7fe6b4653611687b";

	const sessionCompletedID = "654417dd0bc14a7147a6953a";

	const totalCount: any = useMemo(() => leads?.length || 0, [leads]);
	const kitCollected: any = useMemo(() => {
		console.log({ leads });
		const kit = leads?.filter((lead: any) => lead?.customDataTypes?.find((cDt: any) => cDt?.cdt?._id === kitCollectedID));
		console.log({ kit });
		return kit?.length || 0;
	}, [leads]);
	const expoAttended: any = useMemo(() => {
		const expo = leads?.filter((lead: any) => lead?.customDataTypes?.find((cDt: any) => cDt?.cdt?._id === expoAttendedID));
		console.log({ expo });
		return expo?.length || 0;
	}, [leads]);
	const seminarAttended: any = useMemo(() => {
		const seminar = leads?.filter((lead: any) => lead?.customDataTypes?.find((cDt: any) => cDt?.cdt?._id === seminarAttendedID));
		console.log({ seminar });
		return seminar?.length || 0;
	}, [leads]);
	const executives: any = useMemo(() => {
		const users = usersRes?.filter((user: any) => user?.role === roleExecutiveID);
		return users;
	}, [usersRes]);
	// 	const groupedArray = useMemo(() => {
	// 		const groupedLeada
	// leads?.forEach((lead:any)=>)

	// 	}, [leads]);
	// 	console.log({ groupedArray });
	// if (isLoading) return <div>Loading</div>;
	return (
		<main className="fixed top-0 bottom-0 left-0 right-0 overflow-y-auto p-[40px]">
			<div className="flex justify-between mb-[30px]">
				<div className="text-[22px]">Dashboard</div>
				<div className="flex">
					<div>{updatedAt}</div>
					<div>{isFetching ? "(Fetching)" : ""}</div>
				</div>
			</div>
			<div className="space-y-[20px]">
				<div className="grid grid-cols-4 gap-[20px]">
					<div className=" border-blue-800 border-[1px] p-3 rounded-[8px]">
						<div>Total Leads</div>
						<div>{totalCount}</div>
					</div>
					<div className=" border-blue-800 border-[1px] p-3 rounded-[8px]">
						<div>Kits Collected</div>
						<div>{kitCollected}</div>
					</div>
					<div className=" border-blue-800 border-[1px] p-3 rounded-[8px]">
						<div>Expo Attended</div>
						<div>{expoAttended}</div>
					</div>
					<div className=" border-blue-800 border-[1px] p-3 rounded-[8px]">
						<div>Seminar Attended</div>
						<div>{seminarAttended}</div>
					</div>
				</div>
				{/* <div>{JSON.stringify(executives)}</div> */}

				<div className="grid grid-cols-2 gap-[20px]">
					{executives?.map((exe: any) => (
						<div key={exe?._id} className=" border-blue-800 border-[1px] p-3 rounded-[8px]">
							<div className="flex">
								<div>{exe?.fullName}</div>
							</div>
							<div className="flex items-center gap-x-[5px]">
								<div>Assigned</div>
								<div>
									{JSON.stringify(
										leads?.filter(
											(lead: any) =>
												(lead?.assignTo === exe?._id && lead?.customDataTypes?.find((cDt: any) => cDt?.cdt?._id === expoAttendedID)?.value) === true
										)?.length
									)}
								</div>
							</div>
							<div className="flex items-center gap-x-[5px]">
								<div>Completed</div>
								<div>
									{JSON.stringify(
										leads?.filter(
											(lead: any) =>
												lead?.assignTo === exe?._id && lead?.customDataTypes?.find((cDt: any) => cDt?.cdt?._id === sessionCompletedID)?.value === true
										)?.length
									)}
								</div>
							</div>
							<div className="flex items-center gap-x-[5px]">
								<div>Queue</div>
								<div>
									{JSON.stringify(
										leads?.filter(
											(lead: any) =>
												lead?.assignTo === exe?._id &&
												lead?.customDataTypes?.find((cDt: any) => cDt?.cdt?._id === expoAttendedID)?.value === true &&
												lead?.customDataTypes?.find((cDt: any) => cDt?.cdt?._id === sessionCompletedID)?.value !== true
										)?.length
									)}
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</main>
	);
};

export default Main;

