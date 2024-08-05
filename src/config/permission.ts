export const ALL_PERMISSIONS = [

    "users:write",
    "users:delete",
    "users:edit",
    "users:view",

    "role:write",
    "role:edit",
    "role:delete",
    "role:view",


    "clinic:write",
    "clinic:edit",
    "clinic:delete",



    "branch:write",
    "branch:edit",
    "branch:delete",


    "patient:create",
    "patient:view",
    "patient:edit",
    "patient:delete",

    "patient:history:view",
    "patient:vital:view",
    "patient:examination:view",
    "patient:payment:view",
    "patient:diagnosis:view",
    "patient:allergy:view",



    "patient:vital:create",
    "patient:vital:edit",
    "patient:vital:delete",

    "patient:history:create",
    "patient:history:edit",
    "patient:history:delete",

    "patient:examination:create",
    "patient:examination:edit",
    "patient:examination:delete",


    "patient:assigned-doctor:edit",

    "patient:payment:create",
    "patient:payment:edit",
    "patient:payment:delete",

    "patient:allergy:create",
    "patient:allergy:edit",
    "patient:allergy:delete",

    "patient:diagnosis:create",
    "patient:diagnosis:edit",
    "patient:diagnosis:delete",
    "patient:view:delete",

    "patient:plan:create",
    "patient:plan:edit",
    "patient:plan:delete",
    "patient:plan:view",

    "appointment:create",
    "appointment:edit",
    "appointment:view"




] as const;

export const PERMISSIONS = ALL_PERMISSIONS.reduce((acc, permission) => {
    acc[permission] = permission;

    return acc;
}, {} as Record<(typeof ALL_PERMISSIONS)[number], (typeof ALL_PERMISSIONS)[number]>);

