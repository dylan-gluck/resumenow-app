import { Paragraph, HeadingLevel, BorderStyle } from 'docx';
import type { Resume } from '@/types/resume';

/**
 * Creates any additional sections from the resume
 */
export function createAdditionalSections(resume: Resume) {
	const elements = [];

	// Publications
	if (resume.publications && resume.publications.length > 0) {
		elements.push(
			new Paragraph({
				text: 'PUBLICATIONS',
				heading: HeadingLevel.HEADING_2,
				spacing: { after: 120 }
			})
		);

		resume.publications.forEach((pub) => {
			elements.push(
				new Paragraph({
					text: `• ${pub}`,
					spacing: { after: 80 }
				})
			);
		});

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
	}

	// Conferences
	if (resume.conferences && resume.conferences.length > 0) {
		elements.push(
			new Paragraph({
				text: 'CONFERENCES',
				heading: HeadingLevel.HEADING_2,
				spacing: { after: 120 }
			})
		);

		resume.conferences.forEach((conf) => {
			elements.push(
				new Paragraph({
					text: `• ${conf}`,
					spacing: { after: 80 }
				})
			);
		});

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
	}

	// Volunteer Work
	if (resume.volunteer_work && resume.volunteer_work.length > 0) {
		elements.push(
			new Paragraph({
				text: 'VOLUNTEER WORK',
				heading: HeadingLevel.HEADING_2,
				spacing: { after: 120 }
			})
		);

		resume.volunteer_work.forEach((work) => {
			elements.push(
				new Paragraph({
					text: `• ${work}`,
					spacing: { after: 80 }
				})
			);
		});

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
	}

	// Interests
	if (resume.interests && resume.interests.length > 0) {
		elements.push(
			new Paragraph({
				text: 'INTERESTS',
				heading: HeadingLevel.HEADING_2,
				spacing: { after: 120 }
			})
		);

		elements.push(
			new Paragraph({
				text: resume.interests.join(', '),
				spacing: { after: 200 }
			})
		);

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
	}

	// Additional custom sections
	if (resume.additional_sections) {
		Object.entries(resume.additional_sections).forEach(([title, items]) => {
			if (items.length > 0) {
				elements.push(
					new Paragraph({
						text: title.toUpperCase(),
						heading: HeadingLevel.HEADING_2,
						spacing: { after: 120 }
					})
				);

				items.forEach((item) => {
					elements.push(
						new Paragraph({
							text: `• ${item}`,
							spacing: { after: 80 }
						})
					);
				});

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
			}
		});
	}

	return elements;
}
