import { debounce } from 'lodash';
import { useState, useCallback, useEffect, useMemo } from 'react';
import { getPreviewHtml } from '@/app/modules/CodeEditorPreview/CodePreview/CodePreview.utils';

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
