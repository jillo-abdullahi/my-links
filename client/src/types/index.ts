export type FormValueFunction = (event: InputEvent) => void;

export interface UserProfileDetails {
  userId: string;
  firstName: string;
  lastName: string;
  bio: string;
  profession: string;
  profileImage: string;
  backgroundImage: string;
  githubLink: string;
  personalWebsiteLink: string;
  youtubeLink: string;
  linkedinLink: string;
  xLink: string;
  facebookLink: string;
  instagramLink: string;
  devToLink: string;
  codeWarsLink: string;
  freeCodeCampLink: string;
  mediumLink: string;
  stackoverflowLink: string;
  threadsLink: string;
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  bio: string;
  userProfileImage: string;
}
