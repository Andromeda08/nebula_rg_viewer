'use client'

import React from 'react';
import { OptimizerFileInfo } from '@/types';

interface FileListProps {
    files: OptimizerFileInfo[],
    onItemClick: any
}

const FileList: React.FC<FileListProps> = ({ files, onItemClick }) => (
    <nav className='min-w-fit h-fit max-w-xs flex flex-col gap-3 p-4 border rounded-xl border-zinc-900 hover:border-zinc-800 transition-colors ease-in-out'>
        <h3 className='text-lg font-medium text-zinc-100'>
            RenderGraph Compiler Results
        </h3>
        <ul className='flex flex-col gap-2'>
            { (files.length > 0)
                ? (files.map((file: OptimizerFileInfo, i: number) =>
                        <li key={i}
                            onClick={() => onItemClick(file)}
                            className='px-2 py-1.5 border rounded-lg border-zinc-900 text-zinc-300 hover:text-blue-50 hover:border-blue-500 transition-colors ease-in-out cursor-pointer'>
                            {file.date.toLocaleDateString()} - {file.date.toLocaleTimeString()}
                        </li>
                    )
                ) : (
                    <p>no files were found</p>
                )
            }
        </ul>
    </nav>
);

export default FileList;