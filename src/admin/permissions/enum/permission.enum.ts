export enum Permission {
  AdminView = 'Admin.View',
  AdminUpsert = 'Admin.ViewAndUpsert',
  AdminActivation = 'Admin.ViewAndActivation',
  AdminDelete = 'Admin.ViewAndDelete',

  PermissionView = 'Permission.View',
  PermissionUpsert = 'Permission.Upsert',

  RoleView = 'Role.View',
  RoleUpsert = 'Role.ViewAndUpsert',
  RoleActivation = 'Role.ViewAndActivation',
  RoleDelete = 'Role.ViewAndDelete',

  ConfigView = 'Config.View',
  ConfigUpsert = 'Config.ViewAndUpsert',

  FaqView = 'Faq.View',
}
