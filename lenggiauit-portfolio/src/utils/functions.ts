import { AppSetting } from "../types/type";
import { decrypt, encrypt } from "./crypter";
import { Cookies } from 'react-cookie';
import { GlobalKeys } from "./constants";
import { User } from "../services/models/user"; 
import { useLocation } from "react-router-dom";
import React from "react";
import { SiteSetting } from "../services/communication/response/siteSetting"; 
var cookies = new Cookies();
  
const bgColors = ["primary", "secondary", "success", "danger", "warning", "info", "dark"];

export function GetRandomBgColor() {
  return bgColors[Math.floor(Math.random() * bgColors.length)];;
}

let appSetting: AppSetting = require('../appSetting.json');

export const getLoggedUser = () => {
  try {
    const loggedUser = localStorage.getItem(GlobalKeys.LoggedUserKey);
    if (loggedUser) {
      return <User>JSON.parse(JSON.stringify(decrypt(loggedUser)));
    }
    else {
      return null;
    }
  }
  catch (e) {
    return null;
  }
}

export const setLoggedUser = (user: any) => {
  localStorage.setItem(GlobalKeys.LoggedUserKey, encrypt(user));
}

export const setSiteSetting = (siteSetting: any) => {
  let expiresDate = new Date();
  expiresDate.setDate(new Date().getDate() + 1);
  cookies.set(GlobalKeys.SiteSettingKey, encrypt(siteSetting), { expires: expiresDate });
}
 
export const getSiteSetting = () => { 
  try {
    const setting = cookies.get(GlobalKeys.SiteSettingKey);
    if (setting) {
      return <SiteSetting>JSON.parse(JSON.stringify(decrypt(setting)));
    }
    else { 
      return null
    } 
  }
  catch (e) {
    return null;
  }
}

export const logout = () => {
  cookies.remove(GlobalKeys.LoggedUserKey);
  localStorage.clear();
}

export function paginationRange(size: number, startAt: number = 0): ReadonlyArray<number> {
  return Array.from({ length: size }, (x, i) => i + startAt);
}

export function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export function hasPermission() {
  const user = getLoggedUser();
  if (user) {
    return user.role.name == "Administrator";
  }
  else {
    return false;
  }
}

export function checkIfFilesAreTooBig(files?: [File]): boolean {
  let valid = true
  if (files) {
    files.map(file => {
      const size = file.size / 1024 / 1024
      if (size > 10) {
        valid = false
      }
    })
  }
  return valid
}

export function checkIfFilesAreCorrectType(files?: [File]): boolean {
  let valid = true
  if (files) {
    files.map(file => {
      if (!['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword'].includes(file.type)) {
        valid = false
      }
    })
  }
  return valid
}

