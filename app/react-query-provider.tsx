"use client";
import React from "react";

// query
import { HydrationBoundary, QueryClient, QueryClientProvider, dehydrate } from "@tanstack/react-query";

//query provider options
const queryOptions: any = {
	queries: {
		cacheTime: 1000 * 60 * 60 * 24 // 24 hours
	}
};
const queryClient = new QueryClient({ defaultOptions: queryOptions });
const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {
	return (
		<QueryClientProvider client={queryClient}>
			<HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>
		</QueryClientProvider>
	);
};

export default ReactQueryProvider;
