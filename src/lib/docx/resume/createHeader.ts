import { Paragraph, TextRun, HeadingLevel, BorderStyle, AlignmentType } from 'docx';
import type { ContactInfo } from '@/types/resume';

/**
 * Creates header section with contact information
 */
export function createHeader(contactInfo: ContactInfo) {
	const elements = [];

	// Name
	elements.push(
		new Paragraph({
			text: contactInfo.full_name,
			heading: HeadingLevel.HEADING_1,
			alignment: AlignmentType.LEFT,
			spacing: { after: 120 }
		})
	);

	// Contact details as simple paragraphs
	const contactDetailsArray = [];
	if (contactInfo.email) {
		contactDetailsArray.push(`${contactInfo.email}`);
	}
	if (contactInfo.phone) {
		contactDetailsArray.push(`${contactInfo.phone}`);
	}
	if (contactInfo.address) {
		contactDetailsArray.push(`${contactInfo.address}`);
	}
	if (contactInfo.portfolio) {
		contactDetailsArray.push(`${contactInfo.portfolio}`);
	}
	if (contactInfo.linkedin) {
		contactDetailsArray.push(`${contactInfo.linkedin}`);
	}
	if (contactInfo.github) {
		contactDetailsArray.push(`${contactInfo.github}`);
	}
	if (contactInfo.google_scholar) {
		contactDetailsArray.push(`${contactInfo.google_scholar}`);
	}

	// Layout contact details in two columns using paragraphs
	if (contactDetailsArray.length > 0) {
		elements.push(
			new Paragraph({
				children: contactDetailsArray.map(
					(detail, index) =>
						new TextRun({
							text: detail + (index < contactDetailsArray.length - 1 ? '   •   ' : ''),
							size: 18 // 9pt
						})
				),
				spacing: { after: 60 }
			})
		);
	}

	// Add separator after contact info
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
