import { getCliClient } from "sanity/cli";
const client = getCliClient();
const docs = await client.fetch(`*[_type == "caseStudy"]`);
console.log(JSON.stringify(docs, null, 2));
