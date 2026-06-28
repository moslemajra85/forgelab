import * as z from "zod";


export const WorkspaceIdParamSchema = z.object({
  workspaceId: z.uuid("workspace Id must be a valid UUID"),
});

export const CreateWorkspaceSchema = z.object({
  name: z
    .string("workspace name is required")
    .trim()
    .min(2, "workspace name must be at least 2 characters long")
    .max(80, "workspace name must be at most 80 characters long"),
});


export type CreateWorkspaceInput = z.infer<typeof CreateWorkspaceSchema>;
export type WorkspaceIdParam = z.infer<typeof WorkspaceIdParamSchema>;