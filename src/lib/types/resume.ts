export interface ContactInfo {
	full_name: string;
	email?: string | null;
	phone?: string | null;
	address?: string | null;
	linkedin?: string | null;
	github?: string | null;
	portfolio?: string | null;
	google_scholar?: string | null;
}

export interface Education {
	institution: string;
	degree: string;
	field_of_study?: string | null;
	graduation_date?: string | null;
	gpa?: number | null;
	honors: string[];
	relevant_courses: string[];
}

export interface WorkExperience {
	company: string;
	position: string;
	start_date?: string | null;
	end_date?: string | null;
	is_current?: boolean;
	responsibilities: string[];
	technologies: string[];
}

export interface Skill {
	name: string;
	level?: string | null;
	years_of_experience?: number;
}

export interface TechnicalSkills {
	programming_languages: Skill[];
	frameworks_libraries: Skill[];
	databases: Skill[];
	tools: Skill[];
	cloud_platforms: Skill[];
	other: Skill[];
}

export interface Project {
	name: string;
	description?: string | null;
	technologies: string[];
	url?: string | null;
	github_url?: string | null;
	start_date?: string | null;
	end_date?: string | null;
	role?: string | null;
	key_achievements: string[];
}

export interface Certification {
	name: string;
	issuer: string;
	date_obtained?: string | null;
	expiration_date?: string | null;
	credential_id?: string | null;
}

export interface OpenSourceContribution {
	project_name: string;
	contribution_type?: string | null;
	description?: string | null;
	url?: string | null;
}

export interface Resume {
	contact_info: ContactInfo;
	summary?: string | null;
	education: Education[];
	work_experience: WorkExperience[];
	technical_skills: TechnicalSkills;
	projects: Project[];
	open_source_contributions: OpenSourceContribution[];
	certifications: Certification[];
	publications: string[];
	conferences: string[];
	languages: Skill[];
	volunteer_work: string[];
	interests: string[];
	references: string[];
	additional_sections?: Record<string, string[]>;
}
