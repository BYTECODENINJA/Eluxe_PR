"use client"
import {trpc} from "@/lib/trpc";
import {Skeleton} from "@/components/ui/skeleton";
import {Badge} from "@/components/ui/badge";

export function HealthCheck() {
    const { data, isLoading, error} = trpc.health.useQuery();

    if(isLoading) {
        return <Skeleton className="h-6 w-24" />
    }

    if(error || !data) {
        return <Badge variant="secondary">API: Error</Badge>
    }

    return <Badge variant="secondary">
        API: {data.status} {data.timestamp}
    </Badge>
}
