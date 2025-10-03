import React from 'react';

export function formatAnalysis(text) {
	const lines = text.split('\n');
	const elements = [];

	let listItems = [];

	const flushList = () => {
		if (listItems.length > 0) {
			elements.push(
				<ul style={{ paddingLeft: 20, marginTop: 4, marginBottom: 4 }}>
					{listItems.map((item, idx) => (
						<li key={idx}>{item}</li>
					))}
				</ul>
			);
			listItems = [];
		}
	};

	lines.forEach((line, idx) => {
		if (line.startsWith('* ')) {
			listItems.push(line.slice(2));
		} else {
			flushList();

			const boldRegex = /\*\*(.*?)\*\*/g;
			const parts = [];
			let lastIndex = 0;
			let match;

			while ((match = boldRegex.exec(line)) !== null) {
				if (match.index > lastIndex) {
					parts.push(line.slice(lastIndex, match.index));
				}
				parts.push(<strong key={match.index}>{match[1]}</strong>);
				lastIndex = boldRegex.lastIndex;
			}
			if (lastIndex < line.length) {
				parts.push(line.slice(lastIndex));
			}

			elements.push(
				<p key={idx} style={{ margin: '4px 0' }}>
					{parts}
				</p>
			);
		}
	});

	flushList();
	return elements;
}
