import { createClient } from "@sanity/client";

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID as string | undefined;
const dataset = import.meta.env.PUBLIC_SANITY_DATASET as string | undefined;

export const sanity =
  projectId && dataset
    ? createClient({
        projectId,
        dataset,
        apiVersion: "2026-01-01",
        useCdn: true,
      })
    : null;
