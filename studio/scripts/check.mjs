import { getCliClient } from "sanity/cli";
const client = getCliClient();
for (const type of ["service", "caseStudy", "teamMember", "review", "clinicMedia"]) {
  const count = await client.fetch(`count(*[_type == "${type}"])`);
  console.log(type, count);
}
