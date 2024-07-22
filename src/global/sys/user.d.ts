import {Team} from "./Team";

export interface USER{
  objId: string;
  loginName: string;
  name: string;
  photo: string;
  token: string;
  gptToken: string;
  roleIds: string[];
  roleNames: string[];
  team: Team;
  isTeamLeader?: boolean;
}

export interface ResLogin {
  user: USER;
  token: string;
  rtzhToken: string;
}


export type PostRtzhLoginProps = {
  loginName: string;
  password: string;
};


