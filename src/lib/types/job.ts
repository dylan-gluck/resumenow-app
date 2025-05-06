export interface Job {
	company: string;
	title: string;
	description: string;
	salary?: string;
	responsibilities?: string[];
	qualifications?: string[];
	logistics?: string[];
	location?: string[];
	additional_info?: string[];
	link?: string;
}
