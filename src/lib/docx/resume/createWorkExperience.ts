import { Paragraph, TextRun, HeadingLevel, BorderStyle } from 'docx';
import type { WorkExperience } from '@/types/resume';

/**
 * Creates work experience section
 */
export function createWorkExperience(experiences: WorkExperience[]) {
	if (!experiences.length) return [];

	const elements = [
		new Paragraph({
			text: 'WORK EXPERIENCE',
			heading: HeadingLevel.HEADING_2,
			spacing: { after: 120 }
		})
	];

	experiences.forEach((exp, index) => {
		// Company and Position
		elements.push(
			new Paragraph({
				children: [
					new TextRun({
						text: exp.company,
						bold: true,
						size: 22 // 11pt (reduced from 12pt)
					}),
					new TextRun({
						text: ` - ${exp.position}`,
						bold: true,
						size: 22 // 11pt (reduced from 12pt)
					})
				],
				spacing: { after: 60 }
			})
		);

		// Dates
		const startDate = exp.start_date
			? new Date(exp.start_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
			: '';
		let endDate = exp.is_current ? 'Present' : '';
		if (!exp.is_current && exp.end_date) {
			endDate = new Date(exp.end_date).toLocaleDateString('en-US', {
				month: 'short',
				year: 'numeric'
			});
		}

		const dateRange = startDate && (endDate || exp.is_current) ? `${startDate} - ${endDate}` : '';

		if (dateRange) {
			elements.push(
				new Paragraph({
					text: dateRange,
					spacing: { after: 80 },
					style: 'italics'
				})
			);
		}

		// Responsibilities
		if (exp.responsibilities && exp.responsibilities.length > 0) {
			exp.responsibilities.forEach((resp) => {
				elements.push(
					new Paragraph({
						text: `• ${resp}`,
						indent: { left: 360 }, // 0.25 inch
						spacing: { after: 60 }
					})
				);
			});
		}

		// Technologies
		if (exp.technologies && exp.technologies.length > 0) {
			elements.push(
				new Paragraph({
					children: [
						new TextRun({
							text: 'Technologies: ',
							bold: true,
							size: 20 // 10pt
						}),
						new TextRun({
							text: exp.technologies.join(', '),
							size: 20 // 10pt
						})
					],
					indent: { left: 360 }, // 0.25 inch
					spacing: { after: 80 }
				})
			);
		}

		// Add space between work experiences (except the last one)
		if (index < experiences.length - 1) {
			elements.push(
				new Paragraph({
					text: '',
					spacing: { after: 120 }
				})
			);
		}
	});

	// Add separator after work experience
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
