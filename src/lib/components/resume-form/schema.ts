import { z } from 'zod';

// Create a skill schema to match the Skill interface
const skillSchema = z.object({
	name: z.string(),
	level: z.string().optional().nullable(),
	years_of_experience: z.number().optional().nullable()
});

export const formSchema = z.object({
	contact_info: z.object({
		full_name: z.string(),
		email: z.string().optional().nullable(),
		phone: z.string().optional().nullable(),
		address: z.string().optional().nullable(),
		linkedin: z.string().optional().nullable(),
		github: z.string().optional().nullable(),
		portfolio: z.string().optional().nullable(),
		google_scholar: z.string().optional().nullable()
	}),
	summary: z.string().optional().nullable(),
	education: z.array(
		z.object({
			institution: z.string(),
			degree: z.string(),
			field_of_study: z.string().optional().nullable(),
			graduation_date: z.string().optional().nullable(),
			gpa: z.number().optional().nullable(),
			honors: z.array(z.string()),
			relevant_courses: z.array(z.string())
		})
	),
	work_experience: z.array(
		z.object({
			company: z.string(),
			position: z.string(),
			start_date: z.string().optional().nullable(),
			end_date: z.string().optional().nullable(),
			is_current: z.boolean().optional().nullable(),
			responsibilities: z.array(z.string()),
			technologies: z.array(z.string())
		})
	),
	technical_skills: z.object({
		programming_languages: z.array(skillSchema),
		frameworks_libraries: z.array(skillSchema),
		databases: z.array(skillSchema),
		tools: z.array(skillSchema),
		cloud_platforms: z.array(skillSchema),
		other: z.array(skillSchema)
	}),
	projects: z.array(
		z.object({
			name: z.string(),
			description: z.string().optional().nullable(),
			technologies: z.array(z.string()),
			url: z.string().url().optional().nullable(),
			github_url: z.string().url().optional().nullable(),
			start_date: z.string().optional().nullable(),
			end_date: z.string().optional().nullable(),
			role: z.string().optional().nullable(),
			key_achievements: z.array(z.string())
		})
	),
	open_source_contributions: z.array(
		z.object({
			project_name: z.string(),
			contribution_type: z.string().optional().nullable(),
			description: z.string().optional().nullable(),
			url: z.string().url().optional().nullable()
		})
	),
	certifications: z.array(
		z.object({
			name: z.string(),
			issuer: z.string(),
			date_obtained: z.string().optional().nullable(),
			expiration_date: z.string().optional().nullable(),
			credential_id: z.string().optional().nullable()
		})
	),
	publications: z.array(z.string()),
	conferences: z.array(z.string()),
	languages: z.array(skillSchema),
	volunteer_work: z.array(z.string()),
	interests: z.array(z.string()),
	references: z.array(z.string()),
	additional_sections: z.record(z.string(), z.array(z.string())).optional().nullable()
});

export type FormSchema = typeof formSchema;
