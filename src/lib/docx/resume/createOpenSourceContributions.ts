import { Paragraph, TextRun, HeadingLevel, BorderStyle } from 'docx';
import type { OpenSourceContribution } from '@/types/resume';

/**
 * Creates open source contributions section
 */
export function createOpenSourceContributions(contributions: OpenSourceContribution[]) {
	if (!contributions.length) return [];

	const elements = [
		new Paragraph({
			text: 'OPEN SOURCE CONTRIBUTIONS',
			heading: HeadingLevel.HEADING_2,
			spacing: { after: 120 }
		})
	];

	contributions.forEach((contrib) => {
		elements.push(
			new Paragraph({
				children: [
					new TextRun({
						text: contrib.project_name,
						bold: true
					})
				],
				spacing: { after: 80 }
			})
		);

		// Contribution Type
		if (contrib.contribution_type) {
			elements.push(
				new Paragraph({
					text: `Type: ${contrib.contribution_type}`,
					spacing: { after: 80 }
				})
			);
		}

		// Description
		if (contrib.description) {
			elements.push(
				new Paragraph({
					text: contrib.description,
					spacing: { after: 80 }
				})
			);
		}

		// URL
		if (contrib.url) {
			elements.push(
				new Paragraph({
					text: `URL: ${contrib.url}`,
					spacing: { after: 120 }
				})
			);
		}
	});

	// Add separator after open source contributions
	elements.push(
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
	);

	return elements;
}
