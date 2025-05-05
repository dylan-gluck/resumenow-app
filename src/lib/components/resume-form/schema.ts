import { z } from 'zod';

// Create a skill schema to match the Skill interface
const skillSchema = z.object({
	name: z.string().optional().nullable(),
	level: z.string().optional().nullable(),
	years_of_experience: z.number().optional().nullable()
});

export const formSchema = z.object({
	contact_info: z
		.object({
			full_name: z.string().optional().nullable(),
			email: z.string().optional().nullable(),
			phone: z.string().optional().nullable(),
			address: z.string().optional().nullable(),
			linkedin: z.string().optional().nullable(),
			github: z.string().optional().nullable(),
			portfolio: z.string().optional().nullable(),
			google_scholar: z.string().optional().nullable()
		})
		.optional()
		.nullable(),
	summary: z.string().optional().nullable(),
	education: z
		.array(
			z.object({
				institution: z.string().optional().nullable(),
				degree: z.string().optional().nullable(),
				field_of_study: z.string().optional().nullable(),
				graduation_date: z.string().optional().nullable(),
				gpa: z.number().optional().nullable(),
				honors: z.array(z.string()).optional().nullable(),
				relevant_courses: z.array(z.string()).optional().nullable()
			})
		)
		.optional()
		.nullable(),
	work_experience: z
		.array(
			z.object({
				company: z.string().optional().nullable(),
				position: z.string().optional().nullable(),
				start_date: z.string().optional().nullable(),
				end_date: z.string().optional().nullable(),
				is_current: z.boolean().optional().nullable(),
				responsibilities: z.array(z.string()).optional().nullable(),
				technologies: z.array(z.string()).optional().nullable()
			})
		)
		.optional()
		.nullable(),
	technical_skills: z
		.object({
			programming_languages: z.array(skillSchema).optional().nullable(),
			frameworks_libraries: z.array(skillSchema).optional().nullable(),
			databases: z.array(skillSchema).optional().nullable(),
			tools: z.array(skillSchema).optional().nullable(),
			cloud_platforms: z.array(skillSchema).optional().nullable(),
			other: z.array(skillSchema).optional().nullable()
		})
		.optional()
		.nullable(),
	projects: z
		.array(
			z.object({
				name: z.string().optional().nullable(),
				description: z.string().optional().nullable(),
				technologies: z.array(z.string()).optional().nullable(),
				url: z.string().url().optional().nullable(),
				github_url: z.string().url().optional().nullable(),
				start_date: z.string().optional().nullable(),
				end_date: z.string().optional().nullable(),
				role: z.string().optional().nullable(),
				key_achievements: z.array(z.string()).optional().nullable()
			})
		)
		.optional()
		.nullable(),
	open_source_contributions: z
		.array(
			z.object({
				project_name: z.string().optional().nullable(),
				contribution_type: z.string().optional().nullable(),
				description: z.string().optional().nullable(),
				url: z.string().url().optional().nullable()
			})
		)
		.optional()
		.nullable(),
	certifications: z
		.array(
			z.object({
				name: z.string().optional().nullable(),
				issuer: z.string().optional().nullable(),
				date_obtained: z.string().optional().nullable(),
				expiration_date: z.string().optional().nullable(),
				credential_id: z.string().optional().nullable()
			})
		)
		.optional()
		.nullable(),
	publications: z.array(z.string()).optional().nullable(),
	conferences: z.array(z.string()).optional().nullable(),
	languages: z.array(skillSchema).optional().nullable(),
	volunteer_work: z.array(z.string()).optional().nullable(),
	interests: z.array(z.string()).optional().nullable(),
	references: z.array(z.string()).optional().nullable(),
	additional_sections: z.record(z.string(), z.array(z.string())).optional().nullable()
});

export type FormSchema = typeof formSchema;
