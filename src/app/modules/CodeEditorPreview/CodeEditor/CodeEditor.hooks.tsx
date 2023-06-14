import JSZip from 'jszip';
import { saveAs } from 'file-saver';

import { useCallback } from 'react';

export function useCodePublish() {
	const exportZipAndDownload = useCallback(async (indexHtml: string) => {
		var zip = new JSZip();
		zip.file('index.html', indexHtml);
		const content = await zip.generateAsync({ type: 'blob' });
		saveAs(content, 'fxhash-publish.zip');
	}, []);

	return {
		exportZipAndDownload,
	};
}
