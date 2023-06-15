'use client';

import classNames from 'classnames';
import { useCallback, useState } from 'react';
import { CodeEditor } from '@/app/modules/CodeEditorPreview/CodeEditor/CodeEditor.component';
import { CodePreview } from '@/app/modules/CodeEditorPreview/CodePreview/CodePreview.component';
import { useCodeExport } from './modules/CodeEditorPreview/CodePreview/CodePreview.hooks';

export default function CodeEditorPreview() {
	const [script, setScript] = useState('');
	const { exportZipAndDownload } = useCodeExport();

	const handleCodeChange = useCallback(
		(value?: string) => setScript(value ?? ''),
		[]
	);

	const handlePublishClick = useCallback(
		() => exportZipAndDownload(script),
		[script, exportZipAndDownload]
	);

	return (
		<main className="flex h-screen items-center justify-between">
			<div className="h-full w-1/2">
				<CodeEditor value={script} onChange={handleCodeChange} />
			</div>
			<div className="h-full w-1/2 flex flex-col">
				<div className="basis-2/3 p-4">
					<div className="relative bg-white rounded shadow-sm h-full">
						<CodePreview value={script} debounceRender={3000} />
					</div>
				</div>
				<div className="basis-1/3 p-4 flex items-end justify-end">
					<button
						className={classNames(
							'px-16 py-4 uppercase text-xs',
							script
								? 'bg-purple-600 hover:opacity-50  text-white'
								: 'bg-gray-300 text-gray-500'
						)}
						onClick={handlePublishClick}
						disabled={!script}
					>
						Publish
					</button>
				</div>
			</div>
		</main>
	);
}
