export type FormValueFunction = (event: InputEvent) => void;

export interface UserProfileDetails {
  userId: string;
  firstName: string;
  lastName: string;
  bio: string;
  profession: string;
  profileImage: string;
  backgroundImage: string;

  links: Link[];
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  bio: string;
  email?: string;
  userProfileImage: string;
}

export interface Link {
  platform: LinkOptions;
  url: string;
  id: string;
  error?: string;
}

export type Links = Link[];

export enum LinkOptions {
  Github = "Github",
  Codepen = "Codepen",
  Twitter = "Twitter",
  YouTube = "YouTube",
  Facebook = "Facebook",
  Dev_to = "Dev.to",
  LinkedIn = "LinkedIn",
  FreeCodeCamp = "FreeCodeCamp",
  Hashnode = "Hashnode",
  Gitlab = "Gitlab",
  Twitch = "Twitch",
  Frontend_Mentor = "Frontend Mentor",
  CodeWars = "CodeWars",
  StackOverFlow = "StackOverFlow",
  PortfolioWebsite = "Portfolio website",
}
