import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { debounce } from 'lodash';
import { useState, useEffect, useMemo, useCallback } from 'react';

const getPreviewHtml = (script: string) => `
    <html>
      <head>
        <script>
          ${script}
        </script>
      </head>
      <body>
        <canvas/>
      </body>
    </html>`;

export function useCodePreview(script: string, debounceRender: number) {
	const [previewHtml, setPreviewHtml] = useState<string | undefined>();
	const [loading, setLoading] = useState(false);

	const debouncedRenderHtml = useMemo(
		() =>
			debounce((code?: string) => {
				if (!code) {
					setPreviewHtml(undefined);
					return;
				}
				if (!loading) setLoading(true);
				setPreviewHtml(getPreviewHtml(code));
				setTimeout(() => setLoading(false), 1000);
			}, debounceRender),
		[debounceRender, loading]
	);

	useEffect(() => {
		debouncedRenderHtml(script);
	}, [script]);

	return {
		previewHtml,
		loading,
	};
}

export function useCodeExport() {
	const exportZipAndDownload = useCallback(async (script: string) => {
		var zip = new JSZip();
		zip.file('index.html', getPreviewHtml(script));
		const content = await zip.generateAsync({ type: 'blob' });
		saveAs(content, 'fxhash-publish.zip');
	}, []);

	return {
		exportZipAndDownload,
	};
}
