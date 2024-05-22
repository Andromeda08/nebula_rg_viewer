import { promises as fs } from 'fs';
import { OptimizerFileInfo } from '@/types';
import RenderGraphInspector from '@/components/RenderGraphInspector';

const fetchRenderGraphResults = async (): Promise<OptimizerFileInfo[]> => {
  const files = await fs.readdir(process.cwd() + '/src/data');
  return files.map((file: string) => {
    // resource_optimizer_YYYY-MM-DD_HH-MM.json format
    const tokens = file.split('_');
    const [year, month, day] = tokens[2].split('-').map(s => parseInt(s));
    const [hour, minute] = tokens[3].split('.')[0].split('-').map(s => parseInt(s));
    return {
      date: new Date(year, month, day, hour, minute),
      file: file
    }
  }).sort((a, b) => a.date.getTime() - b.date.getTime());
}

export default async function Home() {
  const files = await fetchRenderGraphResults();

  const loadFileUtf8 = async (name: string) => {
    'use server'
    return await fs.readFile(process.cwd() + `/src/data/${name}`, 'utf-8');
  };

  return (
    <main className='bg-zinc-950 flex min-h-screen flex-col p-24'>
      <RenderGraphInspector fileData={files} loadFileAction={loadFileUtf8} />
    </main>
  );
}
