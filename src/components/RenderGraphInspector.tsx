'use client'

import React, { useState } from 'react';
import { OptimizerFileInfo, RenderGraphResult } from '@/types';
import FileList from '@/components/FileList';
import ResourceViewer from '@/components/ResourceViewer';

interface RenderGraphInspectorProps {
    fileData: OptimizerFileInfo[];
    loadFileAction: (p0: string) => Promise<string>;
}

type RenderGraphInspectorState = {
    data: RenderGraphResult | null;
    dateStr: string;
}

const initialState: RenderGraphInspectorState = {
    data: null,
    dateStr: '',
};

const RenderGraphInspector : React.FC<RenderGraphInspectorProps> = ({ fileData, loadFileAction }) => {
    const [s, setInspectorState] = useState<RenderGraphInspectorState>(initialState);

    const setActiveFileOnClick = async (file: OptimizerFileInfo) => {
        const json = await loadFileAction(file.file);
        const parsedJson: RenderGraphResult = JSON.parse(json);
        if (parsedJson) {
            setInspectorState({
                data: parsedJson,
                dateStr: `${file.date.toLocaleDateString()} - ${file.date.toLocaleTimeString()}`,
            });
        }
    };

    return (
        <div className='flex gap-8'>
            <FileList files={fileData} onItemClick={setActiveFileOnClick} />
            <div className='w-full flex flex-col gap-4'>
                <header className='h-fit w-full p-4 border rounded-xl border-zinc-900 hover:border-zinc-800 transition-colors ease-in-out'>
                    <h2 className='text-lg text-zinc-300'>
                        { s.data
                            ? (<><span className='font-medium'>Viewing compiler result</span> : <span className='italic text-blue-300'>{s.dateStr}</span></>)
                            : (<span className='text-blue-300'>Select a result!</span>)
                        }
                    </h2>
                </header>
                <ResourceViewer data={s.data} />
            </div>
        </div>
    );
}

export default RenderGraphInspector;