export interface ContactInfo {
	full_name?: string;
	email?: string;
	phone?: string;
	address?: string;
	linkedin?: string;
	github?: string;
	portfolio?: string;
	google_scholar?: string;
}

export interface Education {
	institution?: string;
	degree?: string;
	field_of_study?: string;
	graduation_date?: string;
	gpa?: number;
	honors?: string[];
	relevant_courses?: string[];
}

export interface WorkExperience {
	company?: string;
	position?: string;
	start_date?: string;
	end_date?: string;
	is_current?: boolean;
	responsibilities?: string[];
	technologies?: string[];
}

export interface Skill {
	name?: string;
	level?: string;
	years_of_experience?: number;
}

export interface TechnicalSkills {
	programming_languages?: Skill[];
	frameworks_libraries?: Skill[];
	databases?: Skill[];
	tools?: Skill[];
	cloud_platforms?: Skill[];
	other?: Skill[];
}

export interface Project {
	name?: string;
	description?: string;
	technologies?: string[];
	url?: string;
	github_url?: string;
	start_date?: string;
	end_date?: string;
	role?: string;
	key_achievements?: string[];
}

export interface Certification {
	name?: string;
	issuer?: string;
	date_obtained?: string;
	expiration_date?: string;
	credential_id?: string;
}

export interface OpenSourceContribution {
	project_name?: string;
	contribution_type?: string;
	description?: string;
	url?: string;
}

export interface Resume {
	contact_info?: ContactInfo;
	summary?: string;
	education?: Education[];
	work_experience?: WorkExperience[];
	technical_skills?: TechnicalSkills;
	projects?: Project[];
	open_source_contributions?: OpenSourceContribution[];
	certifications?: Certification[];
	publications?: string[];
	conferences?: string[];
	languages?: Skill[];
	volunteer_work?: string[];
	interests?: string[];
	references?: string[];
	additional_sections?: Record<string, string[]>;
}
