export enum Permission {
  AdminView='Admin.View' ,
  AdminUpsert='Admin.ViewAndUpsert',
  AdminActivation='Admin.ViewAnActivation' ,

  PermissionView="Permission.View",
  PermissionUpsert="Permission.Upsert",

  RoleView='Role.View',
  RoleUpsert='Role.ViewAndUpsert',
  RoleActivation='Role.ViewAndActivation',
  RoleDelete='Role.ViewAndDelete',

  ConfigView='Config.View',
  ConfigUpsert='Config.ViewAndUpsert',

  FaqView='Faq.View'
}
