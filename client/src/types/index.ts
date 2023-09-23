export type FormValueFunction = (event: InputEvent) => void;

export interface UserProfileDetails {
  userId: string;
  firstName: string;
  lastName: string;
  bio: string;
  profession: string;
  profileImage: string;
  backgroundImage: string;

  githubLink?: string;
  personalWebsiteLink?: string;
  youtubeLink?: string;
  devToLink?: string;
  codeWarsLink?: string;
  freeCodeCampLink?: string;
  linkedinLink?: string;
  stackoverflowLink?: string;
  xLink?: string;
  facebookLink?: string;
  CodepenLink?: string;
  HashnodeLink?: string;
  GitlabLink?: string;
  TwitchLink?: string;
  FrontendMentorLink?: string;
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  bio: string;
  userProfileImage: string;
}

export interface Links {
  [key: string]: {
    platform: string;
    url: string;
    id: string;
    error?: string;
  };
}

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

export interface DevLinks {
  [key: string]: { url: string };
}
