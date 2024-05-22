'use client'

import React from 'react';
import {RenderGraphResult, Resource, Node, UsagePoint, ResourceType, ResourceUsage} from '@/types';

interface ResourceGraphProps {
    resources: Resource[],
    nodes:     Node[]
}

const ResourceGraph: React.FC<ResourceGraphProps> = ({ resources, nodes }) => {
    const usagePoints = new Array<Array<UsagePoint | null>>;
    resources.forEach((res: Resource) => {
        const arr = new Array<UsagePoint | null>;
        for (let i = 0; i < nodes.length; i++) {
            let find: UsagePoint | null = null;
            res.usage_points.forEach((val: UsagePoint) => {
                if (val.location === i) {
                    find = val;
                }
            })
            find ? arr.push(find) : arr.push(null);
        }
        usagePoints.push(arr);
    });

    const resourceTypeToColor = (type: ResourceType) => {
        if      (type === 'Image')      return 'color_image';
        else if (type === 'SceneData')  return 'color_scene_data';
        else                            return '';
    }

    const resourceUsageToColor = (usage: ResourceUsage) => {
        if      (usage === 'Input') return 'use_read';
        else if (usage === 'Write') return 'use_write';
        else                        return '';
    }

    return (
        <div className={`h-fit w-full grid gap-2.5 p-2.5 border rounded-xl border-zinc-900 hover:border-zinc-800 transition-colors ease-in-out`}
             style={{gridTemplateColumns: `repeat(${nodes.length + 1}, minmax(0, 1fr))`}}>
            <div className='p-2 flex items-center text-sm text-zinc-500'>Resource Timeline</div>
            { nodes.map((node: Node, i: number) => (
                <div className='p-2 hover_border rounded-lg truncate' key={i}>{node.name}</div>
            ))}
            {resources.map((res: Resource, i: number) => (<>
                <div className={`w-fit p-2 hover_border rounded-lg`} key={i}>Resource #{res.id}</div>
                { usagePoints[i].map((val: UsagePoint | null, i: number) => (
                    val ? <div className={`p-2 flex items-center text-sm text-zinc-200 truncate ${resourceUsageToColor(val.usage)}`}>{val.used_as}</div>
                        : <div className='block w-1'></div>
                ))}
            </>))}
        </div>
    );
}

interface ResourceViewerProps {
    data: RenderGraphResult | null
}

const ResourceViewer: React.FC<ResourceViewerProps> = ({data}) => {
    if (!data) {
        return (
            <div className='h-fit w-full flex justify-center p-2.5 border rounded-lg border-zinc-900 hover:border-zinc-800 transition-colors ease-in-out'>
                <p className='text-zinc-500'>No data</p>
            </div>
        )
    }

    return (
        <div className='h-fit w-full flex flex-col gap-2.5 p-2.5 border rounded-xl border-zinc-900 hover:border-zinc-800 transition-colors ease-in-out'>
            <div className='hit-fit, w-full flex flex-col gap-1 p-2.5'>
                <p className='text-zinc-300'>
                    Optimization resulted in a reduction of <span className='text-blue-300 font-medium'>{data.statistics.reduction} resources</span> from <span className='text-indigo-400'>{data.statistics.resource_count}</span> initial resources, of which <span className='text-indigo-400'>{data.statistics.non_optimizable}</span> were non-optimizable.
                </p>
                <p className='text-zinc-300'>
                    Optimization Time: <span className='text-blue-300'>{data.statistics.time_us} &mu;s</span>
                </p>
            </div>
            <ResourceGraph nodes={data.nodes} resources={data.optimized_resources} />
        </div>
    )
}

export default ResourceViewer;