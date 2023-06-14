'use client';
import { FC, useCallback, useEffect, useRef } from 'react';

import MonacoEditor, { Monaco, useMonaco } from '@monaco-editor/react';

type Props = {
	value: string;
	onChange: (value?: string) => void;
};

export const CodeEditor: FC<Props> = ({ value, onChange }) => {
	const handleEditorChange = useCallback(
		(value?: string) => onChange(value),
		[onChange]
	);

	return (
		<MonacoEditor
			height="100vh"
			defaultLanguage="javascript"
			theme="vs-dark"
			value={value}
			onChange={handleEditorChange}
		/>
	);
};
