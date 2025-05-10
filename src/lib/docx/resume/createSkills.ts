import { Paragraph, TextRun, HeadingLevel, BorderStyle } from 'docx';
import type { Skill, TechnicalSkills } from '@/types/resume';

/**
 * Creates skills section
 */
export function createSkills(technicalSkills: TechnicalSkills, languages: Skill[]) {
	const elements: Paragraph[] = [
		new Paragraph({
			text: 'SKILLS',
			heading: HeadingLevel.HEADING_2,
			spacing: { after: 100 }
		})
	];

	// Create a list of skill categories
	const categories = [
		{ name: 'Programming Languages', skills: technicalSkills.programming_languages },
		{ name: 'Frameworks & Libraries', skills: technicalSkills.frameworks_libraries },
		{ name: 'Databases', skills: technicalSkills.databases },
		{ name: 'Cloud Platforms', skills: technicalSkills.cloud_platforms },
		{ name: 'Tools', skills: technicalSkills.tools },
		{ name: 'Other', skills: technicalSkills.other },
		{ name: 'Languages', skills: languages }
	].filter((category) => category.skills && category.skills.length > 0);

	// Group categories into pairs for a two-column layout
	for (let i = 0; i < categories.length; i += 2) {
		const leftCategory = categories[i];
		const rightCategory = i + 1 < categories.length ? categories[i + 1] : null;

		if (rightCategory) {
			// Two categories on one line (two-column layout)
			elements.push(
				new Paragraph({
					children: [
						// Left category
						new TextRun({
							text: leftCategory.name + ': ',
							bold: true,
							size: 20 // 10pt
						}),
						new TextRun({
							text: leftCategory.skills.map((s) => s.name).join(', '),
							size: 20 // 10pt
						}),
						// Spacer
						new TextRun({
							text: '     ',
							size: 20 // 10pt
						}),
						// Right category
						new TextRun({
							text: rightCategory.name + ': ',
							bold: true,
							size: 20 // 10pt
						}),
						new TextRun({
							text: rightCategory.skills.map((s) => s.name).join(', '),
							size: 20 // 10pt
						})
					],
					spacing: { after: 60 }
				})
			);
		} else {
			// Just one category on a line (full-width)
			elements.push(
				new Paragraph({
					children: [
						new TextRun({
							text: leftCategory.name + ': ',
							bold: true,
							size: 20 // 10pt
						}),
						new TextRun({
							text: leftCategory.skills.map((s) => s.name).join(', '),
							size: 20 // 10pt
						})
					],
					spacing: { after: 60 }
				})
			);
		}
	}

	// Add separator after skills
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
