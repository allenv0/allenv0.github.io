export interface Project {
	cover?: string;
	coverAlt?: string;
	noCrop?: boolean;
	description: string;
	links?: { [key: string]: string };
}

export type ProjectData = {
	[key: string]: Project;
};

export const projects: ProjectData = {
	AirPosture: {
		cover: "air5.gif",
		coverAlt: "Quoter's logo, a speech bubble with three dots inside.",
		description:
			"AirPods as neck posture tracker",
		links: {},
	},
	"SuperCue": {
		cover: "yt.png",
		coverAlt: "Quoter's logo, a speech bubble with three dots inside.",
		description: "Proactive AI agents for video podcast discovery",
		links: {},
	},
	Lemotsh: {
		cover: "snow.png",
		coverAlt: "Quoter's logo, a speech bubble with three dots inside.",
		description: "Infinite books discovery with AI",
		links: {},
	},
}; 