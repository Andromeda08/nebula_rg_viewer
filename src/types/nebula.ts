export type ResourceType  = 'SceneData' | 'Image';
export type ResourceUsage = 'Input' | 'Write';

export type UsagePoint = {
    location: number;
    usage:    ResourceUsage;
    used_as:  string;
    used_by:  string;
}

export type Resource = {
    id:           number;
    type:         ResourceType;
    usage_points: UsagePoint[];
}

export type Node = {
    name: string;
}

export type OptimizerStatistics = {
    node_count:      number;
    non_optimizable: number;
    optimized_count: number;
    reduction:       number;
    resource_count:  number;
    time_us:         number;
}

export type RenderGraphResult = {
    nodes:               Node[];
    optimized_resources: Resource[];
    statistics:          OptimizerStatistics;
    logs:                string[];
}