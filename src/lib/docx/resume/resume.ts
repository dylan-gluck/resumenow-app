import saveAs from 'file-saver';
import { createHeader } from './createHeader';
import { createSummary } from './createSummary';
import { createWorkExperience } from './createWorkExperience';
import { createEducation } from './createEducation';
import { createSkills } from './createSkills';
import { createProjects } from './createProjects';
import { createCertifications } from './createCertifications';
import { createOpenSourceContributions } from './createOpenSourceContributions';
import { createAdditionalSections } from './createAdditionalSections';
import type { Resume } from '@/types/resume';
import { Document, Packer } from 'docx';

/**
 * Generates a downloadable resume .docx document
 * @param resume Resume object containing all resume data
 * @param company Optional company name to include in the filename
 */
export function generateResumeDoc(resume: Resume, company?: string) {
	// Create document with standard margins
	const doc = new Document({
		sections: [
			{
				properties: {
					page: {
						margin: {
							top: 720, // 0.5 inch (720 twips)
							right: 720,
							bottom: 720,
							left: 720
						}
					}
				},
				children: [
					// Build document content
					...createHeader(resume.contact_info),
					...createSummary(resume.summary),
					...createWorkExperience(resume.work_experience),
					...createEducation(resume.education),
					...createSkills(resume.technical_skills, resume.languages),
					...createProjects(resume.projects),
					...createCertifications(resume.certifications),
					...createOpenSourceContributions(resume.open_source_contributions),
					...createAdditionalSections(resume)
				]
			}
		]
	});

	// Clean up file name
	const fullName = resume.contact_info.full_name.replace(/\s+/g, '_').toLowerCase();
	const companyStr = company ? `_${company.replace(/\s+/g, '_').toLowerCase()}` : '';
	const filename = `${fullName}${companyStr}_resume.docx`;

	// Download doc (browser)
	Packer.toBlob(doc).then((blob) => {
		// saveAs from FileSaver will download the file
		saveAs(blob, filename);
	});
}
