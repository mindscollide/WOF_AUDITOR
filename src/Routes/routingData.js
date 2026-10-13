// all routing related data like rendering components and their paths sits here in this file
import {
  SecurityAdminAuditTrail,
  SecurityAdminUserAudit,
} from "../Container";
import { 
  AuditorLinks,

} from "./Links";

const AuditorRouteData = [
  { component: SecurityAdminAuditTrail, path: "Admin/AuditTrail" },
  { component: SecurityAdminUserAudit, path: "Admin/UserAudit" },
]

const UserSelection = (token,role)=>{
  let Title = ''
  let UserRoleId = ''
  let SidebarData = ''
  let MainMenu = ''
  let Notification = ''

  if(token && role===5){
    Title ="WOFF Data Centralization & MIS Capturing"
    UserRoleId = role
    SidebarData = AuditorLinks
    MainMenu = AuditorRouteData
    Notification = null;
  }

  return{
    Title,
    UserRoleId,
    SidebarData,
    MainMenu,
    Notification
  }
}
export {
  UserSelection
}