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
 * Creates projects section
 */
export function createProjects(projects: Project[]) {
	if (!projects.length) return [];

	const elements = [
		new Paragraph({
			text: 'PROJECTS',
			heading: HeadingLevel.HEADING_2,
			spacing: { after: 120 }
		})
	];

	projects.forEach((project) => {
		// Project Name and Links
		const nameElements = [
			new TextRun({
				text: project.name,
				bold: true,
				size: 24 // 12pt
			})
		];

		// Role (if available)
		if (project.role) {
			nameElements.push(
				new TextRun({
					text: ` - ${project.role}`,
					italics: true
				})
			);
		}

		elements.push(
			new Paragraph({
				children: nameElements,
				spacing: { after: 80 }
			})
		);

		// Links
		const links = [];
		if (project.url) links.push(`URL: ${project.url}`);
		if (project.github_url) links.push(`GitHub: ${project.github_url}`);

		if (links.length > 0) {
			elements.push(
				new Paragraph({
					text: links.join(' | '),
					spacing: { after: 80 }
				})
			);
		}

		// Dates
		if (project.start_date) {
			const startDate = new Date(project.start_date).toLocaleDateString('en-US', {
				month: 'short',
				year: 'numeric'
			});
			let endDate = project.end_date
				? new Date(project.end_date).toLocaleDateString('en-US', {
						month: 'short',
						year: 'numeric'
					})
				: 'Present';

			elements.push(
				new Paragraph({
					text: `${startDate} - ${endDate}`,
					spacing: { after: 80 },
					style: 'italics'
				})
			);
		}

		// Description
		if (project.description) {
			elements.push(
				new Paragraph({
					text: project.description,
					spacing: { after: 80 }
				})
			);
		}

		// Key Achievements
		if (project.key_achievements && project.key_achievements.length > 0) {
			project.key_achievements.forEach((achievement) => {
				elements.push(
					new Paragraph({
						text: `• ${achievement}`,
						indent: { left: 360 }, // 0.25 inch
						spacing: { after: 80 }
					})
				);
			});
		}

		// Technologies
		if (project.technologies && project.technologies.length > 0) {
			elements.push(
				new Paragraph({
					children: [
						new TextRun({
							text: 'Technologies: ',
							bold: true
						}),
						new TextRun({
							text: project.technologies.join(', ')
						})
					],
					spacing: { after: 120 }
				})
			);
		}
	});

	// Add separator after projects
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
