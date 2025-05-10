import {
	Document,
	Paragraph,
	TextRun,
	HeadingLevel,
	BorderStyle,
	AlignmentType,
	WidthType,
	Packer
} from 'docx';
import type {
	Resume,
	ContactInfo,
	Education,
	WorkExperience,
	Project,
	OpenSourceContribution,
	Certification,
	Skill,
	TechnicalSkills
} from '@/types/resume';

/**
 * Creates education section
 */
export function createEducation(education: Education[]) {
	if (!education.length) return [];

	const elements = [
		new Paragraph({
			text: 'EDUCATION',
			heading: HeadingLevel.HEADING_2,
			spacing: { after: 100 }
		})
	];

	education.forEach((edu) => {
		// Institution, Degree and Graduation Date on same line
		const degreeText = edu.field_of_study ? `${edu.degree} in ${edu.field_of_study}` : edu.degree;
		const gradDateText = edu.graduation_date
			? new Date(edu.graduation_date).toLocaleDateString('en-US', {
					month: 'short',
					year: 'numeric'
				})
			: '';

		// First line: Institution (bold) - Degree, Graduation Date
		const firstLineChildren = [
			new TextRun({
				text: edu.institution,
				bold: true,
				size: 22 // 11pt (reduced)
			})
		];

		if (degreeText) {
			firstLineChildren.push(
				new TextRun({
					text: ` - ${degreeText}`,
					size: 20 // 10pt
				})
			);
		}

		if (gradDateText) {
			firstLineChildren.push(
				new TextRun({
					text: `, ${gradDateText}`,
					size: 20, // 10pt
					italics: true
				})
			);
		}

		elements.push(
			new Paragraph({
				children: firstLineChildren,
				spacing: { after: 60 }
			})
		);

		// Second line: GPA, Honors (if any)
		const secondLineChildren = [];

		if (edu.gpa) {
			secondLineChildren.push(
				new TextRun({
					text: `GPA: ${edu.gpa.toFixed(2)}`,
					size: 20 // 10pt
				})
			);
		}

		if (edu.honors && edu.honors.length > 0) {
			if (secondLineChildren.length > 0) {
				secondLineChildren.push(
					new TextRun({
						text: ' | ',
						size: 20 // 10pt
					})
				);
			}

			secondLineChildren.push(
				new TextRun({
					text: 'Honors: ',
					bold: true,
					size: 20 // 10pt
				})
			);

			secondLineChildren.push(
				new TextRun({
					text: edu.honors.join(', '),
					size: 20 // 10pt
				})
			);
		}

		if (secondLineChildren.length > 0) {
			elements.push(
				new Paragraph({
					children: secondLineChildren,
					spacing: { after: 60 }
				})
			);
		}

		// Relevant Courses (if any)
		if (edu.relevant_courses && edu.relevant_courses.length > 0) {
			elements.push(
				new Paragraph({
					children: [
						new TextRun({
							text: 'Relevant Courses: ',
							bold: true,
							size: 20 // 10pt
						}),
						new TextRun({
							text: edu.relevant_courses.join(', '),
							size: 20 // 10pt
						})
					],
					spacing: { after: 80 }
				})
			);
		}

		// Add a small space between education entries
		elements.push(
			new Paragraph({
				text: '',
				spacing: { after: 40 }
			})
		);
	});

	// Add separator after education
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
