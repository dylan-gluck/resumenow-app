import { z } from 'zod';

// Create a skill schema to match the Skill interface
const skillSchema = z.object({
	name: z.string(),
	level: z.string().optional(),
	years_of_experience: z.number().optional()
});

export const formSchema = z.object({
	contact_info: z.object({
		full_name: z.string(),
		email: z.string().email().optional(),
		phone: z.string().optional(),
		address: z.string().optional(),
		linkedin: z.string().url().optional(),
		github: z.string().url().optional(),
		portfolio: z.string().url().optional(),
		google_scholar: z.string().url().optional()
	}),
	summary: z.string().optional(),
	education: z.array(
		z.object({
			institution: z.string().optional(),
			degree: z.string().optional(),
			field_of_study: z.string().optional(),
			graduation_date: z.string().optional(),
			gpa: z.number().optional(),
			honors: z.array(z.string()).optional(),
			relevant_courses: z.array(z.string()).optional()
		})
	),
	work_experience: z.array(
		z.object({
			company: z.string().optional(),
			position: z.string().optional(),
			start_date: z.string().optional(),
			end_date: z.string().optional(),
			is_current: z.boolean(),
			responsibilities: z.array(z.string()),
			technologies: z.array(z.string()).optional()
		})
	),
	technical_skills: z.object({
		programming_languages: z.array(skillSchema),
		frameworks_libraries: z.array(skillSchema),
		databases: z.array(skillSchema).optional(),
		tools: z.array(skillSchema).optional(),
		cloud_platforms: z.array(skillSchema).optional(),
		other: z.array(skillSchema).optional()
	}),
	projects: z
		.array(
			z.object({
				name: z.string(),
				description: z.string().optional(),
				technologies: z.array(z.string()).optional(),
				url: z.string().url().optional(),
				github_url: z.string().url().optional(),
				start_date: z.string().optional(),
				end_date: z.string().optional(),
				role: z.string().optional(),
				key_achievements: z.array(z.string()).optional()
			})
		)
		.optional(),
	open_source_contributions: z
		.array(
			z.object({
				project_name: z.string(),
				contribution_type: z.string(),
				description: z.string(),
				url: z.string().url().optional()
			})
		)
		.optional(),
	certifications: z
		.array(
			z.object({
				name: z.string(),
				issuer: z.string(),
				date_obtained: z.string().optional(),
				expiration_date: z.string().optional(),
				credential_id: z.string().optional()
			})
		)
		.optional(),
	publications: z.array(z.string()).optional(),
	conferences: z.array(z.string()).optional(),
	languages: z.array(skillSchema).optional(),
	volunteer_work: z.array(z.string()).optional(),
	interests: z.array(z.string()).optional(),
	references: z.array(z.string()).optional(),
	additional_sections: z.record(z.string(), z.array(z.string())).optional()
});

export type FormSchema = typeof formSchema;
