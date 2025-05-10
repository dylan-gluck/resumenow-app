import { Paragraph, HeadingLevel, BorderStyle } from 'docx';

/**
 * Creates summary section
 */
export function createSummary(summary?: string | null) {
	if (!summary) return [];

	return [
		new Paragraph({
			text: 'SUMMARY',
			heading: HeadingLevel.HEADING_2,
			spacing: { after: 120 }
		}),
		new Paragraph({
			text: summary,
			spacing: { after: 200 }
		}),
		// Add separator after summary
		new Paragraph({
			text: '',
			border: {
				bottom: {
					color: '999999',
					style: BorderStyle.SINGLE,
					size: 6
				}
			},
			spacing: { after: 200 }
		})
	];
}
