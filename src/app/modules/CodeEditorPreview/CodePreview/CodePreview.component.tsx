'use client';

import { FC } from 'react';
import { useCodePreview } from './CodePreview.hooks';

type Props = {
	value: string;
	debounceRender: number;
};

export const CodePreview: FC<Props> = ({ value, debounceRender }) => {
	const { loading, previewHtml } = useCodePreview(value, debounceRender);

	return (
		<>
			{loading && (
				<div className="absolute top-3 right-3 inline-flex items-center px-2 py-1 font-semibold leading-6 text-sm shadow rounded-md text-white bg-indigo-500">
					Rendering...
				</div>
			)}
			{previewHtml && <iframe srcDoc={previewHtml} className="w-full h-full" />}
		</>
	);
};
