import { Paragraph, TextRun, HeadingLevel, BorderStyle } from 'docx';
import type { Certification } from '@/types/resume';

/**
 * Creates certifications section
 */
export function createCertifications(certifications: Certification[]) {
	if (!certifications.length) return [];

	const elements: Paragraph[] = [
		new Paragraph({
			text: 'CERTIFICATIONS',
			heading: HeadingLevel.HEADING_2,
			spacing: { after: 100 }
		})
	];

	// Create a two-column layout for certifications
	if (certifications.length > 0) {
		// Split the certifications into pairs for side-by-side display
		for (let i = 0; i < certifications.length; i += 2) {
			const leftCert = certifications[i];
			const rightCert = i + 1 < certifications.length ? certifications[i + 1] : null;

			// Create paragraphs for left certification
			const leftCertParagraphs = createCertificationParagraphs(leftCert);

			if (rightCert) {
				// Two-column layout with certifications side by side
				// First line: Names and issuers
				elements.push(
					new Paragraph({
						children: [
							// Left certification
							new TextRun({
								text: leftCert.name,
								bold: true,
								size: 20 // 10pt
							}),
							new TextRun({
								text: ` - ${leftCert.issuer}`,
								size: 20 // 10pt
							}),
							// Spacer
							new TextRun({
								text: '     ',
								size: 20 // 10pt
							}),
							// Right certification
							new TextRun({
								text: rightCert.name,
								bold: true,
								size: 20 // 10pt
							}),
							new TextRun({
								text: ` - ${rightCert.issuer}`,
								size: 20 // 10pt
							})
						],
						spacing: { after: 40 }
					})
				);

				// Second line: Dates and IDs
				const leftDateInfoParts = getCertificationDateInfo(leftCert);
				const rightDateInfoParts = getCertificationDateInfo(rightCert);

				if (leftDateInfoParts.length > 0 || rightDateInfoParts.length > 0) {
					elements.push(
						new Paragraph({
							children: [
								// Left certification dates
								new TextRun({
									text: leftDateInfoParts.length > 0 ? leftDateInfoParts.join(' | ') : '',
									italics: true,
									size: 18 // 9pt
								}),
								// Spacer
								new TextRun({
									text: '     ',
									size: 18 // 9pt
								}),
								// Right certification dates
								new TextRun({
									text: rightDateInfoParts.length > 0 ? rightDateInfoParts.join(' | ') : '',
									italics: true,
									size: 18 // 9pt
								})
							],
							spacing: { after: 60 }
						})
					);
				}
			} else {
				// Single certification (full width)
				elements.push(...leftCertParagraphs);
			}

			// Add spacing between certification pairs
			elements.push(
				new Paragraph({
					text: '',
					spacing: { after: 40 }
				})
			);
		}
	}

	// Helper function to get certification date info
	function getCertificationDateInfo(cert: Certification): string[] {
		const dateInfoParts = [];

		if (cert.date_obtained) {
			const obtainedDate = new Date(cert.date_obtained).toLocaleDateString('en-US', {
				month: 'short',
				year: 'numeric'
			});
			dateInfoParts.push(`Obtained: ${obtainedDate}`);
		}

		if (cert.expiration_date) {
			const expiryDate = new Date(cert.expiration_date).toLocaleDateString('en-US', {
				month: 'short',
				year: 'numeric'
			});
			dateInfoParts.push(`Expires: ${expiryDate}`);
		}

		if (cert.credential_id) {
			dateInfoParts.push(`ID: ${cert.credential_id}`);
		}

		return dateInfoParts;
	}

	// Helper function to create paragraphs for a certification
	function createCertificationParagraphs(cert: Certification): Paragraph[] {
		const paragraphs = [];

		// Certificate name and issuer on one line
		paragraphs.push(
			new Paragraph({
				children: [
					new TextRun({
						text: cert.name,
						bold: true,
						size: 20 // 10pt
					}),
					new TextRun({
						text: ` - ${cert.issuer}`,
						size: 20 // 10pt
					})
				],
				spacing: { after: 40 }
			})
		);

		// Dates and credential ID
		const dateInfoParts = getCertificationDateInfo(cert);
		if (dateInfoParts.length > 0) {
			paragraphs.push(
				new Paragraph({
					text: dateInfoParts.join(' | '),
					spacing: { after: 60 },
					style: 'italics'
				})
			);
		}

		return paragraphs;
	}

	// Add separator after certifications
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
